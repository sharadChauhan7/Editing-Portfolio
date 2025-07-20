import React, { useState } from 'react'
import Joi from 'joi'
import Logo from '../assets/logo.png'
import { motion } from 'framer-motion'

const schema = Joi.object({
  name: Joi.string().min(2).max(50).required().label('Your Name'),
  email: Joi.string().email({ tlds: { allow: false } }).required().label('Your Email'),
  length: Joi.string().min(1).max(30).required().label('Length of the video'),
  message: Joi.string().min(5).max(1000).required().label('Your Message'),
})

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

function InputField({ name, type = 'text', value, onChange, placeholder, error }) {
  const isTextarea = name === 'message'
  const inputClass = 'w-full bg-transparent border-b border-[#BBB4A9] placeholder:text-[#7B7B7B] text-lg focus:outline-none py-2'
  return (
    <div>
      {isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${inputClass} resize-none`}
          rows="4"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  )
}

function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', length: '', message: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { error } = schema.validate(form, { abortEarly: false })
    if (error) {
      const errObj = {}
      error.details.forEach((d) => {
        errObj[d.path[0]] = d.message
      })
      setErrors(errObj)
      return
    }
    alert('Still working on the form, please contact the owner manually!')
    setForm({ name: '', email: '', length: '', message: '' })
    setErrors({})
  }

  return (
    <section className="relative min-h-screen w-full text-[#D3D0C9] bg-[#1C1F20] flex flex-col overflow-hidden">
      {/* Background Glass & Blur Animation */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute w-96 h-96 bg-pink-500 opacity-10 rounded-full blur-[150px] top-[-50px] left-[-50px] animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-purple-500 opacity-10 rounded-full blur-[120px] bottom-[10%] right-[10%] animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-blue-500 opacity-10 rounded-full blur-[100px] top-[30%] left-[30%] animate-pulse"></div>
        <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl animate-pulse opacity-10"></div>
      </div>

      <motion.div
        className="relative z-10 flex justify-between items-center px-6 md:px-16 py-6 w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
      >
        <a href="/">
          <img src={Logo} alt="Logo" className="h-10 w-auto rounded-full" />
        </a>

        <div className="hidden md:flex space-x-10 text-base">
          <a href="/#about" className="hover:underline">About Me</a>
          <a href="/#portfolio" className="hover:underline">Portfolio</a>
        </div>

        <div className="text-sm underline hidden md:block glow-text">
          Contact
        </div>
      </motion.div>

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

        <motion.div
          className="flex-1 flex flex-col justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
        >
          <motion.h1 variants={fadeInVariants} custom={1} className="text-4xl sm:text-5xl lg:text-7xl font-light mb-4">
            Let's Connect
          </motion.h1>

          <motion.p variants={fadeInVariants} custom={2} className="text-[#A39A8D] text-lg mb-10 max-w-md">
            Have an idea or a project? Let's work together and create something amazing.
          </motion.p>

          <motion.div variants={fadeInVariants} custom={3} className="space-y-2 text-base">
            <p><strong>Email:</strong> sharadsingh6464@gmail.com</p>
            <p><strong>Phone:</strong> +91 9634879999</p>
            <p><strong>Location:</strong> India / Remote</p>
          </motion.div>
        </motion.div>

        <motion.form
          className="flex-1 flex flex-col space-y-6 max-w-md w-full"
          onSubmit={handleSubmit}
          noValidate
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
        >
          <InputField
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={schema.extract('name')._flags.label}
            error={errors.name}
          />
          <InputField
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder={schema.extract('email')._flags.label}
            error={errors.email}
          />
          <InputField
            name="length"
            value={form.length}
            onChange={handleChange}
            placeholder={schema.extract('length')._flags.label}
            error={errors.length}
          />
          <InputField
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder={schema.extract('message')._flags.label}
            error={errors.message}
          />

          <motion.button
            type="submit"
            variants={fadeInVariants}
            custom={5}
            className="border border-[#BBB4A9] py-2 px-4 text-base hover:bg-[#222222] hover:text-white transition-colors"
          >
            Send Message ↗
          </motion.button>
        </motion.form>
      </div>

      <motion.div
        className="fixed left-2 bottom-10 text-[#A39A8D] text-sm rotate-[-90deg] hidden md:block z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        2025
      </motion.div>

      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </section>
  )
}

export default ContactUs