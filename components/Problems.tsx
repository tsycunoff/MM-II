import React, { useState, useEffect, useRef } from 'react';

const ProblemCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  impact: string;
  isVisible: boolean;
  delay: number;
}> = ({ icon, title, description, impact, isVisible, delay }) => (
  <div
    className={`group relative bg-white border border-slate-100 rounded-xl p-6 transition-all duration-700 transform hover:shadow-lg hover:shadow-slate-900/5 hover:-translate-y-1 hover:scale-[1.02] hover:border-slate-200 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    }`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="flex items-start space-x-4">
      <div 
        className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-1 shadow-md"
        style={{ background: 'linear-gradient(135deg, #0D2C54, #1a3a6b)' }}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-[#0D2C54] transition-all duration-500 group-hover:scale-105">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 group-hover:text-slate-600 transition-colors duration-500">
          {description}
        </p>
        <div className="flex items-center gap-2">
          <div 
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: '#FFD100' }}
          />
          <span className="text-xs font-bold text-[#0D2C54] uppercase tracking-wider">
            {impact}
          </span>
        </div>
      </div>
    </div>

    {/* Accent line at bottom */}
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

const Problems: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const [focusedProblem, setFocusedProblem] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const problems = [
    {
      title: 'Невидимые недовольные клиенты',
      description: 'Клиенты молча уходят к конкурентам, не высказав претензий. Вы даже не знаете, что потеряли их навсегда.',
      impact: 'Потеря до 68% клиентов',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      ),
    },
    {
      title: 'Скрытые причины недовольства', 
      description: 'Без обратной связи невозможно улучшить сервис. Одни и те же ошибки повторяются снова и снова.',
      impact: 'Стагнация качества',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      ),
    },
    {
      title: 'Молчаливый отток прибыли',
      description: 'Каждый ушедший клиент — это потерянные 50-150 тысяч рублей в год только с повторных обращений.',
      impact: 'До ₽2.5М потерь в год',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
    },
    {
      title: 'Дорогое привлечение новых клиентов',
      description: 'Привлечь нового клиента в 5-7 раз дороже, чем удержать существующего. А вы теряете их пачками.',
      impact: 'Рост расходов на рекламу',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z"/>
          <path d="M15.7 15.7 4.8 4.8"/>
          <path d="M9.9 9.9a5 5 0 0 0 0 7.07"/>
        </svg>
      ),
    },
  ];

  const solutions = [
    {
      title: "Каждый клиент на виду",
      description: "Перехватываем недовольных до того, как они исчезнут",
    },
    {
      title: "Превращаем молчание в диалог", 
      description: "Собираем честную обратную связь через WhatsApp",
    },
    {
      title: "Останавливаем утечку денег",
      description: "Возвращаем до 50% потерянных клиентов автоматически",
    },
    {
      title: "Умные инвестиции в рост",
      description: "В 5-7 раз дешевле рекламы нового привлечения",
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Slower, more thoughtful rotation
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setFocusedProblem((prev) => (prev + 1) % problems.length);
      }, 4500);
      return () => clearInterval(interval);
    }
  }, [isInView, problems.length]);

  return (
    <section ref={sectionRef} id="problems" className="py-20 md:py-24 bg-background relative overflow-hidden">
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-[#0D2C54] to-[#FFD100] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-gradient-to-tl from-[#FFD100] to-[#0D2C54] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Clean, focused header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0D2C54]">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span className="text-sm font-medium text-[#0D2C54] uppercase tracking-wide">Скрытые проблемы бизнеса</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-primary leading-tight mb-6">
            Большинство автосервисов{' '}
            <span className="relative inline-block">
              <span 
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #0D2C54 0%, #FFD100 100%)' }}
              >
                теряют деньги
              </span>
              <div 
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full opacity-60"
                style={{ background: 'linear-gradient(135deg, #0D2C54 0%, #FFD100 100%)' }}
              />
            </span>
            {' '}даже не зная об этом
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Недовольные клиенты не расскажут вам о проблемах —{' '}
            <span className="text-primary font-semibold">они просто исчезнут</span>
          </p>
        </div>

        {/* Clean problems grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {problems.map((problem, index) => (
            <ProblemCard 
              key={index}
              {...problem}
              isVisible={isInView}
              delay={100 * (index + 1)}
            />
          ))}
        </div>

        {/* Premium solution showcase */}
        <div className="relative">
          <div className="group bg-gradient-to-br from-[#0D2C54] to-[#1a3a6b] rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden transition-all duration-600 ease-out hover:shadow-2xl hover:shadow-slate-900/20 cursor-pointer hover:scale-[1.01]">
            
            {/* Subtle depth enhancement on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0D2C54]/0 to-[#1a3a6b]/0 group-hover:from-[#0D2C54]/30 group-hover:to-[#1a3a6b]/40 transition-all duration-600 ease-out rounded-2xl" />
            
            {/* Enhanced decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5 group-hover:opacity-[0.12] transition-all duration-600 text-[#0D2C54]">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="200" height="200" fill="url(#grid)" className="text-white"/>
              </svg>
            </div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-600 rounded-2xl bg-gradient-to-br from-[#FFD100]/20 via-transparent to-transparent blur-xl" />

            <div className="relative max-w-3xl mx-auto text-center">
              
              {/* Enhanced indicator */}
              <div className="flex justify-center mb-8">
                <div className="flex gap-1">
                  {problems.map((_, index) => (
                    <div
                      key={index}
                      className={`h-0.5 rounded-full transition-all duration-700 ease-out ${
                        index === focusedProblem 
                          ? 'w-12 bg-[#FFD100] group-hover:bg-[#FFD100] group-hover:shadow-lg group-hover:shadow-[#FFD100]/40' 
                          : 'w-2 bg-white/30 group-hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Enhanced dynamic hero content */}
              <div className="transition-all duration-600 ease-out transform group-hover:translate-y-[-2px] group-hover:scale-[1.005]">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tighter text-white mb-6 leading-tight group-hover:text-white transition-colors duration-600">
                  {solutions[focusedProblem].title}
                </h3>
                
                <p className="text-lg md:text-xl text-white/80 group-hover:text-white/95 leading-relaxed mb-8 font-medium transition-colors duration-600">
                  <span 
                    className="font-bold transition-all duration-600 group-hover:text-[#FFD100] group-hover:drop-shadow-sm"
                    style={{ color: '#FFD100' }}
                  >
                    Motor Mind
                  </span>
                  {' '}{solutions[focusedProblem].description}
                </p>

                {/* Enhanced trust indicators with real logos */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <div className="flex items-center gap-3 transition-transform duration-600 group-hover:scale-105">
                    <div className="flex -space-x-1">
                      {/* Real company logos with fallback */}
                      <div className="w-8 h-8 bg-white rounded-full border-2 border-white/20 group-hover:border-white/40 flex items-center justify-center overflow-hidden transition-all duration-600 group-hover:scale-110 group-hover:shadow-lg">
                        <img 
                          src="https://pnevmopodveska1.ru/template/img/logo.svg" 
                          alt="Автосервис"
                          className="max-w-full max-h-full object-contain p-0.5"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling!.className = 'w-full h-full bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold';
                            (target.nextElementSibling as HTMLElement)!.textContent = 'A';
                          }}
                        />
                        <div style={{ display: 'none' }}></div>
                      </div>
                      <div className="w-8 h-8 bg-white rounded-full border-2 border-white/20 group-hover:border-white/40 flex items-center justify-center overflow-hidden transition-all duration-600 group-hover:scale-110 group-hover:shadow-lg">
                        <img 
                          src="https://zfcenter.ru/sites/default/files/logo_1.png" 
                          alt="Автосервис"
                          className="max-w-full max-h-full object-contain p-0.5"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling!.className = 'w-full h-full bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold';
                            (target.nextElementSibling as HTMLElement)!.textContent = 'B';
                          }}
                        />
                        <div style={{ display: 'none' }}></div>
                      </div>
                      <div className="w-8 h-8 bg-white rounded-full border-2 border-white/20 group-hover:border-white/40 flex items-center justify-center overflow-hidden transition-all duration-600 group-hover:scale-110 group-hover:shadow-lg">
                        <img 
                          src="https://fogel.com.ru/images/logo.png" 
                          alt="Автосервис"
                          className="max-w-full max-h-full object-contain p-0.5"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling!.className = 'w-full h-full bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold';
                            (target.nextElementSibling as HTMLElement)!.textContent = 'C';
                          }}
                        />
                        <div style={{ display: 'none' }}></div>
                      </div>
                      <div className="w-8 h-8 bg-white/20 rounded-full border-2 border-white/20 group-hover:border-white/40 flex items-center justify-center transition-all duration-600 group-hover:scale-110 group-hover:shadow-lg">
                        <span className="text-white text-xs font-bold">+</span>
                      </div>
                    </div>
                    <span className="text-white/70 group-hover:text-white/90 text-sm font-medium transition-colors duration-600">
                      150+ автосервисов доверяют
                    </span>
                  </div>
                  
                  <div className="w-px h-6 bg-white/20 group-hover:bg-white/40 hidden sm:block transition-colors duration-600" />
                  
                  <div className="flex items-center gap-2 text-sm text-white/70 group-hover:text-white/90 transition-all duration-600 group-hover:scale-105">
                    <div 
                      className="w-2 h-2 rounded-full animate-pulse group-hover:shadow-md group-hover:shadow-[#FFD100]/50"
                      style={{ backgroundColor: '#FFD100' }}
                    />
                    <span className="font-medium">
                      Автоматически • Незаметно • Эффективно
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problems;