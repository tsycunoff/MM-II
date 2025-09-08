
import React, { useState, useEffect, useRef } from 'react';

const ProblemCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  isVisible: boolean;
  delay: number;
}> = ({ icon, title, description, isVisible, delay }) => (
  <div
    className={`bg-card border rounded-lg p-6 transition-all duration-500 transform ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center bg-muted text-muted-foreground">
        {icon}
      </div>
      <div>
        <h3 className="text-md font-semibold text-card-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  </div>
);

const Problems: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const problems = [
    {
      title: 'Не знаете кто из клиентов недоволен',
      description: 'Негатив остается невысказанным и приводит к потере клиента.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      ),
    },
    {
      title: 'Не знаете почему он недоволен',
      description: 'Отсутствие обратной связи мешает улучшать качество сервиса.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
      ),
    },
    {
      title: 'Не знаете кто не вернется снова',
      description: 'Молчаливый уход клиентов напрямую влияет на вашу прибыль.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>
      ),
    },
     {
      title: 'Не знаете как вернуть их наверняка',
      description: 'Без системного подхода возвращать ушедших клиентов дорого и неэффективно.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
      ),
    },
  ];

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="problems" className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-primary">
            Большинство автосервисов теряют деньги, даже не зная об этом.
          </h2>
          <p className="text-lg text-muted-foreground mt-4">
            Недовольные клиенты не расскажут вам напрямую о своем недовольстве — они просто не вернутся в следующий раз.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <ProblemCard 
              key={index}
              {...problem}
              isVisible={isInView}
              delay={150 * (index + 1)}
            />
          ))}
        </div>
        
        <div className="text-center max-w-3xl mx-auto mt-16">
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tighter text-primary">Мы делаем все это за вас!</h3>
            <p className="text-lg text-muted-foreground mt-3">
                Автоматически. Незаметно. Эффективно.
            </p>
        </div>
      </div>
    </section>
  );
};

export default Problems;
