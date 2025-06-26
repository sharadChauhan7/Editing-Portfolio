import { useRef, useEffect, useState } from "react";
import withColor from "../assets/WithColor.mp4";
import withoutColor from "../assets/WithoutColor.mp4";
import withColorImage from "../assets/WithColor.jpg";
import withoutColorImage from "../assets/WithoutColor.jpg";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function VideoCompareCard() {
  const containerRef = useRef(null);
  const beforeRef = useRef(null);
  const afterRef = useRef(null);
  const [sliderX, setSliderX] = useState(50); // % position of slider
  const [videosLoaded, setVideosLoaded] = useState(false);

  // Manual fallback after 7 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVideosLoaded(true);
    }, 7000);
    return () => clearTimeout(timeout);
  }, []);

  // Wait for both videos to be ready
  useEffect(() => {
    let loadedCount = 0;
    const handleLoad = () => {
      loadedCount += 1;
      if (loadedCount === 2) {
        setVideosLoaded(true);
      }
    };

    const before = beforeRef.current;
    const after = afterRef.current;
    before?.addEventListener("canplaythrough", handleLoad);
    after?.addEventListener("canplaythrough", handleLoad);

    return () => {
      before?.removeEventListener("canplaythrough", handleLoad);
      after?.removeEventListener("canplaythrough", handleLoad);
    };
  }, []);

  // Sync videos during playback
  useEffect(() => {
    const before = beforeRef.current;
    const after = afterRef.current;
    if (!before || !after) return;

    const sync = () => {
      if (Math.abs(before.currentTime - after.currentTime) > 0.03) {
        after.currentTime = before.currentTime;
      }
    };

    before.addEventListener("timeupdate", sync);
    return () => before.removeEventListener("timeupdate", sync);
  }, []);

  // Drag logic
  const updateSlider = (clientX) => {
    const bounds = containerRef.current.getBoundingClientRect();
    const x = ((clientX - bounds.left) / bounds.width) * 100;
    setSliderX(Math.max(0, Math.min(100, x)));
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

  // Shared draggable handle
  const Handle = (
    <div
      className="absolute top-0 bottom-0 w-1 bg-white z-10"
      style={{ left: `${sliderX}%`, transform: "translateX(-50%)" }}
    >
      <div className="absolute top-1/2 left-1/2 w-14 h-14 bg-white rounded-full border border-gray-400 shadow flex items-center justify-center gap-1 -translate-x-1/2 -translate-y-1/2">
        <PlayArrowIcon style={{ transform: "rotate(180deg)", fontSize: 25 }} />
        <PlayArrowIcon style={{ fontSize: 25 }} />
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-6 font-[Aeonik]">
      <h2 className="text-center text-4xl font-semibold mb-12">Color Grading</h2>

      <div
        ref={containerRef}
        className="relative w-full aspect-video overflow-hidden rounded-xl group cursor-ew-resize"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Image Placeholder */}
        {!videosLoaded && (
          <>
            <img
              src={withColorImage}
              className="absolute top-0 left-0 w-full h-full object-cover z-0"
              alt="With Color"
            />
            <img
              src={withoutColorImage}
              className="absolute top-0 left-0 w-full h-full object-cover z-10"
              style={{
                clipPath: `inset(0 ${100 - sliderX}% 0 0)`,
              }}
              alt="Without Color"
            />
            {Handle}
          </>
        )}

        {/* Videos - show only after loaded or timeout */}
        <div
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
            videosLoaded ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <video
            ref={afterRef}
            src={withColor}
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
          <video
            ref={beforeRef}
            src={withoutColor}
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{
              clipPath: `inset(0 ${100 - sliderX}% 0 0)`,
            }}
            autoPlay
            muted
            loop
            playsInline
          />
          {Handle}
        </div>
      </div>
    </div>
  );
}
