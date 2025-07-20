import React from 'react'
import Profile from '../assets/Profile.JPG'
import World from '../assets/world.png'
import Star from '../assets/Star.png'
import Arrow from '../assets/arrow.png'
import Editing from '../assets/Editing.jpeg'
import { aboutUsData } from './data.js'
import Logo from '../assets/logo.png'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
}

function Aboutus() {
  return (
    <section id="about" className="px-4 sm:px-6 md:px-10 lg:px-16 py-20 bg-[#1C1F20] text-[#D3D0C9]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Text Block */}
        <motion.div
          className="w-full lg:w-2/5 space-y-6 text-center lg:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <motion.h2 variants={fadeUp} custom={1} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light">
            About Me
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-[#BBB4A9] text-sm sm:text-base md:text-lg px-2 lg:px-0">
            {aboutUsData.description}
          </motion.p>
          <motion.img
            variants={fadeUp}
            custom={3}
            src={Arrow}
            alt="Arrow"
            className="w-32 sm:w-48 md:w-60 lg:w-72 xl:w-80 mx-auto lg:mx-0 mt-4"
          />
        </motion.div>

        {/* Right Grid Content */}
        <div className="w-full lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 max-sm:gap-15 gap-6">
          {/* Stat Card */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-[#181B1C] text-[#BBB4A9] rounded-2xl shadow-sm p-5 mx-5 flex flex-col items-start text-left space-y-4"
          >
            <img src={Logo} alt="Logo" className="w-20 sm:w-24 h-20 sm:h-24 object-cover rounded-full" />
            <h3 className="text-4xl sm:text-5xl font-light">{aboutUsData.videosEdited}+</h3>
            <p className="text-sm">Video edited</p>
            <p className="text-sm sm:text-base">{aboutUsData.oneLiner}</p>
            <motion.div
              variants={fadeUp}
              custom={2}
              className="w-full"
            >
              <img
                src={Editing}
                alt="Editing"
                className="w-full h-full object-cover rounded-xl"
              />
            </motion.div>
          </motion.div>

          {/* Profile Popup + Info Points */}
          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            {/* Profile Popup */}
            <motion.div variants={fadeUp} custom={1} className="flex justify-center">
              <div className="relative group flex justify-center items-center w-full">
                <img
                  src={Profile}
                  alt="Popup Face"
                  className="rounded-xl h-full ml-5 w-[160px] md:w-[180px] lg:w-[200px] object-cover"
                />
                <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <div className="bg-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl">
                    <a
                      href="https://www.instagram.com/sharad.s.chauhan/reels"
                      target="_blank"
                      rel="noopener noreferrer"
                    >↗</a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Info Points */}
            <div className="space-y-6">
              <motion.div variants={fadeUp} custom={2} className="flex items-start gap-4">
                <img src={Star} alt="Client" className="w-10 sm:w-12 h-10 sm:h-12 object-cover rounded-lg" />
                <p className="text-[#BBB4A9] text-sm sm:text-base leading-relaxed">
                  {aboutUsData.point1}
                </p>
              </motion.div>
              <motion.div variants={fadeUp} custom={3} className="flex items-start gap-4">
                <img src={Star} alt="Client" className="w-10 sm:w-12 h-10 sm:h-12 object-cover rounded-lg" />
                <p className="text-[#BBB4A9] text-sm sm:text-base leading-relaxed">
                  {aboutUsData.point2}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Aboutus
