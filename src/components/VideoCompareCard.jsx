import { useRef, useEffect, useState } from "react";
import withColorImage from "../assets/WithColor.jpg";
import withoutColorImage from "../assets/WithoutColor.jpg";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

/* 🔗 Cloudinary URLs (already q_auto,f_auto-optimised)  */
const WITH_COLOR_URL =
  "https://res.cloudinary.com/dwlxbcctg/video/upload/q_auto,f_auto/Editing_Portfolio/iwilzyh7iexvprtwrosm";
const WITHOUT_COLOR_URL =
  "https://res.cloudinary.com/dwlxbcctg/video/upload/q_auto,f_auto/Editing_Portfolio/hn6lyjiy5udetcmichmd";

export default function VideoCompareCard() {
  const containerRef = useRef(null);
  const beforeRef = useRef(null);
  const afterRef = useRef(null);

  /* slider position (percentage) */
  const [sliderX, setSliderX] = useState(50);

  /* true ⇒ both videos are ready OR 7-second fallback */
  const [videosLoaded, setVideosLoaded] = useState(false);

  /* ───────────────── FALLBACK TIMER ───────────────── */
  useEffect(() => {
    const id = setTimeout(() => setVideosLoaded(true), 7000);
    return () => clearTimeout(id);
  }, []);

  /* ───────────── DETECT WHEN BOTH VIDEOS ARE READY ───────────── */
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

  /* ───────────── KEEP THE TWO VIDEOS IN SYNC ───────────── */
  useEffect(() => {
    if (videosLoaded) {
      const before = beforeRef.current;
      const after = afterRef.current;

      if (before && after) {
        // Force sync both videos to same time
        const syncTime = Math.max(before.currentTime, after.currentTime);
        before.currentTime = syncTime;
        after.currentTime = syncTime;

        // Play both again after sync
        before.play();
        after.play();
      }
    }
  }, [videosLoaded]);


  /* ───────────────── DRAG-/-TOUCH SLIDER ───────────────── */
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

  /* ───────────────── HANDLE (white bar + arrows) ───────────────── */
  const Handle = (
    <div
      className="absolute top-0 bottom-0 w-1.5 bg-[#1D1F20] z-10"
      style={{ left: `${sliderX}%`, transform: "translateX(-50%)" }}
    >
      <div className="absolute top-1/2 left-1/2 w-16 h-16 max-sm:w-10 max-sm:h-10 bg-[#1D1F20] rounded-full border border-[#D2D0C9] shadow flex items-center justify-center gap-1 -translate-x-1/2 -translate-y-1/2">
        {/* Change font size */}

        <PlayArrowIcon className="play-arrow-icon rotate-180 text-[#D2D0C9]"  fontSize="1px"/>
        <PlayArrowIcon className="play-arrow-icon text-[#D2D0C9]"  fontSize="1px" />

      </div>
    </div>
  );

  /* ────────────────────────── RENDER ────────────────────────── */
  return (
    <div className="w-full max-w-6xl mx-auto my-20 p-6 font-[Aeonik]">
      <h2 className="text-center text-6xl max-md:text-4xl font-semibold mb-12">Color Grading</h2>

      <div
        ref={containerRef}
        className="relative w-full aspect-video overflow-hidden rounded-xl group cursor-ew-resize"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* ---------- PLACEHOLDER IMAGES WHILE LOADING ---------- */}
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

        {/* ---------- VIDEOS (SHOWN WHEN READY / TIMEOUT) ---------- */}
        <div
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${videosLoaded ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
          {/* AFTER (with color) */}
          <video
            ref={afterRef}
            src={WITH_COLOR_URL}
            crossOrigin="anonymous"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

          {/* BEFORE (without color) */}
          <video
            ref={beforeRef}
            src={WITHOUT_COLOR_URL}
            crossOrigin="anonymous"
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
      </div>
    </div>
  );
}
