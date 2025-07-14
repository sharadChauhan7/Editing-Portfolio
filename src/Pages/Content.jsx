import { ArrowOutward } from '@mui/icons-material';
import InstagramEmbed from '../components/InstagramEmbed'
import YouTubeEmbed from '../components/YouTubeEmbed'
export default function Content({ projectData }) {
  const reelUrl = "https://www.instagram.com/reel/C59LqDuSTaa/";
  return (
    <section id="portfolio" className=" px-4 py-16 bg-[#1C1F20] text-[#D3D0C9] font-[Aeonik]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-4">
          {/* <span className="bg-black text-white text-sm px-4 py-1 rounded-full">Portfolio</span> */}
        </div>
        <h2 className="text-center text-4xl font-semibold mb-12">{projectData.title}</h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 ">
          {projectData.Images.map((image, index) => (
            <div key={index} className="group relative flex flex-col items-center justify-center">
              <div className="relative overflow-hidden rounded-xl">               

                  {projectData.title === "Viral Work" ? <>
                    <img
                      src={image}
                      alt={`Latest Work ${index + 1}`}
                      className="w-full h-auto object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                    />
                    <a
                      href={projectData.Urls[index]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ArrowOutward className="text-white text-4xl" />
                    </a>
                  </> : <YouTubeEmbed videoId={projectData.videoIds[index]} />}

                </div>
                <div className="mt-4 text-base text-[#D3D0C9]">
                  <p className="font-medium">{projectData.Titles[index]}</p>
                  <p className="text-sm text-[#A39A8D] mt-1">{projectData.Subtitles[index]}</p>
                </div>

              </div>
          ))}
            </div>
      </div>
    </section>
  );
}
