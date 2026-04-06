import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ChevronDown } from 'lucide-react';

const posts: Array<{
  title: string;
  date: string;
  summary: string;
  tags: string[];
  link?: string;
}> = [
  {
    title: 'Building a UGV Robot from Scratch',
    date: '2026-03-15',
    summary: 'Documented my journey designing and assembling an unmanned ground vehicle with custom chassis, motor drivers, and remote control via ESP32.',
    tags: ['Robotics', 'ESP32', 'Hardware'],
    link: 'https://github.com/yeshwanthkumardomala',
  },
  {
    title: 'Getting Started with 3D Printing',
    date: '2026-02-20',
    summary: 'My first experiences with FDM printing — calibration tips, filament choices, and lessons learned from failed prints.',
    tags: ['3D Printing', 'Prototyping'],
  },
  {
    title: 'IoT Smart Home Experiment',
    date: '2026-01-10',
    summary: 'Built a basic smart-home setup using NodeMCU, relays, and a simple web dashboard to control lights and fans remotely.',
    tags: ['IoT', 'NodeMCU', 'Web'],
    link: 'https://github.com/yeshwanthkumardomala',
  },
  // Add more posts:
  // { title: '...', date: 'YYYY-MM-DD', summary: '...', tags: ['...'], link: '...' },
];

const INITIAL_COUNT = 3;

const BlogSection = () => {
  const ref = useScrollReveal();
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? posts : posts.slice(0, INITIAL_COUNT);

  return (
    <section id="blog" ref={ref} className="relative z-10 py-24 px-4 section-reveal">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-center mb-4">
          <span className="text-accent">{'>'}</span> Blog & Updates
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-16 font-mono">
          Project logs, learnings & experiments
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((post, i) => (
            <article
              key={i}
              className="group bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 flex flex-col"
            >
              <time className="text-xs font-mono text-muted-foreground mb-2">{post.date}</time>
              <h3 className="font-mono text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {post.summary}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-accent/30 text-accent/80">
                    {tag}
                  </span>
                ))}
              </div>
              {post.link && (
                <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-primary hover:text-primary/80 transition-colors self-start">
                  Read More →
                </a>
              )}
            </article>
          ))}

          <div className="border border-dashed border-muted-foreground/20 rounded-xl p-6 flex flex-col items-center justify-center min-h-[200px] hover:border-accent/30 transition-colors">
            <p className="text-2xl mb-2">✍️</p>
            <p className="text-xs text-muted-foreground font-mono text-center">
              Add new posts in<br />
              <code className="text-accent">BlogSection.tsx</code>
            </p>
          </div>
        </div>

        {posts.length > INITIAL_COUNT && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 border border-accent/30 text-accent font-mono text-sm rounded-lg hover:bg-accent/10 transition-colors"
            >
              {showAll ? 'Show Less' : `Show More (${posts.length - INITIAL_COUNT}+)`}
              <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
