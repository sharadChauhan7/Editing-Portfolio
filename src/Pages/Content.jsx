import React, { Suspense } from 'react';
import { ArrowOutward } from '@mui/icons-material';
import FloatingParticles from '../components/FloatingParticles';
import { useEffect, useState } from 'react';

const YouTubeEmbed = React.lazy(() => import('../components/YouTubeEmbed'));
const InstagramEmbed = React.lazy(() => import('../components/InstagramEmbed'));
export default function Content({ projectData }) {
  


  const {
    title = 'My Work',
    Images = [],
    Titles = [],
    Subtitles = [],
    Urls = [],
    videoIds = [],
  } = projectData || {};


  const isViralWork = title === 'Viral Work';

  return (
    <section
      id="portfolio"
      className="relative z-10 px-4 md:px-12 py-24 text-[#D3D0C9] font-[Aeonik] overflow-hidden"
    >
      {/* Background + Particle FX */}
      <div className="absolute inset-0 bg-[url('/bg-fog.png')] bg-cover bg-center opacity-10 animate-fog z-0" />
      <FloatingParticles count={20} />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-center text-3xl md:text-5xl font-light mb-16">
          {title && <span className="font-semibold text-white">{title}</span>}
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Images.map((_, index) => {
            const image = Images[index];
            const cardTitle = Titles[index] || 'Untitled';
            const subtitle = Subtitles[index] || '';
            const url = Urls?.[index];
            const videoId = videoIds?.[index];

            return (
              <div
                key={index}
                className="group relative rounded-2xl bg-[#1a1a1a]/50 p-2 backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                <div className="overflow-hidden rounded-xl">
                  {isViralWork ? (
                    <>
                      <img
                        src={image}
                        alt={`Latest Work ${index + 1}`}
                        className="w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      {url && (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <ArrowOutward className="text-white text-3xl md:text-4xl" />
                        </a>
                      )}
                    </>
                  ) : videoId ? (
                    <Suspense fallback={<div className="h-80 bg-[#111] rounded-xl" />}>
                      <YouTubeEmbed videoId={videoId} />
                    </Suspense>
                  ) : (
                    <div className="h-80 bg-[#111] rounded-xl flex items-center justify-center text-sm text-[#888]">
                      No video available
                    </div>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <p className="font-medium text-lg md:text-xl text-[#D3D0C9]">{cardTitle}</p>
                  <p className="text-sm md:text-base text-[#A39A8D] mt-1">{subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
