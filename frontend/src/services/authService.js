import api from './api';

/**
 * Authentication Service
 * 
 * Prepares API calls for Django REST Framework authentication endpoints.
 * In compliance with project security requirements:
 * - Does NOT hardcode credentials or fake authentications.
 * - Does NOT store raw credentials in browser storage.
 * - Does NOT treat frontend role checks as security boundaries (roles are verified server-side).
 */
export const authService = {
  /**
   * Dispatches login request to Django REST Framework backend.
   * Endpoint: POST /auth/login/
   * 
   * @param {Object} credentials
   * @param {string} credentials.username - Username or institutional email
   * @param {string} credentials.password - Account password
   * @returns {Promise<Object>} Backend response payload (e.g., token, user profile, role)
   */
  async login({ username, password }) {
    const payload = {
      username: username?.trim(),
      password: password,
    };

    const response = await api.post('/auth/login/', payload);
    return response.data;
  },

  /**
   * Dispatches logout request to invalidate session / token on backend.
   * Endpoint: POST /auth/logout/
   */
  async logout() {
    try {
      await api.post('/auth/logout/');
    } catch {
      // Graceful fallback if backend is unreachable during logout
    }
  },

  /**
   * Prototype Development Status Helper:
   * Returns metadata regarding backend integration status for developer transparency.
   */
  getDevelopmentStatus() {
    return {
      module: 'Module 1: Authentication & Login UI',
      backendApiUrl: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
      endpoint: '/auth/login/',
      expectedRoles: ['institution', 'aicte_admin', 'verifier'],
      isBackendConnected: false,
    };
  },
};

export default authService;
