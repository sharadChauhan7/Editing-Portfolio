// src/components/YouTubeShortEmbed.js
import React, { useState } from "react";

const YouTubeShortEmbed = ({ videoId }) => {
    const [loadError, setLoadError] = useState(false);

    const iframeSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&loop=1&playlist=${videoId}&origin=${window.location.origin}`;

    return (
        <div className="w-full rounded-lg shadow-2xs">
            {!loadError ? (
                <iframe
                    className="rounded-lg aspect-[9/16] shadow-md"
                    width="315"
                    height="560"
                    src={iframeSrc}
                    title="YouTube video"
                    allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    onError={() => setLoadError(true)}
                    loading="lazy"
                />
            ) : (
                <div className="flex items-center justify-center h-[560px] bg-gray-100 rounded-lg">
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Video failed to load.</p>
                        <button
                            onClick={() => setLoadError(false)}
                            className="text-blue-500 underline text-sm"
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
