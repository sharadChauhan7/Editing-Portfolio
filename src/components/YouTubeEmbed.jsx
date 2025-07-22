// src/components/YouTubeShortEmbed.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';

const YouTubeShortEmbed = ({ videoId }) => {
  const [loadError, setLoadError] = useState(false);
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  // Only calculate origin client-side
  const origin = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return '';
  }, []);

  // Lazy-load iframe only when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const iframeSrc = useMemo(() => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&loop=1&playlist=${videoId}&origin=${origin}`;
  }, [videoId, origin]);

  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      ref={containerRef}
    >
      {!loadError ? (
        <div className="aspect-[9/16] w-full max-h-[480px] rounded-xl overflow-hidden shadow-lg">
          {inView && (
            <iframe
              src={iframeSrc}
              title="YouTube video"
              className="w-full h-full rounded-xl"
              allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              onError={() => setLoadError(true)}
              loading="lazy"
            />
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center aspect-[9/16] max-h-[480px] bg-gray-800 text-white rounded-xl">
          <div className="text-center space-y-2">
            <p className="text-sm">Video failed to load.</p>
            <button
              onClick={() => {
                setLoadError(false);
                setInView(true);
              }}
              className="text-sm underline hover:text-blue-400 transition"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeShortEmbed;
