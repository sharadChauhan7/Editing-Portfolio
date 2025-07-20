import { useRef, useEffect, useState } from "react";
import withColorImage from "../assets/Loader.png";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { motion } from "framer-motion";

const CLOUDINARY_VIDEO_URL =
  "https://res.cloudinary.com/dwlxbcctg/video/upload/q_auto,f_auto/Editing_Portfolio/Final_Draft_oufruu.mov";

export default function EditingCompareCard() {
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
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full py-28 px-6 md:px-16 overflow-hidden z-10 text-center font-[Aeonik]"
    >
      {/* 🧠 Animated Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl font-light mb-16 leading-tight text-white"
      >
        Long Form Video
      </motion.h2>

      {/* 🎥 Video Container with fade & scale animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-6xl w-full aspect-video overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_60px_rgba(255,255,255,0.07)]"
      >
        {/* 🖼️ Placeholder image while loading */}
        {!videoLoaded && (
          <img
            src={withColorImage}
            alt="Loading Preview"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        )}

        {/* 🔇 Mute Toggle */}
        {videoLoaded && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            onClick={() => setMuted(!muted)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full backdrop-blur bg-white/20 hover:scale-105 transition-transform shadow-lg"
          >
            {muted ? (
              <VolumeOffIcon style={{ color: "#fff", fontSize: 24 }} />
            ) : (
              <VolumeUpIcon style={{ color: "#fff", fontSize: 24 }} />
            )}
          </motion.button>
        )}

        {/* 🎬 Video */}
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
      </motion.div>
    </motion.section>
  );
}
