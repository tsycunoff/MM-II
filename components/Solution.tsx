import React, { useState, useEffect, useRef } from 'react';

const SolutionCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  isVisible: boolean;
  delay: number;
}> = ({ icon, title, description, isVisible, delay }) => (
  <div
    className={`group relative bg-white border border-slate-100 rounded-xl p-6 text-center transition-all duration-700 transform hover:shadow-lg hover:shadow-slate-900/5 hover:-translate-y-1 hover:border-slate-200 hover:scale-[1.02] ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    }`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div 
      className="inline-flex w-12 h-12 rounded-lg items-center justify-center mb-4 text-white transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 shadow-md"
      style={{ background: 'linear-gradient(135deg, #0D2C54, #1a3a6b)' }}
    >
      {icon}
    </div>
    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-[#0D2C54] transition-all duration-700 group-hover:scale-105">
      {title}
    </h3>
    <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-slate-600 transition-colors duration-700">
      {description}
    </p>
    
    {/* Yellow accent line at bottom */}
    <div 
      className="absolute bottom-0 left-1/2 w-0 h-0.5 -translate-x-1/2 group-hover:w-16 transition-all duration-700 rounded-full"
      style={{ backgroundColor: '#FFD100' }}
    />

    {/* Hover glow effect */}
    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
      <div 
        className="absolute inset-0 rounded-xl blur-xl transform scale-110"
        style={{ background: 'radial-gradient(circle at 30% 30%, rgba(13, 44, 84, 0.08), transparent 70%)' }}
      />
    </div>
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
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12,2 15.09,8.26 22,9 17,14.74 18.18,21.02 12,17.77 5.82,21.02 7,14.74 2,9 8.91,8.26"/>
        </svg>
      )
    },
    {
      title: 'Выявлять негатив и моментально реагировать',
      description: 'Перехватываем недовольных клиентов до публикации отзыва и передаем вам для решения проблемы.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      )
    },
    {
      title: 'Увеличивать лояльность и возвраты',
      description: 'Повышаем доверие клиентов за счет быстрой реакции и качественного сервиса.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        </svg>
      )
    }
  ];

  return (
    <section ref={sectionRef} id="solution" className="py-20 md:py-24 bg-secondary relative overflow-hidden">
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-[#0D2C54] to-[#FFD100] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-tl from-[#FFD100] to-[#0D2C54] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Enhanced header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#0D2C54] animate-pulse"></div>
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

        {/* Enhanced solution cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {solutions.map((solution, index) => (
            <SolutionCard 
              key={index}
              {...solution}
              isVisible={isInView}
              delay={100 * (index + 1)}
            />
          ))}
        </div>

        {/* Enhanced premium CTA section */}
        <div className="relative max-w-5xl mx-auto">
          <div className="group bg-gradient-to-br from-[#0D2C54] to-[#1a3a6b] rounded-2xl p-8 md:p-12 text-center shadow-xl overflow-hidden transition-all duration-600 ease-out hover:shadow-2xl hover:shadow-slate-900/20 hover:scale-[1.01]">
            
            {/* Enhanced depth effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0D2C54]/0 to-[#1a3a6b]/0 group-hover:from-[#0D2C54]/30 group-hover:to-[#1a3a6b]/40 transition-all duration-600 ease-out rounded-2xl" />

            {/* Decorative grid pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5 group-hover:opacity-[0.12] transition-all duration-600 text-[#0D2C54]">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <pattern id="solution-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="200" height="200" fill="url(#solution-grid)" className="text-white"/>
              </svg>
            </div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-600 rounded-2xl bg-gradient-to-br from-[#FFD100]/20 via-transparent to-transparent blur-xl" />

            <div className="relative max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tighter text-white mb-4 group-hover:text-white transition-colors duration-600 leading-tight">
                Готовы увеличить прибыль автосервиса?
              </h3>
              
              <p className="text-lg text-white/80 group-hover:text-white/95 mb-8 leading-relaxed transition-colors duration-600 font-medium">
                Запустите <span className="font-bold" style={{ color: '#FFD100' }}>Motor Mind</span> за 24 часа и начните превращать каждого клиента в постоянного. Без рисков и сложных интеграций.
              </p>

              {/* Enhanced trust indicators */}
              <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FFD100] animate-pulse"></div>
                  <span>Запуск за 24 часа</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FFD100] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <span>Без долгосрочных договоров</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FFD100] animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <span>Поддержка 24/7</span>
                </div>
              </div>

              <button 
                onClick={onConnectClick}
                className="inline-flex items-center gap-3 justify-center rounded-lg text-base font-bold h-12 px-8 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg group/btn"
                style={{ 
                  backgroundColor: '#FFD100',
                  color: '#0D2C54'
                }}
              >
                Оставить заявку
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform duration-300">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </button>

              <p className="text-xs text-white/60 mt-4">
                Персональная демонстрация за 15 минут
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;