import React, { useState, useEffect, useRef } from 'react';
import { CheckCircleIcon, AlertTriangleIcon, ArrowDownIcon } from './icons';

const Solution: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const solutions = [
    {
      title: 'Собирать 5⭐ отзывы на картах',
      description: 'Автоматически направляем довольных клиентов для публикации отзывов, повышая ваш рейтинг.',
      icon: <CheckCircleIcon className="w-6 h-6 text-green-500" />
    },
    {
      title: 'Выявлять негатив и моментально реагировать',
      description: 'Перехватываем недовольных клиентов до публикации отзыва и передаем вам для решения проблемы.',
      icon: <AlertTriangleIcon className="w-6 h-6 text-amber-500" />
    },
    {
      title: 'Увеличивать лояльность и возвраты',
      description: 'Повышаем доверие клиентов за счет быстрой реакции и качественного сервиса.',
      icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
      )
    }
  ];

  return (
    <section ref={sectionRef} id="solution" className="py-20 md:py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-primary">
            Решение: Превратите обратную связь в инструмент роста!
          </h2>
          <p className="text-lg text-muted-foreground mt-4">
            Motor Mind автоматизирует общение с клиентами и помогает:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className={`bg-card border rounded-lg p-6 text-center transition-all duration-500 transform ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${150 * (index + 1)}ms` }}
            >
              <div className="inline-flex w-12 h-12 rounded-md items-center justify-center bg-muted mb-4">
                {solution.icon}
              </div>
              <h3 className="text-md font-semibold text-card-foreground">{solution.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{solution.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
            <a href="#pricing" className="inline-flex items-center gap-3 justify-center rounded-md text-sm font-bold ring-offset-background transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 border-b-4 border-accent-dark active:border-b-0 active:translate-y-1">
                <ArrowDownIcon className="w-5 h-5" />
                УЗНАТЬ КАК
                <ArrowDownIcon className="w-5 h-5" />
            </a>
        </div>
      </div>
    </section>
  );
};

export default Solution;