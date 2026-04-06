import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Link } from 'react-router-dom';

export const testimonials = [
  {
    id: 'testimonial-1',
    quote: 'Yeshwanth has an incredible ability to turn ideas into working prototypes. His robotics workshops are engaging and hands-on.',
    name: 'Workshop Participant',
    role: 'Robotics Student',
    fullQuote: 'Yeshwanth has an incredible ability to turn ideas into working prototypes. His robotics workshops are engaging and hands-on. The way he breaks down complex concepts into simple, understandable steps is remarkable. I learned more in his workshop than in months of self-study.',
  },
  {
    id: 'testimonial-2',
    quote: 'A true jack of all trades — from 3D printing custom parts to programming microcontrollers, he always delivers creative solutions.',
    name: 'Project Collaborator',
    role: 'IoT Developer',
    fullQuote: 'A true jack of all trades — from 3D printing custom parts to programming microcontrollers, he always delivers creative solutions. Working with Yeshwanth on our IoT project was a great experience. His problem-solving approach and willingness to experiment with new technologies made the project a success.',
  },
  {
    id: 'testimonial-3',
    quote: 'His 3D printing workshops opened up a whole new world of prototyping for our students. Practical, fun, and deeply educational.',
    name: 'College Faculty',
    role: 'Engineering Department',
    fullQuote: 'His 3D printing workshops opened up a whole new world of prototyping for our students. Practical, fun, and deeply educational. The students were able to design and print their own parts within a single session, which was truly impressive.',
  },
];

const TestimonialsSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="testimonials" ref={ref} className="relative z-10 py-24 px-4 section-reveal">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-center mb-4">
          <span className="text-secondary">{'{'}</span> Testimonials <span className="text-secondary">{'}'}</span>
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-16 font-mono">
          What people say about working with me
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="relative bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-secondary/40 transition-all duration-500 group"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <span className="text-4xl text-secondary/30 font-serif leading-none">"</span>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2 mb-4">
                  {t.quote}
                </p>
                <Link to={`/testimonial/${t.id}`} className="text-xs font-mono text-secondary hover:text-secondary/80 transition-colors mb-4 inline-block">
                  Read Full →
                </Link>
                <div className="flex items-center gap-3 mt-2">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <span className="text-secondary font-mono text-sm font-bold">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-mono font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
