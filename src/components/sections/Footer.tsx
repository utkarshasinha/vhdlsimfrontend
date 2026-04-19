import { motion } from 'framer-motion'
import './Footer.css'

export default function Footer() {
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
    <footer className="footer">
      <motion.div
        className="footer-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Footer Grid */}
        <div className="footer-grid">
          {/* Brand */}
          <motion.div variants={itemVariants} className="footer-section">
            <h3 className="footer-title">VHDL Simulator</h3>
            <p className="footer-description">
              The ultimate platform for VHDL design, simulation, and collaboration.
            </p>
            {/* Social links removed as requested */}
          </motion.div>

          {/* Product */}
          <motion.div variants={itemVariants} className="footer-section">
            <h4 className="footer-section-title">Product</h4>
            <ul className="footer-links">
              <li>
                <motion.a href="#" whileHover={{ x: 5 }}>
                  Features
                </motion.a>
              </li>
              <li>
                <motion.a href="#" whileHover={{ x: 5 }}>
                  Pricing
                </motion.a>
              </li>
              <li>
                <motion.a href="#" whileHover={{ x: 5 }}>
                  Documentation
                </motion.a>
              </li>
              <li>
                <motion.a href="#" whileHover={{ x: 5 }}>
                  API Reference
                </motion.a>
              </li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants} className="footer-section">
            <h4 className="footer-section-title">Company</h4>
            <ul className="footer-links">
              <li>
                <motion.a href="#" whileHover={{ x: 5 }}>
                  About Us
                </motion.a>
              </li>
              <li>
                <motion.a href="#" whileHover={{ x: 5 }}>
                  Blog
                </motion.a>
              </li>
              <li>
                <motion.a href="#" whileHover={{ x: 5 }}>
                  Careers
                </motion.a>
              </li>
              <li>
                <motion.a href="#" whileHover={{ x: 5 }}>
                  Contact
                </motion.a>
              </li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={itemVariants} className="footer-section">
            <h4 className="footer-section-title">Legal</h4>
            <ul className="footer-links">
              <li>
                <motion.a href="#" whileHover={{ x: 5 }}>
                  Privacy Policy
                </motion.a>
              </li>
              <li>
                <motion.a href="#" whileHover={{ x: 5 }}>
                  Terms of Service
                </motion.a>
              </li>
              <li>
                <motion.a href="#" whileHover={{ x: 5 }}>
                  License
                </motion.a>
              </li>
              <li>
                <motion.a href="#" whileHover={{ x: 5 }}>
                  Cookies
                </motion.a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div className="footer-divider" />

        {/* Bottom */}
        <motion.div variants={itemVariants} className="footer-bottom">
          <p className="footer-copyright">
            © 2024 VHDL Simulator. All rights reserved.
          </p>
          <motion.button
            className="scroll-to-top"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ↑ Back to Top
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Background Elements */}
      <motion.div
        className="footer-glow"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
    </footer>
  )
}
