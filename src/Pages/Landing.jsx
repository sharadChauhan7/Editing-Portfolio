import React from 'react'
import { landingPageData } from './data.js'
import Logo from '../assets/logo.png'
import { motion } from 'framer-motion'

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

function Landing() {
  return (
    <section className="relative min-h-screen w-full text-[#D3D0C9] flex flex-col items-center overflow-hidden bg-[#1C1F20]">
      {/* Background Glass & Particles */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute w-96 h-96 bg-pink-500 opacity-10 rounded-full blur-[150px] top-[-50px] left-[-50px] animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-purple-500 opacity-10 rounded-full blur-[120px] bottom-[10%] right-[10%] animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-blue-500 opacity-10 rounded-full blur-[100px] top-[30%] left-[30%] animate-pulse"></div>
        <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl animate-pulse opacity-10"></div>
      </div>

      {/* Top Nav */}
      <motion.div
        className="relative z-10 flex justify-between items-center px-6 md:px-16 py-6 w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
      >
        <div className="text-xl mx-4 font-bold">
          <a href="/">
            <img src={Logo} alt="Logo" className="h-10 w-auto rounded-full" />
          </a>
        </div>

        <div className="hidden md:flex space-x-10 text-base">
          <a href="#about" className="hover:underline">About Me</a>
          <a href="#portfolio" className="hover:underline">Portfolio</a>
        </div>

        <div className="text-sm mx-6 md:block">
          <a href="/contactus" className="underline hover:text-white transition duration-300 glow-text">Contact Me</a>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex-grow flex flex-col items-start justify-center px-6 md:px-16 w-full max-w-screen-xl">
        {/* Vertical Text */}
        <motion.div
          className="hidden md:block text-sm text-[#A39A8D] rotate-[-90deg] absolute left-2 top-1/4 origin-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Video Editor
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="flex flex-col items-start justify-center w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
        >
          <motion.div variants={fadeInVariants} custom={1} className="flex items-end justify-start w-full">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light">Hi, I am</h1>
          </motion.div>

          <motion.h1
            variants={fadeInVariants}
            custom={2}
            className="text-[80px] ss:text-[100px] xs:text-[120px] sm:text-[150px] md:text-[160px] lg:text-[220px] xl:text-[270px] text-center md:text-left leading-none font-light mb-4 mt-2 break-words"
          >
            SHARAD
          </motion.h1>

          <motion.p
            variants={fadeInVariants}
            custom={3}
            className="text-[#A39A8D] text-lg text-center md:text-left mb-8"
          >
            — The editing wizard
          </motion.p>

          <motion.div
            variants={fadeInVariants}
            custom={4}
            className="flex gap-2 flex-row sm:space-x-10 space-y-4 sm:space-y-0 mb-10 text-center sm:text-left"
          >
            <div>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extralight">
                {landingPageData.followerCount}+
              </h3>
              <p className="text-[#A39A8D] text-sm">Instagram Follower</p>
            </div>
            <div>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extralight">
                {landingPageData.views}k+
              </h3>
              <p className="text-[#A39A8D] text-sm">Video views</p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInVariants}
            custom={5}
            className="mt-6 sm:mt-12 text-base text-[#A39A8D]"
          >
            Scroll down ↓
          </motion.div>
        </motion.div>
      </div>

      {/* Left Bottom Year (Rotated) */}
      <motion.div
        className="fixed left-2 bottom-10 text-[#A39A8D] text-sm rotate-[-90deg] hidden md:block z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        2025
      </motion.div>

      {/* Glow text class */}
      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </section>
  )
}

export default Landing
