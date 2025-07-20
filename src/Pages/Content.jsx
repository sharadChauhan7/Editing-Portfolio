import { ArrowOutward } from '@mui/icons-material';
import YouTubeEmbed from '../components/YouTubeEmbed';

export default function Content({ projectData }) {
  return (
    <section
      id="portfolio"
      className="relative z-10 px-4 md:px-12 py-24 text-[#D3D0C9] font-[Aeonik] overflow-hidden"
    >
      {/* Fog Background */}
      <div className="absolute inset-0 bg-[url('/bg-fog.png')] bg-cover bg-center opacity-10 animate-fog z-0" />

      {/* Floating Particles */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-full h-full overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full blur-sm animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 5}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-center text-3xl md:text-5xl font-light mb-16">
          {projectData.title && <span className="font-semibold text-white">{projectData.title}</span>}
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projectData.Images.map((image, index) => (
            <div
              key={index}
              className="group relative rounded-2xl bg-[#1a1a1a]/50 p-2 backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              <div className="overflow-hidden rounded-xl">
                {projectData.title === 'Viral Work' ? (
                  <>
                    <img
                      src={image}
                      alt={`Latest Work ${index + 1}`}
                      className="w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                    />
                    <a
                      href={projectData.Urls[index]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ArrowOutward className="text-white text-3xl md:text-4xl" />
                    </a>
                  </>
                ) : (
                  <YouTubeEmbed videoId={projectData.videoIds[index]} />
                )}
              </div>

              <div className="mt-4 text-center">
                <p className="font-medium text-lg md:text-xl text-[#D3D0C9]">
                  {projectData.Titles[index]}
                </p>
                <p className="text-sm md:text-base text-[#A39A8D] mt-1">
                  {projectData.Subtitles[index]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
