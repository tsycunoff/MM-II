import React, { useState, useEffect, useRef } from 'react';

const SolutionCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  isVisible: boolean;
  delay: number;
}> = ({ icon, title, description, isVisible, delay }) => (
  <div
    className={`group relative bg-white border border-slate-100 rounded-lg p-6 text-center transition-all duration-600 transform hover:shadow-lg hover:shadow-slate-900/5 hover:-translate-y-1 hover:border-slate-200 hover:scale-[1.02] ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    }`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div 
      className="inline-flex w-12 h-12 rounded-md items-center justify-center mb-4 text-white transition-all duration-600 group-hover:scale-110 group-hover:shadow-md"
      style={{ backgroundColor: '#0D2C54' }}
    >
      {icon}
    </div>
    <h3 className="text-md font-semibold text-foreground mb-3 group-hover:text-[#0D2C54] transition-colors duration-600">
      {title}
    </h3>
    <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-slate-600 transition-colors duration-600">
      {description}
    </p>
    
    {/* Subtle accent line */}
    <div 
      className="absolute bottom-0 left-1/2 w-0 h-0.5 -translate-x-1/2 group-hover:w-12 transition-all duration-600 rounded-full"
      style={{ backgroundColor: '#FFD100' }}
    />
  </div>
);

const Solution: React.FC<{ onConnectClick: () => void }> = ({ onConnectClick }) => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const solutions = [
    {
      title: 'Собирать 5⭐ отзывы на картах',
      description: 'Автоматически направляем довольных клиентов для публикации отзывов, повышая ваш рейтинг.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12,2 15.09,8.26 22,9 17,14.74 18.18,21.02 12,17.77 5.82,21.02 7,14.74 2,9 8.91,8.26"/>
        </svg>
      )
    },
    {
      title: 'Выявлять негатив и моментально реагировать',
      description: 'Перехватываем недовольных клиентов до публикации отзыва и передаем вам для решения проблемы.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      )
    },
    {
      title: 'Увеличивать лояльность и возвраты',
      description: 'Повышаем доверие клиентов за счет быстрой реакции и качественного сервиса.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="8.5" cy="7" r="4"/>
          <line x1="20" y1="8" x2="20" y2="14"/>
          <line x1="23" y1="11" x2="17" y2="11"/>
        </svg>
      )
    }
  ];

  return (
    <section ref={sectionRef} id="solution" className="py-20 md:py-24 bg-secondary">
      <div className="container mx-auto px-6">
        
        {/* Clean header without unnecessary icon */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-medium text-[#0D2C54] uppercase tracking-wide">Наше решение</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-primary leading-tight mb-6">
            <span className="relative inline-block">
              <span 
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #0D2C54 0%, #FFD100 100%)' }}
              >
                Превращаем проблемы
              </span>
              <div 
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full opacity-60"
                style={{ background: 'linear-gradient(135deg, #0D2C54 0%, #FFD100 100%)' }}
              />
            </span>
            {' '}в возможности для роста
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            <span className="text-primary font-semibold">Motor Mind</span> автоматизирует общение с клиентами и помогает:
          </p>
        </div>

        {/* Solution cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {solutions.map((solution, index) => (
            <SolutionCard 
              key={index}
              {...solution}
              isVisible={isInView}
              delay={100 * (index + 1)}
            />
          ))}
        </div>

        {/* Wide premium CTA section */}
        <div className="relative max-w-5xl mx-auto">
          <div className="group bg-gradient-to-br from-[#0D2C54] to-[#1a3a6b] rounded-xl p-8 md:p-12 text-center shadow-lg overflow-hidden transition-all duration-600 ease-out hover:shadow-xl hover:shadow-slate-900/20">
            
            {/* Subtle depth enhancement on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0D2C54]/0 to-[#1a3a6b]/0 group-hover:from-[#0D2C54]/30 group-hover:to-[#1a3a6b]/40 transition-all duration-600 ease-out rounded-xl" />

            <div className="relative max-w-3xl mx-auto">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tighter text-white mb-4 group-hover:text-white transition-colors duration-600">
                Готовы увеличить прибыль автосервиса?
              </h3>
              
              <p className="text-white/80 group-hover:text-white/90 mb-8 leading-relaxed transition-colors duration-600">
                Запустите Motor Mind за 24 часа и начните превращать каждого клиента в постоянного. Без рисков и сложных интеграций.
              </p>

              <button 
                onClick={onConnectClick}
                className="group/btn inline-flex items-center gap-2 justify-center rounded-md text-sm font-bold h-12 px-8 transition-all duration-600 hover:scale-105 hover:shadow-lg"
                style={{ 
                  backgroundColor: '#FFD100',
                  color: '#0D2C54',
                  boxShadow: '0 4px 0 #E6B800'
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translateY(2px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 2px 0 #E6B800';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 0 #E6B800';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 0 #E6B800';
                }}
              >
                Оставить заявку
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-0.5 transition-transform duration-300">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;