// ContactUs.jsx
import React, { useState, useCallback, useMemo } from 'react'
import Logo from '../assets/logo.png'
import { motion } from 'framer-motion'
import Joi from 'joi'
import { useNavigate } from 'react-router-dom'

// Move schema and labels out of render
const schema = Joi.object({
  name: Joi.string().min(2).max(50).required().label('Your Name'),
  email: Joi.string().email({ tlds: { allow: false } }).required().label('Your Email'),
  videoLength: Joi.string().min(1).max(30).required().label('Length of the video'),
  videoInfo: Joi.string().min(5).max(1000).required().label('Your Message'),
})

const labels = {
  name: 'Your Name',
  email: 'Your Email',
  videoLength: 'Length of the video',
  videoInfo: 'Your Message',
}

// Animation variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
}


// Input Field
const InputField = React.memo(({ name, type = 'text', value, onChange, placeholder, error }) => {
  const inputClass =
    'w-full bg-transparent border-b border-[#BBB4A9] placeholder:text-[#7B7B7B] text-lg focus:outline-none py-2';

  // Check if the field is the long message field
  if (name === 'videoInfo') {
    return (
      <div>
        <textarea
          name={name}
          value={value}
          onChange={(e) => {
            // Word limit check (200 words)
            const words = e.target.value.trim().split(/\s+/);
            if (words.length <= 200) {
              onChange(e);
            }
          }}
          placeholder={placeholder}
          rows={5}
          className={`${inputClass} resize-y min-h-[120px] max-h-[400px]`}
          onKeyDown={(e) => {
            // Prevent form submit on Enter
            if (e.key === 'Enter' && !e.shiftKey) {
              e.stopPropagation();
            }
          }}
        />
        <div className="text-xs text-right text-gray-400 mt-1">
          {value.trim() ? value.trim().split(/\s+/).length : 0}/200 words
        </div>
        {error && <span className="text-red-500 text-xs">{error}</span>}
      </div>
    );
  }

  // Normal input for other fields
  return (
    <div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClass}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
});


function ContactUs() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', videoLength: '', videoInfo: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = schema.validate(form, { abortEarly: false })
    if (error) {
      const errObj = {}
      error.details.forEach((d) => {
        errObj[d.path[0]] = d.message
      })
      setErrors(errObj)
      return
    }

    try {
      await fetch("https://script.google.com/macros/s/AKfycbyyqrNkq8BK7UBhcrphsgHbuoF1hv_O55MbobiBMdNLyY1g1uQw3aZKde11XjQR_fjt/exec", {
        method: "POST",
        body: JSON.stringify(form),
      });

      alert("✅ Your request has been sent we will get back to you soon!");
    } catch (error) {
      alert("❌ Failed to send message. Try again after some time or if it's urgent, contact me via email or phone.");
    }
    setForm({ name: '', email: '', videoLength: '', videoInfo: '' })
    setErrors({});
    setLoading(false)
    navigate('/', { replace: true });

  }

  const animationProps = useMemo(() => ({
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true },
    variants: fadeInVariants,
  }), [])

  return (
    <section className="relative min-h-screen w-full text-[#D3D0C9] bg-[#1C1F20] flex flex-col overflow-hidden">
      {/* Animated Gradient Backgrounds */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[
          ['w-96 h-96 bg-pink-500 top-[-50px] left-[-50px] blur-[150px]'],
          ['w-80 h-80 bg-purple-500 bottom-[10%] right-[10%] blur-[120px]'],
          ['w-72 h-72 bg-blue-500 top-[30%] left-[30%] blur-[100px]'],
        ].map(([cls], i) => (
          <div key={i} className={`absolute rounded-full opacity-10 animate-pulse ${cls}`}></div>
        ))}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl animate-pulse opacity-10"></div>
      </div>

      {/* Header */}
      <motion.div className="relative z-10 flex justify-between items-center px-6 md:px-16 py-6 w-full" {...animationProps}>
        <a href="/">
          <img src={Logo} alt="Logo" className="h-10 w-auto rounded-full" loading="lazy" />
        </a>
        <div className="hidden md:flex space-x-10 text-base">
          <a href="/#about" className="hover:underline">About Me</a>
          <a href="/#portfolio" className="hover:underline">Portfolio</a>
        </div>
        <div className="text-sm underline hidden md:block glow-text">Contact</div>
      </motion.div>

      {/* Main Section */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row px-6 md:px-16 gap-12 py-10">
        <motion.div
          className="hidden md:block text-sm text-[#A39A8D] rotate-[-90deg] absolute left-2 top-1/4 origin-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Contact
        </motion.div>

        <motion.div className="flex-1 flex flex-col justify-center" {...animationProps}>
          <motion.h1 custom={1} variants={fadeInVariants} className="text-4xl sm:text-5xl lg:text-7xl font-light mb-4">
            Let's Connect
          </motion.h1>
          <motion.p custom={2} variants={fadeInVariants} className="text-[#A39A8D] text-lg mb-10 max-w-md">
            Have an idea or a project? Let's work together and create something amazing.
          </motion.p>
          <motion.div custom={3} variants={fadeInVariants} className="space-y-2 text-base">
            <p><strong>Email:</strong> sharadsingh6464@gmail.com</p>
            <p><strong>Phone:</strong> +91 9634879999</p>
            <p><strong>Location:</strong> India / Remote</p>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.form className="flex-1 flex flex-col space-y-6 max-w-md w-full" onSubmit={handleSubmit} noValidate {...animationProps}>
          {Object.keys(form).map((field, idx) => (
            <InputField
              key={field}
              name={field}
              type={field === 'email' ? 'email' : 'text'}
              value={form[field]}
              onChange={handleChange}
              placeholder={labels[field]}
              error={errors[field]}
            />
          ))}
           <motion.button
            type="submit"
            variants={fadeInVariants}
            custom={5}
            className={`border border-[#BBB4A9] py-2 px-4 text-base hover:bg-[#222222] hover:text-white transition-colors flex items-center justify-center`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                </svg>
                Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </motion.button>
        </motion.form>
      </div>

      {/* Footer Year */}
      <motion.div
        className="fixed left-2 bottom-10 text-[#A39A8D] text-sm rotate-[-90deg] hidden md:block z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        2025
      </motion.div>

      {/* Glow Style */}
      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </section>
  )
}

export default ContactUs
