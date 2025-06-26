import React, { useEffect } from "react";
const InstagramEmbed = ({ reelUrl }) => {
  useEffect(() => {
    // Load Instagram's embed.js script
    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    // Cleanup script tag when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const embedHtml = `
    <blockquote class="instagram-media" data-instgrm-permalink="${reelUrl}" data-instgrm-version="14" style="background: #FFF; border: 0; margin: 1rem auto; max-width: 540px; width: 100%;"></blockquote>
  `;
  return (
    <div
      className="flex justify-center"
      dangerouslySetInnerHTML={{ __html: embedHtml }}
    />
  );
};
export default InstagramEmbed;