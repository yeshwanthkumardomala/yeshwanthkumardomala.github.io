import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Github, Linkedin, Instagram, Mail, Phone } from 'lucide-react';

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/yeshwanthkumardomala', color: 'hover:text-foreground' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/yeshwanth-kumar-d-2367b61b8/', color: 'hover:text-primary' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/yesh_fricky__', color: 'hover:text-accent' },
  { icon: Mail, label: 'Email', href: 'mailto:domalayeshwanthkumar@gmail.com', color: 'hover:text-secondary' },
];

const ContactSection = () => {
  const ref = useScrollReveal();
  const [showPhone, setShowPhone] = useState(false);

  return (
    <section id="contact" ref={ref} className="relative z-10 py-24 px-4 section-reveal">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-mono text-3xl sm:text-4xl font-bold mb-4">
          <span className="text-primary">{'>'}</span> Let's Connect <span className="text-primary">{'<'}</span>
        </h2>
        <p className="text-muted-foreground mb-12">
          Got a project idea, collaboration opportunity, or just want to chat about robots? Reach out!
        </p>

        {/* Social links */}
        <div className="flex justify-center gap-6 mb-12">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col items-center gap-2 text-muted-foreground ${s.color} transition-colors`}
            >
              <div className="w-14 h-14 rounded-xl border border-border bg-card/50 flex items-center justify-center group-hover:border-primary/50 group-hover:scale-110 transition-all">
                <s.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono">{s.label}</span>
            </a>
          ))}

          {/* Phone - hidden */}
          <button
            onClick={() => setShowPhone(!showPhone)}
            className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
          >
            <div className="w-14 h-14 rounded-xl border border-border bg-card/50 flex items-center justify-center group-hover:border-accent/50 group-hover:scale-110 transition-all">
              <Phone className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono">Phone</span>
          </button>
        </div>

        {/* Phone reveal */}
        {showPhone && (
          <div className="inline-block px-6 py-3 rounded-xl border border-accent/30 bg-accent/5 mb-8 animate-in fade-in duration-300">
            <p className="font-mono text-accent text-lg">+91 7330718775</p>
          </div>
        )}

        {/* Email CTA */}
        <a
          href="mailto:domalayeshwanthkumar@gmail.com"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono rounded-xl glow-primary hover:scale-105 transition-transform"
        >
          <Mail className="w-5 h-5" />
          domalayeshwanthkumar@gmail.com
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
