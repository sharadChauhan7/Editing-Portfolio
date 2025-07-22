import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

function Booking() {
  const animationProps = useMemo(() => ({
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: 'easeOut' },
  }), [])

  return (
    <section className="relative px-6 md:px-16 py-28 max-sm:py-14 overflow-hidden z-10">
      {/* Removed unused background particles to reduce GPU usage */}

      <motion.div
        {...animationProps}
        className="relative max-w-3xl mx-auto text-center p-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_60px_#ffffff0f] overflow-hidden"
      >
        {/* ✨ Simplified shimmer layer */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/5 via-white/0 to-white/5 opacity-10 blur-2xl animate-shimmer" />

        <div className="relative z-10 w-full">
          <h2 className="text-3xl md:text-5xl font-light mb-6 leading-tight">
            Got a Vision?{' '}
            <span className="font-medium text-[#F4EDE4]">Let’s Bring It to Life!</span>
          </h2>

          <p className="text-[#BBB4A9] text-base md:text-lg leading-relaxed mb-10">
            I'm always excited to collaborate on new and innovative projects. Bring it on!
          </p>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            href="/contactus"
            className="relative inline-block text-base md:text-lg underline underline-offset-4 decoration-1 text-[#F4EDE4] transition"
          >
            <span className="relative z-10">Contact Me</span>
            <span className="absolute -inset-1 rounded-full blur-md opacity-60 bg-[#F4EDE4]/30 animate-pulse z-0" />
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}

export default Booking
