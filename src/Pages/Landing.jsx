import React from 'react'
import { landingPageData } from './data.js'
import Logo from '../assets/logo.png'

function Landing() {
  return (
    <div className="max-h-screen  w-full bg-[#1C1F20] text-[#D3D0C9] flex flex-col items-center">
      {/* Top Nav */}
      <div className="flex justify-between items-center px-6 md:px-16 py-6">
        {/* Logo */}
        <div className="text-xl mx-4 font-bold">
          <a href="/">
            <img src={Logo} alt="Logo" className="h-10 w-auto" />
          </a>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex space-x-10 text-base">
          <a href="#about" className="hover:underline">About Me</a>
          <a href="#portfolio" className="hover:underline">Portfolio</a>
        </div>

        {/* Call to Action */}
        <div className="text-sm underline mx-6  md:block">
          <a href="/contactus"> Contact Me </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-start px-6 md:px-16">
        {/* Vertical Text */}
        <div className="hidden md:block text-sm text-[#A39A8D] rotate-[-90deg] absolute left-2 top-1/4 origin-left">
          Video Editor
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-start justify-center">
          {/* Greeting */}
          <div className="flex items-end justify-start w-full">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light">Hi, I am</h1>
          </div>

          {/* Big Name */}
          <h1
            className="
            text-[80px]
              ss:text-[100px] xs:text-[120px]  sm:text-[150px] md:text-[160px] lg:text-[220px] xl:text-[270px]
              text-center md:text-left leading-none font-light mb-4
              mt-2
              break-words
            "
          >
            SHARAD
          </h1>

          {/* Subtitle */}
          <p className="text-[#A39A8D] text-lg text-center md:text-left mb-8">
            — The editing wizard
          </p>

          {/* Stats */}
          <div className="flex gap-2 flex-row sm:space-x-10 space-y-4 sm:space-y-0 mb-10 text-center sm:text-left">
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
          </div>

          {/* Scroll Down */}
          <div className="mt-12 text-base text-[#A39A8D]">
            Scroll down ↓
          </div>
        </div>
      </div>

      {/* Left Bottom Year (Rotated) */}
      <div className="fixed left-2 bottom-10 text-[#A39A8D] text-sm rotate-[-90deg] hidden md:block">
        2024
      </div>
    </div>
  )
}

export default Landing
