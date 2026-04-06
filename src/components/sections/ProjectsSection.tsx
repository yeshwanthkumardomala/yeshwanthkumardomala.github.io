import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ExternalLink, Github, ChevronDown, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import ugvImg from '@/assets/ugv-project.webp';
import dlyrImg from '@/assets/3dlyr-logo.webp';

export const projects = [
  {
    id: 'ugv-robot',
    title: 'UGV Robot',
    subtitle: 'Unmanned Ground Vehicle',
    description: 'Semi-autonomous 4WD robot using Raspberry Pi + Arduino with obstacle avoidance, sensor integration, camera monitoring, web-based control and joystick operation.',
    fullDescription: 'A comprehensive UGV project featuring 4-wheel drive, real-time camera feed, obstacle avoidance sensors, PWM motor control via L298N driver, and a web-based control dashboard. Built with Raspberry Pi for processing and Arduino for low-level motor control.',
    tags: ['Raspberry Pi', 'Arduino', 'Python', 'Sensors', 'PWM'],
    color: 'primary' as const,
    status: 'Completed',
    image: ugvImg,
    video: '',
    link: '',
  },
  {
    id: '3dlyr',
    title: '3Dlyr',
    subtitle: '3D Printing Platform',
    description: 'Student-focused 3D printing and prototyping initiative. Conducts workshops and hands-on learning with focus on practical project-based education.',
    fullDescription: 'An initiative aimed at bringing 3D printing education to students through workshops, hands-on sessions, and project-based learning. Covers FDM printing, CAD modeling, and rapid prototyping techniques.',
    tags: ['3D Printing', 'Prototyping', 'Education'],
    color: 'secondary' as const,
    status: 'Active',
    image: dlyrImg,
    video: '',
    link: '',
  },
  {
    id: 'face-attendance',
    title: 'Face Attendance',
    subtitle: 'Facial Recognition Attendance System',
    description: 'System for school student attendance monitoring using camera-based facial recognition. Aims for automated, real-time attendance tracking.',
    fullDescription: 'An automated attendance system using OpenCV and face_recognition library. Captures student faces via camera, matches against a database, and logs attendance in real-time. Designed for classroom deployment.',
    tags: ['Python', 'OpenCV', 'AI/ML', 'Camera'],
    color: 'accent' as const,
    status: 'Ongoing',
    image: '',
    video: '/videos/Facial_Recog1.mp4',
    link: '',
  },
  {
    id: 'yims',
    title: 'YIMS',
    subtitle: 'Your Inventory Management System',
    description: 'Simple inventory management solution focused on tracking, managing, and organizing resources. Designed for small-scale and student use cases.',
    fullDescription: 'A Python-based inventory management tool with CRUD operations, search functionality, and data export. Designed for small workshops and student labs to track components and materials.',
    tags: ['Python', 'Database', 'Management'],
    color: 'primary' as const,
    status: 'Ongoing',
    image: '',
    video: '',
    link: '',
  },
];

const colorStyles = {
  primary: { border: 'border-primary/20', glow: 'hover:border-primary/50', tag: 'bg-primary/10 text-primary', status: 'text-primary' },
  secondary: { border: 'border-secondary/20', glow: 'hover:border-secondary/50', tag: 'bg-secondary/10 text-secondary', status: 'text-secondary' },
  accent: { border: 'border-accent/20', glow: 'hover:border-accent/50', tag: 'bg-accent/10 text-accent', status: 'text-accent' },
};

const INITIAL_COUNT = 3;

const ProjectsSection = () => {
  const ref = useScrollReveal();
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT);

  return (
    <section id="projects" ref={ref} className="relative z-10 py-24 px-4 section-reveal">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-center mb-16">
          <span className="text-accent">{'['}</span> Projects <span className="text-accent">{']'}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((project) => {
            const cs = colorStyles[project.color];
            return (
              <div
                key={project.id}
                className={`group rounded-xl border ${cs.border} ${cs.glow} bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:translate-y-[-4px] flex flex-col`}
              >
                {project.video && project.video.endsWith('.mp4') ? (
                  <video controls preload="metadata" className="w-full h-40 object-cover rounded-lg mb-4">
                    <source src={project.video} type="video/mp4" />
                  </video>
                ) : project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                ) : project.id === 'yims' ? (
                  <div className="w-full h-40 rounded-lg mb-4 bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="text-4xl font-bold font-mono text-primary tracking-widest">YIMS</span>
                  </div>
                ) : (
                  <div className="w-full h-40 rounded-lg mb-4 border border-dashed border-muted-foreground/20 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground font-mono">📷 Add image</span>
                  </div>
                )}

                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-mono text-lg font-bold text-foreground">{project.title}</h3>
                  <span className={`text-xs font-mono ${cs.status}`}>{project.status}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2 font-mono">{project.subtitle}</p>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{project.description}</p>

                {project.video && (
                  <a href={project.video} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mb-3 font-mono inline-flex items-center gap-1">
                    <Play className="w-3 h-3" /> Watch Video <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className={`px-2 py-0.5 text-xs font-mono rounded-full ${cs.tag}`}>{tag}</span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <Link to={`/project/${project.id}`} className="text-xs font-mono text-primary hover:text-primary/80 transition-colors">
                    View Details →
                  </Link>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono">
                      <Github className="w-3 h-3" /> GitHub
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {projects.length > INITIAL_COUNT && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary/30 text-primary font-mono text-sm rounded-lg hover:bg-primary/10 transition-colors"
            >
              {showAll ? 'Show Less' : `Show More (${projects.length - INITIAL_COUNT}+)`}
              <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
