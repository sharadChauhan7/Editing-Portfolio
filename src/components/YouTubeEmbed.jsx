// src/components/YouTubeShortEmbed.js
import React, { useState } from "react";

const YouTubeShortEmbed = ({ videoId }) => {
  const [loadError, setLoadError] = useState(false);

  const iframeSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&loop=1&playlist=${videoId}&origin=${window.location.origin}`;

  return (
    <div className="w-full rounded-2xl overflow-hidden">
      {!loadError ? (
        <div className="aspect-[9/16] w-full max-h-[480px] rounded-xl overflow-hidden shadow-lg">
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
        </div>
      ) : (
        <div className="flex items-center justify-center aspect-[9/16] max-h-[480px] bg-gray-800 text-white rounded-xl">
          <div className="text-center space-y-2">
            <p className="text-sm">Video failed to load.</p>
            <button
              onClick={() => setLoadError(false)}
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
