import { motion } from 'framer-motion'
import './Hero.css'

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section id="hero" className="hero">
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Animated Title */}
        <motion.div variants={itemVariants} className="hero-title-wrapper">
          <h1 className="hero-title">
            VHDL <span className="title-accent">SIMULATOR</span>
          </h1>
          <motion.div
            className="circuit-accent-line"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p variants={itemVariants} className="hero-subtitle">
          Design. Simulate. Perfect.
        </motion.p>

        {/* Description */}
        <motion.p variants={itemVariants} className="hero-description">
          Experience next-generation hardware simulation with real-time waveform visualization.
          Create, test, and share your VHDL designs in a powerful, intuitive environment.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="hero-cta">
          <motion.button
            className="btn-primary"
            onClick={() => scrollToSection('simulator')}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 65, 0.8)' }}
            whileTap={{ scale: 0.95 }}
          >
            Start Simulating
          </motion.button>
          <motion.button
            className="btn-secondary"
            onClick={() => scrollToSection('gallery')}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(57, 255, 20, 0.6)' }}
            whileTap={{ scale: 0.95 }}
          >
            View Gallery
          </motion.button>
        </motion.div>

        {/* Animated Stats - Electronics Fun Facts */}
        <motion.div variants={itemVariants} className="hero-stats">
          <div className="stat">
            <motion.div
              className="stat-number"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⚡
            </motion.div>
            <p>Fun Fact: The first microprocessor, Intel 4004, had just 2,300 transistors.</p>
          </div>
          <div className="stat">
            <motion.div
              className="stat-number"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            >
              🔋
            </motion.div>
            <p>Did you know? A flip-flop is a basic memory cell in digital electronics.</p>
          </div>
          <div className="stat">
            <motion.div
              className="stat-number"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
            >
              🧠
            </motion.div>
            <p>Tip: Logic gates are the building blocks of all digital circuits.</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Animated Circuit Background Element */}
      <motion.svg
        className="hero-circuit-svg"
        viewBox="0 0 400 300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <defs>
          <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 255, 65, 0.5)" />
            <stop offset="100%" stopColor="rgba(57, 255, 20, 0.3)" />
          </linearGradient>
        </defs>
        <motion.rect
          x="20"
          y="20"
          width="360"
          height="260"
          fill="none"
          stroke="url(#heroGradient)"
          strokeWidth="2"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            strokeWidth: [2, 3, 2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
        <motion.circle
          cx="200"
          cy="150"
          r="80"
          fill="none"
          stroke="rgba(0, 255, 65, 0.3)"
          strokeWidth="2"
          animate={{
            r: [80, 100, 80],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
      </motion.svg>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="mouse">
          <div className="wheel" />
        </div>
        <p>Scroll to explore</p>
      </motion.div>
    </section>
  )
}
