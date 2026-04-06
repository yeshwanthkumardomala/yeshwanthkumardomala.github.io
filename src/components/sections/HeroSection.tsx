import { useState, useEffect } from 'react';
import doodleImg from '@/assets/yeshwanth-doodle.webp';
import heroBg from '@/assets/yeshwanth-hero-bg.webp';

const roles = [
  'Robotics Instructor',
  'IoT Builder',
  '3D Printing Innovator',
  'Jack of All Trades',
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < currentRole.length) {
          setText(currentRole.slice(0, text.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section id="hero" className="relative z-10 min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-background/70 dark:bg-background/70" />

      <div className="relative z-[2] max-w-7xl w-full mx-auto flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16 pt-20">
        {/* Left - Text */}
        <div className="flex-1 text-center lg:text-left">
          <p className="font-mono text-sm text-primary mb-2">{'> hello world'}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
            I'm <span className="text-primary text-glow-primary">Yeshwanth</span>
            <br />
            <span className="text-secondary">Kumar</span> Domala
          </h1>
          <div className="h-10 flex items-center justify-center lg:justify-start">
            <span className="font-mono text-lg sm:text-xl text-accent">
              {text}
            </span>
            <span className="typewriter-cursor font-mono text-lg sm:text-xl" />
          </div>
          <p className="mt-6 text-muted-foreground max-w-md mx-auto lg:mx-0">
            Building the future one circuit at a time — from robots to 3D prints, 
            I turn ideas into tangible innovations.
          </p>
          <div className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start">
            <button
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-primary text-primary-foreground font-mono text-sm rounded-lg glow-primary hover:scale-105 transition-transform"
            >
              View Projects
            </button>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 border border-primary text-primary font-mono text-sm rounded-lg hover:bg-primary/10 transition-colors"
            >
              Get in Touch
            </button>
            <a
              href="/resume.pdf"
              download
              className="px-6 py-3 border border-accent text-accent font-mono text-sm rounded-lg hover:bg-accent/10 transition-colors inline-flex items-center gap-2"
            >
              📄 Resume
            </a>
          </div>
        </div>

        {/* Right - Profile Photo */}
        <div className="flex-1 flex justify-center">
          <div className="relative animate-float">
            <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl" />
            <img
              src={doodleImg}
              alt="Yeshwanth Kumar - Robotics, IoT, 3D Printing"
              className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-primary/30 shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[2]">
        <span className="text-xs text-muted-foreground font-mono">scroll</span>
        <div className="w-5 h-8 border-2 border-primary/40 rounded-full flex justify-center pt-1">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
