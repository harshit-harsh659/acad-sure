# APAAR Student Data Management & Verification System
## Module 1: Authentication & Frontend Foundation

This repository contains **Module 1 (Authentication & Login UI Foundation)** of the **APAAR Student Data Management & Verification System**, developed for the AICTE Hackathon Prototype.

The platform is designed to assist AICTE-approved institutions in submitting student-level records, supporting data validation, enabling enrolment monitoring, and facilitating authorized academic credential verification under APAAR standards.

---

## 1. Module Overview & Scope

### Implemented in Module 1:
- **Authentication & Login UI**: Modern, accessible enterprise interface with national academic branding.
- **Frontend Form Controls & Validation**:
  - Controlled inputs for username/institutional ID and password.
  - Client-side required field validation with instant clear on typing.
  - Password visibility toggle (masked/unmasked) with accessible ARIA tags.
  - Duplicate-submission prevention and loading state indicators.
  - Informative modal placeholder for institutional password recovery.
- **Backend Integration Layer**:
  - Pre-configured Axios client in `src/services/api.js` pointing to `VITE_API_BASE_URL`.
  - Authentication service in `src/services/authService.js` prepared for `POST /auth/login/`.
  - Graceful backend error handling when the Django REST API is offline.
  - Explicit compliance: no hardcoded passwords, no fake logins, and no unauthenticated redirects to dashboards.
- **Responsive Layout**:
  - Two-column desktop layout (Left: Academic Identity & 3 Key Highlights; Right: Login Card).
  - Mobile-responsive single-column layout prioritizing the authentication form.

### Out of Scope (Scheduled for Subsequent Modules):
- Student data upload & bulk CSV/Excel ingestion
- APAAR ID validation & verification engine
- Machine learning anomaly detection & duplicate enrolment flagging
- AICTE analytics & institutional monitoring dashboards
- Verifier portal & QR code verification pipeline

---

## 2. Technology Stack

- **Framework**: [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: JavaScript (JSX)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)

---

## 3. Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   └── auth/
│   │       └── LoginForm.jsx         # Accessible, controlled login form component
│   ├── pages/
│   │   └── Login.jsx                 # Two-column responsive login page & branding
│   ├── services/
│   │   ├── api.js                    # Axios client configured with base URL & interceptors
│   │   └── authService.js            # POST /auth/login/ preparation & contract specs
│   ├── App.jsx                       # Top-level client-side routing
│   ├── index.css                     # Tailwind CSS entry directives & font settings
│   └── main.jsx                      # React DOM root entry
├── .env                              # Active environment config
├── .env.example                      # Template environment file
├── index.html                        # HTML entry with metadata and Inter font
├── package.json                      # Project dependencies & scripts
├── tailwind.config.js                # Custom navy, brand, and cyan theme tokens
├── postcss.config.js                 # PostCSS configuration
└── README.md                         # Module documentation & setup guide
```

---

## 4. Setup & Running Locally

### Prerequisites
- Node.js (v18.0.0 or higher recommended, tested on Node v24)
- npm (v9.0.0 or higher)

### Installation Steps

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env` (if not already created):
   ```bash
   cp .env.example .env
   ```
   Default content:
   ```env
   VITE_API_BASE_URL=http://127.0.0.1:8000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be accessible at:
   ```
   http://localhost:5173/
   ```

5. Build for production:
   ```bash
   npm run build
   ```

6. Preview production build:
   ```bash
   npm run preview
   ```

---

## 5. Backend Integration Specifications

When connecting to the Django REST Framework backend:

### Authentication Endpoint
- **URL**: `POST /auth/login/`
- **Request Body**:
  ```json
  {
    "username": "college_a",
    "password": "example-password"
  }
  ```
- **Expected Success Response** (HTTP 200):
  ```json
  {
    "token": "<auth_token_or_jwt>",
    "user": {
      "id": 1,
      "username": "college_a",
      "email": "admin@college-a.edu.in",
      "role": "institution"
    }
  }
  ```
- **Error Response** (HTTP 400 / 401):
  ```json
  {
    "detail": "Invalid credentials or unauthorized access."
  }
  ```

---

## 6. Security Principles Followed

1. **No Frontend Security Boundary**: User roles (`institution`, `aicte_admin`, `verifier`) are not chosen by users on the client; they are verified and issued by the Django backend upon authentication.
2. **No Mock Credentials / Fake Success**: When credentials are submitted while the backend is offline, the interface surfaces a transparent alert rather than faking a login or storing passwords in `localStorage`.
3. **Sensitive Data Protection**: Passwords are kept solely in ephemeral React state during form entry and are never persisted in unencrypted client storage.

---

## 7. Prototype Demo Accounts (Seed Data for 3 Roles)

The following standardized credentials are configured for prototype evaluation and future Django fixture seeding:

| Role | Username | Password | Institutional Scope & Permissions |
|------|----------|----------|-----------------------------------|
| **Institution** | `inst_iitd_101` | `InstSecure#2026` | College Nodal Officer; manages student record uploads, CSV/Excel ingestion, and institutional validation. |
| **AICTE Administrator** | `aicte_admin` | `AicteAdmin@2026` | National Regulatory Admin; platform-wide oversight, cross-institutional enrolment monitoring, and discrepancy resolution. |
| **Verifier** | `verifier_agency_01` | `VerifierPass$2026` | Credential Verification Agency; authorized queries against student credentials, APAAR ID verification. |

