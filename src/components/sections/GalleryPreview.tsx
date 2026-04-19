import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { Design, getDesigns } from '../../api/api'
import './GalleryPreview.css'

interface GalleryPreviewProps {
  setSelectedCode: Dispatch<SetStateAction<string>>
}

export default function GalleryPreview({ setSelectedCode }: GalleryPreviewProps) {
  const [selectedDesign, setSelectedDesign] = useState<number | null>(null)
  const [designs, setDesigns] = useState<Design[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  console.log('GalleryPreview render - selectedDesign:', selectedDesign)
  console.log('GalleryPreview render - designs length:', designs.length)

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        console.log('Fetching designs from:', `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'}/designs`)
        const response = await getDesigns()
        console.log('Designs response:', response)
        const designsData = response.data.data || response.data.designs || (Array.isArray(response.data) ? response.data : [])
        console.log('Number of designs:', designsData.length)
        setDesigns(designsData)
      } catch (err: any) {
        console.error('Error fetching designs:', err)
        
        let errorMessage = 'Failed to load designs'
        if (err.response) {
          // Server responded with error status
          console.error('Response status:', err.response.status)
          console.error('Response data:', err.response.data)
          errorMessage = `Server error: ${err.response.status} - ${err.response.statusText}`
          if (err.response.data?.message) {
            errorMessage += ` (${err.response.data.message})`
          }
        } else if (err.request) {
          // Network error
          console.error('Network request failed:', err.request)
          errorMessage = 'Network error: Cannot connect to backend. Is the server running on http://localhost:8080?'
        } else {
          // Other error
          console.error('Other error:', err.message)
          errorMessage = `Error: ${err.message || 'Unknown error'}`
        }
        
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchDesigns()
  }, [])

  if (loading) {
    return (
      <section className="gallery-preview">
        <div className="container">
          <div className="gallery-header">
            <h2>Design Gallery</h2>
            <p>Loading designs...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="gallery-preview">
        <div className="container">
          <div className="gallery-header">
            <h2>Design Gallery</h2>
            <p className="error-message">{error}</p>
            <p className="error-help">
              <strong>Troubleshooting:</strong><br/>
              1. Make sure your backend is running: <code>go run cmd/server/main.go</code><br/>
              2. Check that the server is on <code>http://localhost:8080</code><br/>
              3. Verify the <code>/api/designs</code> endpoint exists<br/>
              4. Check browser console for detailed error logs
            </p>
          </div>
        </div>
      </section>
    )
  }

  if (!designs || designs.length === 0) {
    return (
      <section className="gallery-preview">
        <div className="container">
          <div className="gallery-header">
            <h2>Design Gallery</h2>
            <p>No designs available yet. Check back later!</p>
          </div>
        </div>
      </section>
    )
  }

  const designsWithWaveforms = designs.map((design) => ({
    ...design,
    waveform: Array.isArray(design.waveform)
      ? design.waveform
      : [
          { label: 'A', y: 18, path: 'M 10 18 L 40 18 L 70 18 L 100 18 L 130 18 L 160 18 L 190 18 L 220 18 L 250 18 L 280 18 L 310 18 L 340 18 L 370 18 L 400 18 L 430 18 L 460 18 L 490 18 L 520 18 L 550 18 L 580 18 L 610 18 L 640 18 L 670 18 L 700 18 L 730 18 L 760 18 L 790 18' },
          { label: 'B', y: 38, path: 'M 10 38 L 40 38 L 70 38 L 100 38 L 130 38 L 160 38 L 190 38 L 220 38 L 250 38 L 280 38 L 310 38 L 340 38 L 370 38 L 400 38 L 430 38 L 460 38 L 490 38 L 520 38 L 550 38 L 580 38 L 610 38 L 640 38 L 670 38 L 700 38 L 730 38 L 760 38 L 790 38' },
          { label: 'Y', y: 58, path: 'M 10 58 L 40 58 L 70 58 L 100 58 L 130 58 L 160 58 L 190 58 L 220 58 L 250 58 L 280 58 L 310 58 L 340 58 L 370 58 L 400 58 L 430 58 L 460 58 L 490 58 L 520 58 L 550 58 L 580 58 L 610 58 L 640 58 L 670 58 L 700 58 L 730 58 L 760 58 L 790 58' },
        ],
  }))

  const downloadDesign = (design: typeof designsWithWaveforms[0]) => {
    const blob = new Blob([design.code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${design.title.replace(/\s+/g, '_')}.${design.language === 'VHDL' ? 'vhd' : 'v'}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const useInSimulator = (design: typeof designsWithWaveforms[0]) => {
    setSelectedCode(design.code)
    // Scroll to simulator section
    const simulatorSection = document.getElementById('simulator')
    if (simulatorSection) {
      simulatorSection.scrollIntoView({ behavior: 'smooth' })
    }
    setSelectedDesign(null)
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
    <section id="gallery" className="gallery-preview">
      <motion.div
        className="gallery-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="gallery-header">
          <h2 className="section-title">
            Design <span className="title-highlight">Gallery</span>
          </h2>
          <p className="section-subtitle">
            Explore thousands of community-created designs
          </p>
        </motion.div>

        <motion.div
          className="gallery-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {designsWithWaveforms.map((design, index) => (
            <motion.div
              key={index}
              className="design-card"
              variants={itemVariants}
              whileHover={{ y: -15, boxShadow: '0 0 50px rgba(0, 255, 65, 0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="design-header">
                <div className="design-icon">◄►</div>
                <span className={`language-badge ${design.language.toLowerCase()}`}>
                  {design.language}
                </span>
              </div>

              <h3 className="design-title">{design.title}</h3>
              <p className="design-creator">by {design.creator}</p>

              <div className="waveform-card">
                <svg className="waveform-sparkline" viewBox="0 0 140 64" preserveAspectRatio="none">
                  {design.waveform.map((signal) => (
                    <g key={signal.label}>
                      <path d={signal.path} className="waveform-path" />
                      <text x="0" y={signal.y} className="waveform-signal-label">
                        {signal.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              <div className="design-stats">
                <motion.div
                  className="stat-item"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="stat-icon">⬇</span>
                  <span className="stat-value">{design.downloads}</span>
                </motion.div>
                <motion.div
                  className="stat-item"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="stat-icon">★</span>
                  <span className="stat-value">{Math.floor(Math.random() * 500)}</span>
                </motion.div>
              </div>

              <motion.button
                className="btn-view"
                onClick={() => {
                  console.log('View Design clicked for index:', index)
                  console.log('Design data:', design)
                  setSelectedDesign(index)
                }}
                whileHover={{ boxShadow: '0 0 20px rgba(0, 255, 65, 0.6)' }}
                whileTap={{ scale: 0.95 }}
              >
                View Design
              </motion.button>

              {/* Card Border Animation */}
              <motion.div className="card-border" />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button removed as requested */}
      </motion.div>

      {/* Design Details Modal */}
      <AnimatePresence>
        {selectedDesign !== null && designs[selectedDesign] && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDesign(null)}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ background: 'rgba(10, 14, 39, 0.95)', border: '2px solid rgba(0, 255, 65, 0.3)', borderRadius: '8px', maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto', padding: '40px', boxShadow: '0 0 60px rgba(0, 255, 65, 0.4)' }}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedDesign(null)}
              >
                ✕
              </button>

              <div className="modal-header">
                <h2>{designs[selectedDesign].title}</h2>
                <p className="modal-creator">by {designs[selectedDesign].creator}</p>
              </div>

              <div className="modal-body">
                <p className="modal-description">{designs[selectedDesign].description}</p>

                <div className="code-section">
                  <h3>Source Code ({designs[selectedDesign].language})</h3>
                  <pre className="code-block">{designs[selectedDesign].code}</pre>
                </div>

                <div className="waveform-section">
                  <h3>Waveform Signals</h3>
                  <svg className="waveform-large" viewBox="0 0 800 200">
                    {Array.isArray(designs[selectedDesign].waveform)
                      ? designs[selectedDesign].waveform.map((signal) => (
                          <g key={signal.label}>
                            <text x="10" y={signal.y}>{signal.label}</text>
                            <path d={signal.path} className="waveform-path-large" />
                          </g>
                        ))
                      : <text x="10" y="30" fill="#00ff41">No waveform data</text>
                    }
                  </svg>
                </div>

                <div className="modal-stats">
                  <div className="stat-block">
                    <span className="stat-label">Downloads:</span>
                    <span className="stat-value">{designs[selectedDesign].downloads}</span>
                  </div>
                  <div className="stat-block">
                    <span className="stat-label">Language:</span>
                    <span className="stat-value">{designs[selectedDesign].language}</span>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <motion.button
                  className="btn-download"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => downloadDesign(designs[selectedDesign!])}
                >
                  Download Design
                </motion.button>
                <motion.button
                  className="btn-use"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => useInSimulator(designs[selectedDesign!])}
                >
                  Use in Simulator
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
