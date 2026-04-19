# VHDL Simulator Frontend - Project Guidelines

## Project Overview
A modern React + TypeScript + Vite frontend for a VHDL simulator with a circuit-themed UI featuring continuous scrolling animations and a green/black aesthetic.

## Tech Stack
- React 18 with TypeScript
- Vite (build tool)
- Framer Motion (animations)
- CSS3 (styling)

## File Structure Rules
- Components are organized in `src/components/`
- Section components go in `src/components/sections/`
- Each component has a corresponding `.tsx` and `.css` file
- Global styles in `src/App.css`
- All components use TypeScript with strict mode

## Styling Guidelines
- Use CSS custom properties (--primary-green, --neon-green, etc.)
- Color scheme: Green (#00ff41, #39ff14) and Black (#0a0e27, #050810)
- All animations use Framer Motion or CSS animations
- Mobile-first responsive design with breakpoints at 1024px and 768px
- Box-shadow effects use green glow: `0 0 Xpx rgba(0, 255, 65, 0.Y)`

## Component Architecture
- Each section is a self-contained Framer Motion component
- Use `whileInView` for scroll-triggered animations
- Container variants for staggered animations
- Smooth transitions with `duration: 0.3-0.8s`

## Animation Patterns
- Hero sections: fade-in with staggered children
- Cards: hover effects with scale and glow
- Buttons: scale on hover/tap with box-shadow effects
- Background: fixed positioned with floating particles and animated lines

## Code Standards
- Use functional components with hooks
- Implement TypeScript interfaces for props
- Use motion components from Framer Motion
- Keep component props minimal and typed
- Export components as default exports

## State Management
- Currently using React useState for auth state in App.tsx
- Future: Consider Zustand for global state if scaling

## Performance Considerations
- Use `viewport={{ once: true }}` for whileInView animations
- Fixed background to prevent repaints on scroll
- Lazy load sections with viewport triggers
- CSS transforms for animations (GPU acceleration)

## Responsive Behavior
- Mobile: Hide non-essential elements, stack layouts vertically
- Tablet: Adjust grid columns and spacing
- Desktop: Full feature set with multi-column layouts
- Test at 320px, 768px, 1024px, 1440px+

## Color Usage
Primary Green: Text, borders, highlights, glow effects
Neon Green: Accents, intense glows, special elements
Dark Colors: Backgrounds, gradients
Secondary Gray: Supporting text, disabled states

## Future Enhancements
- Integration with backend API
- WebSocket for real-time simulation
- Code editor with syntax highlighting
- VCD waveform viewer component
- User authentication flow
- Design collaboration features
