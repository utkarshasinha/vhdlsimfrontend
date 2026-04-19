import './App.css'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedBackground from './components/AnimatedBackground'
import Hero from './components/sections/Hero'
import Features from './components/sections/Features'
import SimulatorPreview from './components/sections/SimulatorPreview'
import GalleryPreview from './components/sections/GalleryPreview'
import AuthFlow from './components/sections/AuthFlow'
import ProfileSection from './components/sections/ProfileSection'
import Footer from './components/sections/Footer'
import Navbar from './components/Navbar'
import { authMe, User } from './api/api'

function App() {
  const [scrollY, setScrollY] = useState(0)
  const [user, setUser] = useState<User | null>(null)
  const [selectedCode, setSelectedCode] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('vhdl_token')
    if (!token) return

    const fetchUser = async () => {
      try {
        const response = await authMe()
        setUser(response.data.user)
      } catch (error) {
        setUser(null)
      }
    }

    fetchUser()
  }, [])

  return (
    <div className="app-container">
      <AnimatedBackground scrollProgress={scrollY} />
      <Navbar isLoggedIn={Boolean(user)} setUser={setUser} />
      
      <AnimatePresence mode="wait">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="content-wrapper"
        >
          <Hero />
          <Features />
          <SimulatorPreview selectedCode={selectedCode} setSelectedCode={setSelectedCode} />
          <GalleryPreview setSelectedCode={setSelectedCode} />
          <AuthFlow setUser={setUser} />
          {user && <ProfileSection user={user} />}
          <Footer />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App
