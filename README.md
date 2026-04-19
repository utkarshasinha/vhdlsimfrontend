# VHDL Simulator

A modern React + TypeScript frontend for the VHDL Simulator platform.

This application provides authentication, design management, and a browser-based interface for running VHDL simulations powered by a Go backend integrated with GHDL.

---

## Overview

The frontend is responsible for:

- User authentication and session persistence
- Managing VHDL design data
- Interacting with backend simulation endpoints
- Rendering simulation output and errors
- Providing a responsive, modern UI

It communicates with the backend via REST APIs and uses JWT-based authentication.

---

## Architecture

```
Frontend (React + TS)
        ↓
  Axios API Layer
        ↓
   Go Backend
        ↓
GHDL Simulation Engine
```

### Responsibilities

| Layer | Responsibility |
|-------|---------------|
| Frontend | UI rendering, state management, API calls, token storage |
| Backend | Authentication, design APIs, VHDL simulation via GHDL |

---

## Features

- JWT-based login & signup
- Persistent authentication state
- Public design gallery
- Personal design dashboard
- VHDL simulation interface
- Real-time backend error display
- Responsive mobile-first layout
- Animated circuit-themed UI

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool |
| Axios | HTTP client |
| Framer Motion | Animations |

---

## Authentication Flow

1. User logs in or signs up
2. Backend returns a JWT
3. Token is stored in `localStorage`
4. Axios attaches `Authorization: Bearer <token>` automatically
5. App restores session on reload
6. Logout clears token and resets headers

> Protected routes require a valid JWT sent in the `Authorization` header.

---

## Simulation Flow

1. User writes or loads VHDL code in the simulator panel
2. Frontend sends a `POST /simulate` request

**Request body:**

```json
{
  "code": "string",
  "language": "VHDL",
  "entityName": "string (optional)"
}
```

**Response:**

```json
{
  "success": true,
  "output": "string",
  "error": "string",
  "waveform": "string"
}
```

> If simulation fails, the backend error message is displayed directly in the UI.

---

## Backend API Contract

| Method | Endpoint | Auth Required |
|--------|----------|---------------|
| `POST` | `/auth/signup` | No |
| `POST` | `/auth/login` | No |
| `GET` | `/auth/me` | Yes |
| `GET` | `/designs` | No |
| `GET` | `/designs/:id` | No |
| `GET` | `/designs/my` | Yes |
| `POST` | `/simulate` | Yes |

> `/auth/register` is also supported as an alias for `/auth/signup`

All protected routes require:

```
Authorization: Bearer <token>
```

---

## Project Structure

```
.
├── src/
│   ├── api/
│   │   └── api.ts
│   ├── components/
│   │   ├── AnimatedBackground.tsx
│   │   ├── AnimatedBackground.css
│   │   ├── Navbar.tsx
│   │   ├── Navbar.css
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── Features.tsx
│   │       ├── SimulatorPreview.tsx
│   │       ├── GalleryPreview.tsx
│   │       ├── AuthFlow.tsx
│   │       ├── ProfileSection.tsx
│   │       └── Footer.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── .env
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

> `src/api/api.ts` centralizes all Axios configuration and Authorization header management.

---

## Environment Configuration

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

For production:

```env
VITE_API_BASE_URL=https://your-backend-domain/api
```

> **Important:**
> - Do not hardcode API URLs inside components
> - Restart Vite after modifying `.env`
> - `localhost` only works on your local machine

---

## Installation & Setup

**Install dependencies:**

```bash
npm install
```

**Start development server:**

```bash
npm run dev
```

**Open in browser:**

```
http://localhost:5173
```

> Make sure the backend is running at `http://localhost:8080` before testing API calls.

---

## Deployment

### Frontend — Vercel (Recommended)

1. Connect this GitHub repository to [Vercel](https://vercel.com)
2. Set the environment variable:
   ```
   VITE_API_BASE_URL=https://your-backend-domain/api
   ```
3. Deploy

### Backend

Deploy separately on Render, Railway, or Fly.io and configure:

```env
JWT_SECRET=your_secret
DATABASE_URL=your_postgres_url
CORS_ALLOWED_ORIGINS=https://your-frontend-domain
```

---

## Engineering Decisions

**Why Vite over CRA?**  
Significantly faster cold start and build times. Cleaner configuration with native ESM support.

**Why centralized Axios in `api.ts`?**  
Avoids repeating headers and base URLs across components. Single place to manage interceptors and token injection.

**Why JWT in `localStorage`?**  
Simpler session persistence for the current MVP scope.  
Known tradeoff: vulnerable to XSS. Future plan is to migrate to HTTP-only cookies with refresh token rotation.

**Why separate frontend and backend repositories?**  
Clean service boundaries. Allows independent deployment pipelines and keeps concerns clearly separated.

---

## Known Limitations

- JWT stored in `localStorage` (not HTTP-only cookies)
- No refresh token rotation currently implemented
- Waveform visualization is minimal
- Simulation execution is constrained by backend resource limits

---

## Future Improvements

- [ ] HTTP-only cookie authentication
- [ ] Refresh token rotation
- [ ] Enhanced waveform visualization
- [ ] Rate limiting on simulation endpoint
- [ ] Improved error categorization
- [ ] Optimistic UI updates for design operations

---

## Related Repositories

| Repo | Link |
|------|------|
| Frontend | [vhdlsimfrontend](https://github.com/utkarshasinha/vhdlsimfrontend) |
| Backend | [vhdlsimulator](https://github.com/utkarshasinha/vhdlsimulator) |

---

## Browser Support

| Browser | Supported |
|---------|-----------|
| Chrome | ✅ |
| Firefox | ✅ |
| Safari | ✅ |
| Edge | ✅ |

---

## License

MIT License

---

## Author

Built by [Utkarsha Sinha](https://github.com/utkarshasinha) as part of an effort to modernize the VHDL simulation workflow for ECE students and developers.
