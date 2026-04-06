import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ChevronDown } from 'lucide-react';
import gallery1 from '@/assets/gallery-tinkering1.webp';
import gallery2 from '@/assets/gallery-tinkering2.webp';
import gallery3 from '@/assets/gallery-tinkering3.webp';
import gallery4 from '@/assets/gallery-tinkering4.webp';
import gallery5 from '@/assets/gallery-tinkering5.webp';

// ===== HOW TO ADD IMAGES & VIDEOS =====
//
// IMAGES:
// 1. Import from src/assets: import myImg from '@/assets/my-photo.webp';
// 2. Or use a raw GitHub URL: 'https://raw.githubusercontent.com/user/repo/main/photo.jpg'
// 3. Add to the `images` array below
//
// VIDEOS (YouTube):
// Add to `videos` array: { url: 'https://www.youtube.com/embed/VIDEO_ID', title: 'Title' }
//
// VIDEOS (Self-hosted / GitHub):
// Add to `localVideos` array: { src: 'https://raw.githubusercontent.com/user/repo/main/video.mp4', title: 'Title' }

const images: Array<{ src: string; alt: string; caption?: string }> = [
  { src: gallery1, alt: 'Students exploring robot designs', caption: 'Students exploring robot designs' },
  { src: gallery2, alt: 'Hands-on Arduino wiring', caption: 'Hands-on Arduino wiring' },
  { src: gallery3, alt: 'Teaching a robotics class', caption: 'Teaching a robotics class' },
  { src: gallery4, alt: '3D printing workshop with students', caption: '3D printing workshop' },
  { src: gallery5, alt: '3D printed parts collection', caption: '3D printed parts collection' },
  // Add more: { src: importedImg, alt: 'description', caption: 'caption' },
];

const videos: Array<{ url: string; title: string }> = [
  // { url: 'https://www.youtube.com/embed/VIDEO_ID', title: 'My Robot Demo' },
];

const localVideos: Array<{ src: string; title: string; poster?: string }> = [
  // { src: 'https://raw.githubusercontent.com/user/repo/main/videos/demo.mp4', title: 'Robot Demo' },
];

const INITIAL_IMAGES = 3;

const GallerySection = () => {
  const ref = useScrollReveal();
  const [showAll, setShowAll] = useState(false);

  const visibleImages = showAll ? images : images.slice(0, INITIAL_IMAGES);

  return (
    <section id="gallery" ref={ref} className="relative z-10 py-24 px-4 section-reveal">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-center mb-4">
          <span className="text-secondary">{'#'}</span> Gallery <span className="text-secondary">{'#'}</span>
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-16 font-mono">
          Photos & videos from my projects
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {visibleImages.map((img, i) => (
            <div key={i} className="group relative rounded-xl overflow-hidden border border-border hover:border-primary/40 transition-colors">
              <img src={img.src} alt={img.alt} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm px-3 py-2">
                  <p className="text-xs text-foreground font-mono">{img.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {images.length > INITIAL_IMAGES && (
          <div className="text-center mb-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 border border-secondary/30 text-secondary font-mono text-sm rounded-lg hover:bg-secondary/10 transition-colors"
            >
              {showAll ? 'Show Less' : `Show More (${images.length - INITIAL_IMAGES}+)`}
              <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}

        {/* YouTube embeds */}
        {videos.length > 0 && (
          <>
            <h3 className="font-mono text-xl font-bold text-foreground mb-6">▶ YouTube Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {videos.map((vid, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-border">
                  <iframe src={vid.url} title={vid.title} className="w-full aspect-video" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
                  <div className="p-3 bg-card">
                    <p className="text-sm font-mono text-foreground">{vid.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Self-hosted videos */}
        {localVideos.length > 0 && (
          <>
            <h3 className="font-mono text-xl font-bold text-foreground mb-6">🎥 Project Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {localVideos.map((vid, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-border">
                  <video controls className="w-full aspect-video" poster={vid.poster} preload="metadata">
                    <source src={vid.src} type="video/mp4" />
                    Your browser does not support video.
                  </video>
                  <div className="p-3 bg-card">
                    <p className="text-sm font-mono text-foreground">{vid.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
