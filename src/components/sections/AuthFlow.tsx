import { motion, AnimatePresence } from 'framer-motion'
import { FormEvent, useState } from 'react'
import { authLogin, authSignup, setAuthToken, User } from '../../api/api'
import './AuthFlow.css'

interface AuthFlowProps {
  setUser: (user: User | null) => void
}

export default function AuthFlow({ setUser }: AuthFlowProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ email: '', password: '', name: '' })
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    setLoading(true)

    try {
      const response = isLogin
        ? await authLogin({ email: formData.email, password: formData.password })
        : await authSignup({
            username: formData.name,
            email: formData.email,
            password: formData.password,
          })

      if (response.data?.token) {
        setAuthToken(response.data.token)
      }

      const backendUser = response.data.user
      const loggedInUser: User = backendUser
        ? {
            id: backendUser.id || 'local',
            email: backendUser.email || formData.email,
            username: backendUser.username || formData.name || formData.email.split('@')[0] || 'User',
          }
        : {
            id: 'local',
            email: formData.email,
            username: formData.name || formData.email.split('@')[0] || 'User',
          }

      setUser(loggedInUser)
      setFormData({ email: '', password: '', name: '' })
    } catch (error) {
      setErrorMessage(
        'Authentication failed. Please check your credentials and make sure the backend is running.'
      )
    } finally {
      setLoading(false)
    }
  }

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
    <section id="auth" className="auth-flow">
      <motion.div
        className="auth-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="auth-header">
          <h2 className="section-title">
            Get <span className="title-highlight">Started</span>
          </h2>
          <p className="section-subtitle">
            Tip: In digital circuits, a flip-flop stores a single bit of data. Try simulating one!
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="auth-box">
          {/* Tabs */}
          <div className="auth-tabs">
            <motion.button
              className={`auth-tab ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
              whileHover={{ color: '#39ff14' }}
            >
              Login
            </motion.button>
            <motion.button
              className={`auth-tab ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
              whileHover={{ color: '#39ff14' }}
            >
              Sign Up
            </motion.button>
          </div>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="auth-form"
            >
              {!isLogin && (
                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </motion.div>
              )}

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              {isLogin && (
                <motion.div
                  className="forgot-password"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <a href="#" onClick={e => { e.preventDefault(); alert('Password reset is not available in this demo.'); }}>Forgot password?</a>
                </motion.div>
              )}

              <motion.button
                type="submit"
                className="btn-submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                {loading ? 'Working...' : isLogin ? 'Login Now' : 'Create Account'}
              </motion.button>
              {errorMessage && <div className="form-error">{errorMessage}</div>}
            </motion.form>
          </AnimatePresence>

          {/* Electronics Fun Fact */}
          <div className="auth-divider">
            <span>Did you know? The first microprocessor, Intel 4004, had just 2,300 transistors!</span>
          </div>

          {/* Social Auth removed as requested */}
        </motion.div>

        {/* Features List */}
        <motion.div variants={itemVariants} className="auth-features">
          <div className="feature-item">
            <span className="feature-icon">✓</span>
            <span>Unlimited designs</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✓</span>
            <span>Cloud storage</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✓</span>
            <span>Real-time collaboration</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✓</span>
            <span>Advanced analytics</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
