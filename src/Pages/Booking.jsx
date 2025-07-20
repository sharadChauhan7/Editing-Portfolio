import React from 'react'
import { motion } from 'framer-motion'

function Booking() {
  return (
    <section className="relative bg-[#1C1F20] text-[#D3D0C9] px-6 md:px-16 py-28 max-sm:py-14 overflow-hidden z-10">
      {/* 🟣 Floating particles */}
      <div className="absolute inset-0 -z-10 pointer-events-none ">
        <div className="w-full h-full animate-pulse-slow  bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.03),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.02),transparent_40%)]" />
      </div>

      {/* 🔮 Main Card with animated shimmer */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative max-w-3xl mx-auto  text-center p-10 rounded-2xl border border-white/10  bg-white/5 backdrop-blur-xl shadow-[0_0_60px_#ffffff0f] overflow-hidden"
      >
        {/* ✨ Shimmer animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/0 to-white/5 animate-shimmer opacity-10 blur-2xl z-0" />

        <div className="relative z-10 w-full ">
          <h2 className="text-3xl md:text-5xl font-light mb-6 leading-tight">
            Got a Vision?{' '}
            <span className="font-medium text-[#F4EDE4]">
              Let’s Bring It to Life!
            </span>
          </h2>

          <p className="text-[#BBB4A9] text-base md:text-lg leading-relaxed mb-10">
            I'm always excited to collaborate on new and innovative projects. Bring it on!
          </p>

          {/* 🌀 Pulsing CTA */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            href="/contactus"
            className="inline-block text-base md:text-lg underline underline-offset-4 decoration-1 text-[#F4EDE4] transition relative"
          >
            <span className="relative z-10">Contact Me</span>
            <span className="absolute -inset-1 rounded-full blur-md  opacity-60 bg-[#F4EDE4]/30 animate-pulse z-0"></span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}

export default Booking
