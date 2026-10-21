import axios from 'axios';

/**
 * Pre-configured Axios instance for Django REST Framework backend communication.
 * Base URL defaults to VITE_API_BASE_URL (http://127.0.0.1:8000/api)
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: Attached for future token injection (JWT/Session)
api.interceptors.request.use(
  (config) => {
    // In future modules: token can be attached securely if available in memory
    // const token = getAuthToken();
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Standardizes Django REST Framework error responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'An unexpected error occurred. Please try again.';

    if (!error.response) {
      // Network failure or Django server is not reachable
      errorMessage =
        'Backend service unreachable. Please ensure the Django API server is running at ' +
        (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api');
    } else {
      const { data, status } = error.response;
      if (status === 401 || status === 403) {
        errorMessage = data?.detail || 'Invalid credentials or unauthorized access.';
      } else if (data?.non_field_errors) {
        errorMessage = Array.isArray(data.non_field_errors)
          ? data.non_field_errors.join(' ')
          : data.non_field_errors;
      } else if (data?.detail) {
        errorMessage = data.detail;
      } else if (typeof data === 'object' && data !== null) {
        // Collect field specific validation errors from DRF
        const fieldErrors = Object.entries(data)
          .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(', ') : val}`)
          .join('; ');
        errorMessage = fieldErrors || `Request failed with status code ${status}`;
      } else if (status >= 500) {
        errorMessage = 'Internal server error. Please try again later.';
      }
    }

    const enhancedError = new Error(errorMessage);
    enhancedError.originalError = error;
    enhancedError.status = error.response?.status;
    enhancedError.data = error.response?.data;

    return Promise.reject(enhancedError);
  }
);

export default api;
