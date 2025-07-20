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
    <section id="about" className="px-4 sm:px-6 md:px-10 lg:px-16 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="backdrop-blur-xl bg-white/5  rounded-3xl px-6 sm:px-10 py-12 md:py-16 lg:py-20  border border-white/10 shadow-[0_0_60px_rgba(255,255,255,0.07)]"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left: Text Block */}
            <motion.div
              className="w-full lg:w-2/5 space-y-6 text-center lg:text-left "
              variants={fadeUp}
              custom={1}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light">About Me</h2>
              <p className="text-[#BBB4A9] text-sm sm:text-base md:text-lg">
                {aboutUsData.description}
              </p>
              <motion.img
                variants={fadeUp}
                custom={2}
                src={Arrow}
                alt="Arrow"
                className="w-40 sm:w-52 mx-auto lg:mx-0 mt-4"
              />
            </motion.div>

            {/* Right: Content Grid */}
            <div className="w-full lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Stat Card */}
              <motion.div
                variants={fadeUp}
                custom={2}
                className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-4"
              >
                <img src={Logo} alt="Logo" className="w-20 h-20 object-cover rounded-full" />
                <h3 className="text-4xl sm:text-5xl font-light text-white">{aboutUsData.videosEdited}+</h3>
                <p className="text-sm text-[#BBB4A9]">Videos Edited</p>
                <p className="text-sm sm:text-base text-[#BBB4A9]">{aboutUsData.oneLiner}</p>
                <img src={Editing} alt="Editing" className="w-full h-40 object-cover rounded-xl" />
              </motion.div>

              {/* Profile and Highlights */}
              <motion.div
                variants={fadeUp}
                custom={3}
                className="flex flex-col gap-6"
              >
                {/* Profile Popup */}
                <div className="relative group mx-auto">
                  <img
                    src={Profile}
                    alt="Profile"
                    className="rounded-xl w-[180px] h-[220px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <a
                      href="https://www.instagram.com/sharad.s.chauhan/reels"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl"
                    >
                      ↗
                    </a>
                  </div>
                </div>

                {/* Info Points */}
                <div className="space-y-6">
                  {[aboutUsData.point1, aboutUsData.point2].map((point, idx) => (
                    <motion.div
                      key={idx}
                      variants={fadeUp}
                      custom={idx + 4}
                      className="flex items-start gap-4"
                    >
                      <img src={Star} alt="Point" className="w-10 h-10 object-cover rounded-lg" />
                      <p className="text-[#BBB4A9] text-sm sm:text-base leading-relaxed">{point}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Aboutus
