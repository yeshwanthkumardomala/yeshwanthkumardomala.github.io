import { useScrollReveal } from '@/hooks/useScrollReveal';

const timeline = [
  {
    year: 'Present',
    title: 'Robotics Instructor',
    description: 'Teaching robotics, embedded systems, and hands-on building to students. Inspiring the next generation of makers.',
    color: 'primary' as const,
    active: true,
  },
  {
    year: '2021 – Present',
    title: 'Independent Maker & Tinkerer',
    description: '4+ years of hands-on building. Multi-domain experimentation across robotics, IoT, cinemas, and prototyping.',
    color: 'secondary' as const,
    active: true,
  },
  {
    year: '2021',
    title: 'Started the Journey',
    description: 'Began exploring electronics, Arduino, and Raspberry Pi. Built first projects and fell in love with making things work.',
    color: 'accent' as const,
    active: false,
  },
];

const colorMap = {
  primary: { dot: 'bg-primary', line: 'border-primary/30', text: 'text-primary' },
  secondary: { dot: 'bg-secondary', line: 'border-secondary/30', text: 'text-secondary' },
  accent: { dot: 'bg-accent', line: 'border-accent/30', text: 'text-accent' },
};

const ExperienceSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="experience" ref={ref} className="relative z-10 py-24 px-4 section-reveal">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-center mb-16">
          <span className="text-primary">{'~'}</span> Experience <span className="text-primary">{'~'}</span>
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {timeline.map((item, i) => {
              const c = colorMap[item.color];
              return (
                <div key={i} className="relative pl-16">
                  {/* Dot */}
                  <div className={`absolute left-4 top-1 w-4 h-4 rounded-full ${c.dot} ${item.active ? 'animate-pulse' : ''}`} />

                  <div className={`rounded-xl border ${c.line} bg-card/30 backdrop-blur-sm p-6`}>
                    <span className={`font-mono text-sm font-bold ${c.text}`}>{item.year}</span>
                    <h3 className="font-mono text-xl font-bold text-foreground mt-1">{item.title}</h3>
                    <p className="text-muted-foreground mt-2">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
