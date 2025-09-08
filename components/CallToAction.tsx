import React, { useState, useEffect, useRef } from 'react';
import { ArrowRightIcon } from './icons';

const CallToAction: React.FC<{ onConnectClick: () => void }> = ({ onConnectClick }) => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className={`bg-primary text-primary-foreground rounded-lg p-10 md:p-16 text-center transition-all duration-700 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter">
            Готовы увеличить прибыль вашего автосервиса?
          </h2>
          <p className="text-lg text-primary-foreground/80 mt-4 max-w-3xl mx-auto">
            Запустите Motor Mind за 24 часа и начните превращать каждого клиента в постоянного. Без рисков и сложных интеграций.
          </p>
          <div className="mt-8">
            <button
              onClick={onConnectClick}
              className="inline-flex items-center gap-2 justify-center rounded-md text-sm font-bold ring-offset-background transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 border-b-4 border-accent-dark active:border-b-0 active:translate-y-1"
            >
              Оставить заявку
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;