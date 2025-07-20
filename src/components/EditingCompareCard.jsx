import { useRef, useEffect, useState } from "react";
import withColorImage from "../assets/Loader.png";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { motion } from "framer-motion";

const CLOUDINARY_VIDEO_URL = "https://res.cloudinary.com/dwlxbcctg/video/upload/q_auto,f_auto/Editing_Portfolio/Final_Draft_oufruu.mov";

export default function VideoCompareCard() {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVideoLoaded(true), 7000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setVideoLoaded(true);
    video.addEventListener("canplaythrough", handleCanPlay);
    return () => video.removeEventListener("canplaythrough", handleCanPlay);
  }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  return (
      <>
      {/* <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-[#1C1F20] z-10"></div> */}

    <section className="relative z-10 w-full min-h-[80vh] py-20 px-4 md:px-16 bg-[#1C1F20] text-[#D3D0C9] overflow-hidden font-[Aeonik]">
      {/* Background Blur & Glow Particles */}


      {/* Title */}
      <h2 className="relative z-10 text-center text-6xl max-md:text-4xl font-light mb-16">
        Long Form
      </h2>

      {/* Video Player */}
      <div className="relative z-10 max-w-6xl mx-auto w-full aspect-video rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.05)] border border-white/10 backdrop-blur-xl">
        {/* Fallback Image */}
        {!videoLoaded && (
          <img
            src={withColorImage}
            alt="Color Grading Placeholder"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        )}

        {/* Video Mute Toggle */}
        {videoLoaded && (
          <button
            onClick={() => setMuted(!muted)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full backdrop-blur bg-white/20 hover:scale-105 transition-transform shadow-lg"
          >
            {muted ? (
              <VolumeOffIcon style={{ color: "#fff", fontSize: 24 }} />
            ) : (
              <VolumeUpIcon style={{ color: "#fff", fontSize: 24 }} />
            )}
          </button>
        )}

        {/* Video */}
        <video
          ref={videoRef}
          src={CLOUDINARY_VIDEO_URL}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoLoaded ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          autoPlay
          loop
          muted={muted}
          playsInline
          preload="auto"
        />
      </div>
    </section>
    </>
  );
}
