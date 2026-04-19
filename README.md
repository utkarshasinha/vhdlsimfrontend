# VHDL Simulator Frontend

A modern React + TypeScript + Vite frontend for the VHDL Simulator platform.  
It provides a circuit-themed UI for authentication, browsing designs, and running VHDL simulations against the Go backend.

## Features

- Modern continuous scrolling UI
- Smooth Framer Motion animations
- Circuit-themed green and black design
- Login and signup with JWT auth
- Public design gallery fetched from backend
- Simulator panel for running VHDL code
- Profile section for logged-in users
- Responsive mobile-first layout

## Tech Stack

- React 18
- TypeScript
- Vite
- Axios
- Framer Motion

## Project Links

- Frontend Repo: https://github.com/utkarshasinha/vhdlsimfrontend
- Backend Repo: https://github.com/utkarshasinha/vhdlsimulator

## Live Architecture

- Frontend handles UI, state, and API calls
- Backend handles auth, design APIs, and simulation
- JWT token is stored in localStorage and sent in Authorization headers

## Installation

1. Install dependencies:
   npm install

2. Start development server:
   npm run dev

3. Open the app:
   http://localhost:5173

4. Make sure the backend is running on:
   http://localhost:8080

## Environment Variables

Create a `.env` file in the frontend project root:

```env
VITE_API_BASE_URL=http://localhost:8080/api

 For production, set this to your deployed backend URL:
 VITE_API_BASE_URL=https://your-backend-domain/api


 Important:

localhost works only on your own machine
deployed frontend must use a public backend URL
do not hardcode the API URL inside components


Backend Integration
The frontend uses src/api/api.ts with Axios to call backend routes.

Expected endpoints:

POST /auth/signup
POST /auth/login
GET /auth/me
GET /designs
GET /designs/:id
POST /simulate
GET /designs/my


Notes:

POST /auth/register is also supported by the backend as an alias for signup
protected routes require Authorization: Bearer <token>
Authentication Flow
User logs in or signs up from AuthFlow
Backend returns a JWT token
Token is saved in localStorage
Axios adds the Authorization header automatically
App restores auth state on reload
Logout clears token and auth header
Simulator Flow
User writes or loads VHDL code
Simulator sends code to POST /simulate
Request should include:
code
language: "VHDL"
entityName when available
Backend returns:
success
output
error
waveform
If simulation fails, show the backend error message directly in the UI.

Project Structure
.
├── .github/
├── src/
├── .env
├── .env.example
├── .gitignore
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

src/ Structure
src/
├── App.tsx
├── App.css
├── index.css
├── main.tsx
├── api/
│   └── api.ts
└── components/
    ├── AnimatedBackground.tsx
    ├── AnimatedBackground.css
    ├── Navbar.tsx
    ├── Navbar.css
    └── sections/
        ├── Hero.tsx
        ├── Hero.css
        ├── Features.tsx
        ├── Features.css
        ├── SimulatorPreview.tsx
        ├── SimulatorPreview.css
        ├── GalleryPreview.tsx
        ├── GalleryPreview.css
        ├── AuthFlow.tsx
        ├── AuthFlow.css
        ├── ProfileSection.tsx
        ├── ProfileSection.css
        ├── Footer.tsx
        └── Footer.css


Color Scheme
Primary Green: #00ff41
Neon Green: #39ff14
Dark Green: #001a00
Background Black: #0a0e27
Dark Black: #050810
Animations
Floating particles
Moving circuit lines
Pulsing background elements
Smooth section transitions
Button hover and tap effects
Animated waveform preview
Customization
Colors
Edit CSS variables in src/App.css.

Animations
Adjust Framer Motion variants or component CSS animation settings.

Content
Update text, links, and images inside component files.

Responsive Design
The UI is responsive with breakpoints around:

1024px for tablets
768px for mobile
Deployment
Frontend
Recommended: Vercel
Connect the frontend GitHub repo to Vercel
Set VITE_API_BASE_URL to your deployed backend URL
Backend
Deploy separately on Render, Railway, Fly.io, or similar
Allow only trusted frontend origins in CORS
Production Checklist
Set JWT_SECRET in environment variables
Set DATABASE_URL in environment variables
Set CORS_ALLOWED_ORIGINS to your deployed frontend URL
Use a public backend URL in VITE_API_BASE_URL
Troubleshooting
Network error / cannot connect to backend
Check that VITE_API_BASE_URL is correct
Make sure the backend is running
Verify CORS allows the frontend origin
Restart Vite after changing .env
Simulation failed on backend
Ensure language is set to VHDL
Ensure entityName is correct when needed
Make sure the code has a valid entity and architecture
Display backend error text in the simulator UI
Auth issues
Confirm token exists in localStorage
Confirm Authorization header is attached
Test GET /auth/me with the token
Browser Support
Chrome
Firefox
Safari
Edge
Support
For issues or suggestions, open an issue in the repository.

License
MIT License

Built with love for hardware designers
