import { motion } from 'framer-motion'
import './Features.css'

export default function Features() {
  const features = [
    {
      icon: '⚡',
      title: 'Real-Time Simulation',
      description: 'Instant VHDL compilation and execution with live waveform visualization',
    },
    {
      icon: '📊',
      title: 'Waveform Viewer',
      description: 'Advanced VCD waveform analysis with zoom, pan, and signal inspection',
    },
    {
      icon: '☁️',
      title: 'Cloud Saved',
      description: 'All your designs automatically saved to cloud with version history',
    },
    {
      icon: '🎨',
      title: 'Code Editor',
      description: 'Syntax-highlighted editor with smart autocomplete and error detection',
    },
    {
      icon: '🌍',
      title: 'Share & Collaborate',
      description: 'Share designs publicly or privately with your team members',
    },
    {
      icon: '🔧',
      title: 'Advanced Tools',
      description: 'Testbench generation, signal debugging, and circuit analysis',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="features" className="features">
      <motion.div
        className="features-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="section-header">
          <h2 className="section-title">
            Core <span className="title-highlight">Features</span>
          </h2>
          <p className="section-subtitle">
            Everything you need for professional VHDL development
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: '0 0 40px rgba(0, 255, 65, 0.5)',
              }}
            >
              <motion.div
                className="feature-icon"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              
              {/* Animated Border */}
              <motion.div
                className="feature-border"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Connecting Lines Animation */}
        <svg className="features-lines" viewBox="0 0 1200 300" preserveAspectRatio="none">
          <defs>
            <linearGradient id="featureLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 255, 65, 0)" />
              <stop offset="50%" stopColor="rgba(0, 255, 65, 0.5)" />
              <stop offset="100%" stopColor="rgba(0, 255, 65, 0)" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 0 150 Q 300 100 600 150 T 1200 150"
            stroke="url(#featureLineGradient)"
            strokeWidth="1"
            fill="none"
            animate={{
              strokeDashoffset: [0, -1200],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
            strokeDasharray="1200"
          />
        </svg>
      </motion.div>
    </section>
  )
}
