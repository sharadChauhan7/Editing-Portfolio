import React from 'react'

import InstagramIcon from '@mui/icons-material/Instagram';
function Footer() {
  return (
    <header className="w-full h-40 bg-[#1E1E1E] px-16 max-xl:px-10 max-md:px-5 py-6 text-white">
      <div className="max-w-7xl mx-auto  border-white h-full flex flex-col md:flex-row items-center justify-between gap-6 max-md:gap-3">
        {/* Navigation */}
        <nav className="flex gap-6 max-lg:gap-4 text-xs  lg:text-sm">
          {[["", "Home"], ["#about", "About Me"], ["#portfolio", "Portfolio"]].map((item, index) => (
            <a
              key={item}
              href={item[0]}
              className={`px-4 max-xl:px-3 py-1.5 rounded-full ${
                index === 0
                  ? "bg-white/10 backdrop-blur text-white font-medium"
                  : "hover:text-neutral-300 transition"
              }`}
            >
              {item[1]}
            </a>
          ))}
          {/* Add instagram handles use MUI for icons */}
          <a href="https://www.instagram.com/sharad.s.chauhan/reels" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
          </a>
          <a href="https://www.instagram.com/sharadedits_/reels" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
          </a>

        </nav>

        {/* Email */}
        <a
          href="mailto:sharadsingh6464@gmail.com"
          className="text-5xl max-xl:text-4xl max-lg:text-2xl font-light text-white hover:opacity-90 transition-all"
        >
          sharadsingh6464@gmail.com
        </a>
      </div>
    </header>
  );
};
export default Footer;