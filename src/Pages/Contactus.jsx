import React, { useState } from 'react'
import Joi from 'joi'
import Logo from '../assets/logo.png'

const schema = Joi.object({
  name: Joi.string().min(2).max(50).required().label('Your Name'),
  email: Joi.string().email({ tlds: { allow: false } }).required().label('Your Email'),
  length: Joi.string().min(1).max(30).required().label('Length of the video'),
  message: Joi.string().min(5).max(1000).required().label('Your Message'),
})

function ContactUs() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    length: '',
    message: '',
  })
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
    // Submit logic here (e.g., API call)
    alert('Still working on the form, please contact the owner manually!')
    setForm({ name: '', email: '', length: '', message: '' })
    setErrors({})
  }

  return (
    <div className="min-h-screen w-full bg-[#1C1F20] text-[#D3D0C9] flex flex-col">
      {/* Top Nav */}
      <div className="flex justify-between items-center px-6 md:px-16 py-6">
        <div className="text-xl font-bold">
          <a href="/">
            <img src={Logo} alt="Logo" className="h-10 w-auto" />
          </a>
        </div>
        <div className="md:flex space-x-10 text-base">
          <a href="/" className="hover:underline">About Me</a>
          <a href="/" className="hover:underline">Portfolio</a>
        </div>
        <div className="text-sm underline hidden md:block">
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col md:flex-row px-6 md:px-16 relative">
        {/* Vertical Text */}
        <div className="hidden md:block text-sm text-[#7B7B7B] rotate-[-90deg] absolute left-2 top-1/4 origin-left">
          Contact
        </div>

        {/* Left Side: Details */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start py-10">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light mb-4">
            Let's Connect
          </h1>
          <p className="text-[#BBB4A9] text-lg mb-10 max-w-md text-center md:text-left">
            Have an idea or a project? Let's work together and create something amazing.
          </p>

          <div className="space-y-4 text-center md:text-left">
            <p className="text-base">
              <strong>Email:</strong> sharadsingh6464@gmail.com
            </p>
            <p className="text-base">
              <strong>Phone:</strong> +91 9634879999
            </p>
            <p className="text-base">
              <strong>Location:</strong> India / Remote
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 flex flex-col justify-center py-10">
          <form
            className="flex flex-col space-y-6 max-w-md w-full mx-auto md:ml-auto"
            onSubmit={handleSubmit}
            noValidate
          >
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="bg-transparent border-b border-[#BBB4A9] placeholder:text-[#7B7B7B] text-lg focus:outline-none py-2"
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="bg-transparent border-b border-[#BBB4A9] placeholder:text-[#7B7B7B] text-lg focus:outline-none py-2"
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
            <input
              type="text"
              name="length"
              value={form.length}
              onChange={handleChange}
              placeholder="Length of the video"
              className="bg-transparent border-b border-[#BBB4A9] placeholder:text-[#7B7B7B] text-lg focus:outline-none py-2"
            />
            {errors.length && <span className="text-red-500 text-xs">{errors.length}</span>}
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="bg-transparent border-b border-[#BBB4A9]  placeholder:text-[#7B7B7B] text-lg focus:outline-none py-2 resize-none"
              rows="4"
            />
            {errors.message && <span className="text-red-500 text-xs">{errors.message}</span>}
            <button
              type="submit"
              className="border border-[#BBB4A9] py-2 px-4 text-base hover:bg-[#222222] hover:text-[#F8F8F8] transition-colors"
            >
              Send Message ↗
            </button>
          </form>
        </div>
      </div>

      {/* Left Bottom Year (Rotated) */}
      <div className="fixed left-2 bottom-10 text-[#7B7B7B] text-sm rotate-[-90deg] hidden md:block">
        2024
      </div>
    </div>
  )
}

export default ContactUs