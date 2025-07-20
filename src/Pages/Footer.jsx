import React from 'react';
import { motion } from 'framer-motion';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full border-t border-white/10 bg-[#1E1E1E] px-16 max-xl:px-10 max-md:px-5 py-6 text-white"
    >
      <div className="max-w-7xl mx-auto h-full flex flex-col md:flex-row items-center justify-between gap-6 max-md:gap-3">
        {/* Navigation */}
        <nav className="flex gap-6 max-lg:gap-4 text-xs lg:text-sm">
          {[["", "Home"], ["#about", "About Me"], ["#portfolio", "Portfolio"]].map(([href, label], index) => (
            <a
              key={label}
              href={href}
              className={`px-4 max-xl:px-3 py-1.5 rounded-full ${
                index === 0
                  ? "bg-white/10 backdrop-blur text-white font-medium"
                  : "hover:text-neutral-300 transition"
              }`}
            >
              {label}
            </a>
          ))}
          <a href="https://www.instagram.com/sharad.s.chauhan/reels" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
          </a>
          <a href="https://www.instagram.com/sharadedits_/" target="_blank" rel="noopener noreferrer">
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
    </motion.footer>
  );
}

export default Footer;
