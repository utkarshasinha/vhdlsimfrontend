import { motion } from 'framer-motion'
import './AnimatedBackground.css'

interface AnimatedBackgroundProps {
  scrollProgress: number
}

export default function AnimatedBackground({ scrollProgress }: AnimatedBackgroundProps) {
  return (
    <div className="animated-bg">
      {/* Circuit Grid Background */}
      <div className="circuit-grid-animated" />

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="floating-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.sin(i) * 15, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Moving Circuit Lines */}
      <svg className="circuit-lines" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 255, 65, 0)" />
            <stop offset="50%" stopColor="rgba(0, 255, 65, 0.8)" />
            <stop offset="100%" stopColor="rgba(0, 255, 65, 0)" />
          </linearGradient>
        </defs>

        {/* Animated paths */}
        <motion.path
          d="M 0 200 Q 300 100 600 200 T 1200 200"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="1200"
          animate={{
            strokeDashoffset: [1200, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.path
          d="M 0 400 Q 300 500 600 400 T 1200 400"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="1200"
          animate={{
            strokeDashoffset: [0, 1200],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
            delay: 1,
          }}
        />

        <motion.circle
          cx="100"
          cy="100"
          r="5"
          fill="var(--primary-green)"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

        <motion.circle
          cx="1100"
          cy="700"
          r="5"
          fill="var(--neon-green)"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.5,
          }}
        />
      </svg>

      {/* Pulsing Background Elements */}
      <motion.div
        className="pulse-bg-element"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="pulse-bg-element-2"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.2, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Radial Glow Effects */}
      <div className="radial-glow glow-1" />
      <div className="radial-glow glow-2" />
      <div className="radial-glow glow-3" />
    </div>
  )
}
