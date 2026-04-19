import { motion } from 'framer-motion'
import { logout, User } from '../api/api'
import './Navbar.css'

interface NavbarProps {
  isLoggedIn: boolean
  setUser: (user: User | null) => void
}

export default function Navbar({ isLoggedIn, setUser }: NavbarProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="nav-content">
        {/* Logo */}
        <motion.div
          className="logo"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="logo-icon">◄►</div>
          <span className="logo-text">VHDL SIM</span>
        </motion.div>

        {/* Navigation Links */}
        <div className="nav-links">
          <motion.button
            className="nav-link"
            onClick={() => scrollToSection('features')}
            whileHover={{ color: '#39ff14', textShadow: '0 0 10px rgba(57, 255, 20, 0.8)' }}
            whileTap={{ scale: 0.95 }}
          >
            Features
          </motion.button>
          <motion.button
            className="nav-link"
            onClick={() => scrollToSection('simulator')}
            whileHover={{ color: '#39ff14', textShadow: '0 0 10px rgba(57, 255, 20, 0.8)' }}
            whileTap={{ scale: 0.95 }}
          >
            Simulator
          </motion.button>
          <motion.button
            className="nav-link"
            onClick={() => scrollToSection('gallery')}
            whileHover={{ color: '#39ff14', textShadow: '0 0 10px rgba(57, 255, 20, 0.8)' }}
            whileTap={{ scale: 0.95 }}
          >
            Gallery
          </motion.button>
        </div>

        {/* Auth Buttons */}
        <div className="nav-auth">
          {!isLoggedIn ? (
            <>
              <motion.button
                className="btn-login"
                onClick={() => scrollToSection('auth')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
              <motion.button
                className="btn-signup"
                onClick={() => scrollToSection('auth')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                className="btn-profile"
                onClick={() => scrollToSection('profile')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Profile
              </motion.button>
              <motion.button
                className="btn-logout"
                onClick={() => {
                  logout()
                  setUser(null)
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Circuit Line Divider */}
      <div className="nav-line" />
    </motion.nav>
  )
}
