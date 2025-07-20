import { useRef, useEffect, useState } from "react";
import withColorImage from "../assets/WithColor.jpg";
import withoutColorImage from "../assets/WithoutColor.jpg";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { motion } from "framer-motion";

const WITH_COLOR_URL =
  "https://res.cloudinary.com/dwlxbcctg/video/upload/q_auto,f_auto/Editing_Portfolio/iwilzyh7iexvprtwrosm";
const WITHOUT_COLOR_URL =
  "https://res.cloudinary.com/dwlxbcctg/video/upload/q_auto,f_auto/Editing_Portfolio/hn6lyjiy5udetcmichmd";

export default function VideoCompareCard() {
  const containerRef = useRef(null);
  const beforeRef = useRef(null);
  const afterRef = useRef(null);

  const [sliderX, setSliderX] = useState(50);
  const [videosLoaded, setVideosLoaded] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setVideosLoaded(true), 7000);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    let loaded = 0;
    const onReady = () => {
      loaded += 1;
      if (loaded === 2) setVideosLoaded(true);
    };

    const before = beforeRef.current;
    const after = afterRef.current;
    before?.addEventListener("canplaythrough", onReady);
    after?.addEventListener("canplaythrough", onReady);

    return () => {
      before?.removeEventListener("canplaythrough", onReady);
      after?.removeEventListener("canplaythrough", onReady);
    };
  }, []);

  useEffect(() => {
    if (videosLoaded) {
      const before = beforeRef.current;
      const after = afterRef.current;

      if (before && after) {
        const syncTime = Math.max(before.currentTime, after.currentTime);
        before.currentTime = syncTime;
        after.currentTime = syncTime;
        before.play();
        after.play();
      }
    }
  }, [videosLoaded]);

  const updateSlider = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSliderX(Math.max(0, Math.min(100, pct)));
  };

  const handleMouseDown = (e) => {
    updateSlider(e.clientX);
    const move = (e) => updateSlider(e.clientX);
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const handleTouchStart = (e) => {
    updateSlider(e.touches[0].clientX);
    const move = (e) => updateSlider(e.touches[0].clientX);
    const end = () => {
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", end);
    };
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", end);
  };

  const Handle = (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
      className="absolute top-0 bottom-0 w-1.5 bg-[#1D1F20] z-10"
      style={{ left: `${sliderX}%`, transform: "translateX(-50%)" }}
    >
      <div className="absolute top-1/2 left-1/2 w-16 h-16 max-sm:w-10 max-sm:h-10 bg-[#1D1F20] rounded-full border border-[#D2D0C9] shadow flex items-center justify-center gap-1 -translate-x-1/2 -translate-y-1/2">
        <PlayArrowIcon className="rotate-180 text-[#D2D0C9]" fontSize="1px" />
        <PlayArrowIcon className="text-[#D2D0C9]" fontSize="1px" />
      </div>
    </motion.div>
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full max-w-6xl mx-auto my-20 px-6 font-[Aeonik]"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: true }}
        className="text-center text-6xl max-md:text-4xl font-semibold mb-12"
      >
        Color Grading
      </motion.h2>

      {/* Video Comparison Container */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative w-full aspect-video overflow-hidden rounded-xl group cursor-ew-resize border border-white/10 shadow-[0_0_60px_rgba(255,255,255,0.07)]"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Image fallback while loading */}
        {!videosLoaded && (
          <>
            <img
              src={withColorImage}
              alt="With Color"
              className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />
            <img
              src={withoutColorImage}
              alt="Without Color"
              className="absolute top-0 left-0 w-full h-full object-cover z-10"
              style={{ clipPath: `inset(0 ${100 - sliderX}% 0 0)` }}
            />
            {Handle}
          </>
        )}

        {/* Videos */}
        <div
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
            videosLoaded ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* After (with color) */}
          <video
            ref={afterRef}
            src={WITH_COLOR_URL}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

          {/* Before (without color) */}
          <video
            ref={beforeRef}
            src={WITHOUT_COLOR_URL}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ clipPath: `inset(0 ${100 - sliderX}% 0 0)` }}
          />
          {Handle}
        </div>
      </motion.div>
    </motion.section>
  );
}
