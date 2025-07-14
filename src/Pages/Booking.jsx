import React from 'react'

function Booking() {
  return (
<section className="bg-[#1C1F20] text-[#D3D0C9] px-6 md:px-16 py-28 text-center  max-sm:py-14">
  <div className="max-w-3xl mx-auto">
    <h2 className="text-3xl md:text-5xl font-light mb-6">
      Got a Vision? <span className="font-medium">Let’s Bring It to Life!</span>
    </h2>
    <p className="text-[#BBB4A9] text-base md:text-lg leading-relaxed mb-10">
      I'm always excited to collaborate on new and innovative projects. Bring it on!
    </p>
    <a
      href="/contactus"
      className="inline-block text-base md:text-lg underline underline-offset-4 decoration-1 hover:opacity-80 transition"
    >
      Contact Me 
    </a>
  </div>
</section>

  )
}

export default Booking