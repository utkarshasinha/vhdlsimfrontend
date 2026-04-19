import { motion } from 'framer-motion'
import { User } from '../../api/api'
import './ProfileSection.css'

interface ProfileSectionProps {
  user: User
}

export default function ProfileSection({ user }: ProfileSectionProps) {

  const myDesigns = [
    { title: 'My First AND Gate', language: 'VHDL', created: '2 weeks ago' },
    { title: 'Advanced Counter', language: 'VHDL', created: '1 week ago' },
    { title: 'Memory Module', language: 'Verilog', created: '3 days ago' },
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
    <section id="profile" className="profile-section">
      <motion.div
        className="profile-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Profile Header */}
        <motion.div variants={itemVariants} className="profile-header">
          <h2 className="section-title">
            My <span className="title-highlight">Profile</span>
          </h2>
          <p className="section-subtitle">
            Manage your designs and account settings
          </p>
        </motion.div>

        {/* User Info Card */}
        <motion.div variants={itemVariants} className="user-info-card">
          <div className="user-avatar">
            <span>{user.username.slice(0, 2).toUpperCase()}</span>
          </div>
          <div className="user-details">
            <h3>{user.username}</h3>
            <p>{user.email}</p>
            <p className="user-bio">Passionate VHDL designer and hardware enthusiast</p>
          </div>
          <motion.button
            className="btn-edit-profile"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Edit Profile
          </motion.button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          className="profile-stats"
        >
          <motion.div variants={itemVariants} className="stat-card">
            <div className="stat-number">12</div>
            <div className="stat-label">Designs Created</div>
          </motion.div>
          <motion.div variants={itemVariants} className="stat-card">
            <div className="stat-number">1.2k</div>
            <div className="stat-label">Total Downloads</div>
          </motion.div>
          <motion.div variants={itemVariants} className="stat-card">
            <div className="stat-number">450</div>
            <div className="stat-label">Favorites Received</div>
          </motion.div>
          <motion.div variants={itemVariants} className="stat-card">
            <div className="stat-number">8</div>
            <div className="stat-label">Followers</div>
          </motion.div>
        </motion.div>

        {/* My Designs */}
        <motion.div variants={itemVariants} className="my-designs-section">
          <h3 className="subsection-title">My Designs</h3>
          <div className="designs-list">
            {myDesigns.map((design, index) => (
              <motion.div
                key={index}
                className="design-item"
                whileHover={{ x: 10, boxShadow: '0 0 30px rgba(0, 255, 65, 0.3)' }}
              >
                <div className="design-info">
                  <h4>{design.title}</h4>
                  <p>{design.language} • {design.created}</p>
                </div>
                <div className="design-actions">
                  <button className="btn-action">Edit</button>
                  <button className="btn-action btn-delete">Delete</button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Create New Design CTA */}
        <motion.div
          variants={itemVariants}
          className="create-design-cta"
        >
          <div className="cta-content">
            <h3>Ready to Create Something New?</h3>
            <p>Start designing your next amazing VHDL project</p>
          </div>
          <motion.button
            className="btn-create"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 255, 65, 0.6)' }}
            whileTap={{ scale: 0.95 }}
          >
            + New Design
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}
