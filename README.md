## Backend Repository

The backend for this project can be found here:
https://github.com/utkarshasinha/vhdlsimulator

---

# VHDL Simulator UI

A modern, circuit-themed VHDL/Verilog simulator frontend with continuous scrolling flow, smooth animations, and a sleek green and black aesthetic.

## Features

✨ **Modern UI/UX**
- Continuous scrolling experience with no segmentation
- Smooth animations and transitions using Framer Motion
- Circuit-themed design with moving backgrounds
- Green and black neon color scheme

🎯 **Key Sections**
- **Hero** - Animated introduction with CTA buttons
- **Features** - Interactive feature cards with hover effects
- **Simulator** - Live code editor preview with waveform visualization
- **Gallery** - Browse community designs with filtering
- **Authentication** - Login/signup with smooth transitions
- **Profile** - User dashboard with design management
- **Footer** - Complete footer with links and CTA

⚡ **Technical Stack**
- React 18 with TypeScript
- Vite for fast development
- Framer Motion for advanced animations
- Responsive design (mobile-first)

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── App.tsx                 # Main app component
├── App.css                # Global styles
├── main.tsx               # Entry point
├── index.css             # Base styles
└── components/
    ├── AnimatedBackground.tsx    # Background animation component
    ├── AnimatedBackground.css
    ├── Navbar.tsx                # Navigation bar
    ├── Navbar.css
    └── sections/
        ├── Hero.tsx              # Hero section
        ├── Hero.css
        ├── Features.tsx          # Features showcase
        ├── Features.css
        ├── SimulatorPreview.tsx  # Simulator preview
        ├── SimulatorPreview.css
        ├── GalleryPreview.tsx    # Design gallery
        ├── GalleryPreview.css
        ├── AuthFlow.tsx          # Login/signup
        ├── AuthFlow.css
        ├── ProfileSection.tsx    # User profile
        ├── ProfileSection.css
        ├── Footer.tsx            # Footer
        └── Footer.css
```

## Color Scheme

- **Primary Green**: `#00ff41`
- **Neon Green**: `#39ff14`
- **Dark Green**: `#001a00`
- **Background Black**: `#0a0e27`
- **Dark Black**: `#050810`

## Animations

- Floating particles
- Moving circuit lines
- Pulsing background elements
- Smooth section transitions
- Interactive button effects
- Waveform visualizations

## Responsive Design

The UI is fully responsive with breakpoints at:
- 1024px (tablets)
- 768px (mobile)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Getting Started

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Open http://localhost:5173 in your browser
4. Scroll through the continuous flow experience

## Backend Integration

1. Create a `.env` file in the project root with your API base URL:
   ```bash
   VITE_API_BASE_URL=http://localhost:8080/api
   ```
2. The frontend now uses `src/api/api.ts` with Axios to call backend routes.
3. Expected endpoints:
   - `POST /auth/login`
   - `POST /auth/register`
   - `POST /simulate`
4. If your backend runs on a different origin, enable CORS on the server and restart Vite after updating `.env`.

## Customization

### Colors
Edit the CSS variables in `src/App.css`:
```css
:root {
  --primary-green: #00ff41;
  --neon-green: #39ff14;
  /* ... */
}
```

### Animations
Adjust animation properties in component CSS files or modify Framer Motion variants in component files.

### Content
Update text, images, and links in individual component files.

## Performance

- Optimized animations using CSS transforms
- Lazy loading with Framer Motion's `whileInView`
- Fixed background for smooth scrolling
- Minimal DOM reflows

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or suggestions, please create an issue in the repository.

---

**Built with ❤️ for hardware designers**
