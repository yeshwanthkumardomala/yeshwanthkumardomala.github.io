import profileImg from '@/assets/yeshwanth-profile.png';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const AboutSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="about" ref={ref} className="relative z-10 py-24 px-4 section-reveal">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-center mb-16">
          <span className="text-primary">{'{'}</span> About Me <span className="text-primary">{'}'}</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-md opacity-40" />
              <img
                src={profileImg}
                alt="Yeshwanth Kumar"
                className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full object-cover border-2 border-primary/30"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="flex-1 space-y-4">
            <p className="text-foreground text-lg leading-relaxed">
              Jack of all trades with hands-on experience in <span className="text-primary font-semibold">robotics</span>, 
              <span className="text-secondary font-semibold"> IoT</span>, and 
              <span className="text-accent font-semibold"> embedded systems</span>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I build practical hardware projects and actively explore fields like 3D printing 
              and animation while expanding into new domains. With 4+ years of hands-on building 
              since 2021, I thrive on multi-domain experimentation — from robots to cinemas, 
              from IoT to prototyping.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              {['Robotics', 'IoT', '3D Printing', 'Embedded Systems', 'Prototyping'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono rounded-full border border-primary/30 text-primary bg-primary/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
