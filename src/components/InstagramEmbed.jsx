import React, { useEffect } from "react";

const InstagramEmbed = ({ reelUrl }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const embedHtml = `
    <blockquote 
      class="instagram-media" 
      data-instgrm-permalink="${reelUrl}" 
      data-instgrm-version="14" 
      style="width:100%; border:0; background:#FFF;"
    ></blockquote>
  `;

  return (
    <div className="w-full">
      <div className="aspect-[9/16] max-h-[480px] w-full overflow-hidden rounded-xl shadow-lg bg-white">
        <div
          className="w-full h-full"
          dangerouslySetInnerHTML={{ __html: embedHtml }}
        />
      </div>
    </div>
  );
};

export default InstagramEmbed;
