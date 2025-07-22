// src/components/InstagramEmbed.js
import React, { useEffect, useRef, useState, memo } from "react";

const InstagramEmbed = ({ reelUrl }) => {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Lazy load only when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !reelUrl || loaded) return;

    const loadInstagram = () => {
      if (window.instgrm && containerRef.current) {
        window.instgrm.Embeds.process();
        setLoaded(true);
      }
    };

    if (!window.instgrm) {
      const scriptExists = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
      if (!scriptExists) {
        const script = document.createElement("script");
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        script.onload = loadInstagram;
        document.body.appendChild(script);
      } else {
        scriptExists.onload = loadInstagram;
      }
    } else {
      loadInstagram();
    }
  }, [inView, reelUrl, loaded]);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="aspect-[9/16] max-h-[480px] w-full overflow-hidden rounded-xl shadow-lg bg-white"
      >
        {!loaded && (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            Loading Instagram Reel...
          </div>
        )}
        {inView && (
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={reelUrl}
            data-instgrm-version="14"
            style={{
              width: "100%",
              border: 0,
              background: "#FFF",
              minHeight: loaded ? "0" : "300px",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default memo(InstagramEmbed);
