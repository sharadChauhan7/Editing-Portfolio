import { useRef, useEffect, useState } from "react";
import withColorImage from "../assets/Loader.png";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

// Cloudinary Optimized Video URL
const CLOUDINARY_VIDEO_URL ="https://res.cloudinary.com/dwlxbcctg/video/upload/q_auto,f_auto/Editing_Portfolio/Final_Draft_oufruu.mov";

// "https://res.cloudinary.com/dwlxbcctg/video/upload/q_auto,f_auto/Editing_Portfolio/jtt9j3pcgccilokgzudp";



  // "https://res.cloudinary.com/dwlxbcctg/video/upload/q_auto,f_auto/Editing_Portfolio/zeeaoqffd6w4rpuhmiyh";

export default function VideoCompareCard() {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [muted, setMuted] = useState(true);

  // Fallback timeout (if canplaythrough doesn't fire)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVideoLoaded(true);
    }, 7000);
    return () => clearTimeout(timeout);
  }, []);

  // Detect when video is ready to play
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setVideoLoaded(true);

    video.addEventListener("canplaythrough", handleCanPlay);
    return () => {
      video.removeEventListener("canplaythrough", handleCanPlay);
    };
  }, []);

  // Sync mute state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  return (
    <div className=" w-full max-w-6xl  mx-auto my-20 p-6 font-[Aeonik]">
      <h2 className="text-center text-6xl max-md:text-4xl font-semibold mb-12">Fussion</h2>

      <div className="relative w-full aspect-video overflow-hidden rounded-xl">
        {/* Placeholder image while video loads */}
        {!videoLoaded && (
          <img
            src={withColorImage}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            alt="Color Grading Placeholder"
          />
        )}

        {/* Mute toggle button */}
        {videoLoaded && (
          <button
            onClick={() => setMuted(!muted)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full shadow bg-[#f8f1e5] hover:scale-105 transition-transform"
          >
            {muted ? (
              <VolumeOffIcon style={{ color: "#000", fontSize: 24 }} />
            ) : (
              <VolumeUpIcon style={{ color: "#000", fontSize: 24 }} />
            )}
          </button>
        )}

        {/* Cloudinary Streaming Video */}
        <video
          ref={videoRef}
          src={CLOUDINARY_VIDEO_URL}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoLoaded ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          autoPlay
          muted={muted}
          loop
          playsInline
          preload="auto"
        />
      </div>
    </div>
  );
}
