import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ExternalLink } from 'lucide-react';

// ===== EDIT YOUR DRIVE LINKS HERE =====
const driveLinks = [
  {
    label: 'Blogs & Gallery',
    url: 'https://drive.google.com/drive/folders/1JP1KHDTvPjW46v5J1s_m1T1jc93AoUbT?usp=sharing',
    description: 'Browse more project photos, blog posts, and behind-the-scenes content',
  },
  // Add more links: { label: 'Resources', url: 'https://...', description: '...' },
];

const DriveLinksSection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="relative z-10 py-12 px-4 section-reveal">
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
        {driveLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-6 py-4 rounded-xl border border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
          >
            <div>
              <p className="font-mono text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                {link.label}
              </p>
              <p className="text-xs text-muted-foreground">{link.description}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
          </a>
        ))}
      </div>
    </section>
  );
};

export default DriveLinksSection;
