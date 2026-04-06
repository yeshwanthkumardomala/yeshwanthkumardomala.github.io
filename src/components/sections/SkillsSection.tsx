import { useScrollReveal } from '@/hooks/useScrollReveal';

const skillCategories = [
  {
    title: 'Robotics & Hardware',
    color: 'primary',
    skills: [
      'Arduino',
      'Raspberry Pi',
      'Dynamixel servo motors',
      'SLAM navigation',
      'Computer vision (OpenCV)',
      'IoT systems & sensors',
      'Sensor fusion',
      'CNC control systems',
    ],
  },
  {
    title: 'Software & Programming',
    color: 'secondary',
    skills: [
      'Python & C/C++',
      'TensorFlow Lite & ML',
      'ROS',
      'Git & GitHub',
      'Linux & embedded systems',
      'Arduino IDE & PlatformIO',
      'Real-time data processing',
      'Microcontroller programming',
    ],
  },
  {
    title: 'Teaching & Mentoring',
    color: 'accent',
    skills: [
      'WRO competition coaching',
      'Robotics curriculum design',
      '350+ students mentored',
      'Workshop facilitation',
      'Game-based learning',
      'Project-based education',
      'STEM curriculum development',
      'Educational content creation',
    ],
  },
];

const colorMap: Record<string, { bar: string; bg: string; text: string; border: string; dot: string }> = {
  primary: { bar: 'bg-primary', bg: 'bg-primary/5', text: 'text-primary', border: 'border-primary/20', dot: 'bg-primary' },
  secondary: { bar: 'bg-secondary', bg: 'bg-secondary/5', text: 'text-secondary', border: 'border-secondary/20', dot: 'bg-secondary' },
  accent: { bar: 'bg-accent', bg: 'bg-accent/5', text: 'text-accent', border: 'border-accent/20', dot: 'bg-accent' },
};

const SkillsSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="skills" ref={ref} className="relative z-10 py-24 px-4 section-reveal">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-center mb-4">
          <span className="text-secondary">{'<'}</span> Expertise <span className="text-secondary">{'/>'}</span>
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-16 font-mono">
          Core skills & technologies I work with
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((cat) => {
            const c = colorMap[cat.color];
            return (
              <div
                key={cat.title}
                className={`rounded-xl border ${c.border} ${c.bg} backdrop-blur-sm p-6 flex flex-col`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-1 h-8 rounded-full ${c.bar}`} />
                  <h3 className={`font-mono text-lg font-bold ${c.text}`}>{cat.title}</h3>
                </div>
                <ul className="space-y-3 flex-1">
                  {cat.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-3">
                      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} flex-shrink-0`} />
                      <span className="text-sm text-foreground">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
