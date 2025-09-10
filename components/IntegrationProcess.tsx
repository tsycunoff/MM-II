import React, { useState, useEffect, useRef } from 'react';

const IntegrationProcess: React.FC<{ onConnectClick: () => void }> = ({ onConnectClick }) => {
  const [isInView, setIsInView] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
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

  useEffect(() => {
    if (isInView) {
      const timer = setInterval(() => {
        setActiveStep(prev => (prev + 1) % 3);
      }, 2500);
      return () => clearInterval(timer);
    }
  }, [isInView]);

  const steps = [
    {
      number: "01",
      title: "Предоставляете доступы",
      description: "Мы получаем доступ к вашей системе для автоматической интеграции",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      number: "02", 
      title: "Сканируете QR-код WhatsApp",
      description: "Простое подключение вашего WhatsApp к нашей платформе",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Готово! Система работает",
      description: "Специалист по внедрению проведет обучение по работе с сервисом и покажет потенциал роста вашего бизнеса",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section ref={sectionRef} id="integration" className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-600 ease-out transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="inline-flex items-center justify-center bg-accent/10 border border-accent/30 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-bold text-primary">ИНТЕГРАЦИЯ ЗА 24 ЧАСА</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter text-primary leading-tight">
            Мы все настроим за вас
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            Забудьте о сложных интеграциях. <span className="font-bold text-primary">Три простых шага</span> — и ваш автосервис начинает автоматически собирать отзывы, системно выявлять проблемы и возвращать клиентов.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-600 ease-out transform ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                } ${activeStep === index ? 'scale-105' : 'hover:scale-102'}`}
                style={{ 
                  transitionDelay: `${200 * (index + 1)}ms`,
                  transform: activeStep === index ? 'scale(1.05)' : undefined
                }}
              >
                {/* Connection line segments for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-8 h-px bg-border -translate-y-1/2" style={{ left: 'calc(100% + 1rem)' }}></div>
                )}

                {/* Mobile connector line */}
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute -bottom-4 left-1/2 w-px h-8 bg-border -translate-x-1/2"></div>
                )}

                <div className={`relative bg-card border rounded-2xl p-7 md:p-9 text-center transition-all duration-600 group hover:shadow-lg mt-6 min-h-[280px] flex flex-col justify-between ${
                  activeStep === index ? 'border-primary/30 shadow-lg' : 'border-border hover:border-primary/20'
                }`}>
                  {/* Step number badge */}
                  <div 
                    className={`absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md transition-all duration-300 ${
                      activeStep === index ? 'scale-110' : ''
                    }`}
                    style={{ backgroundColor: '#0D2C54' }}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div 
                    className={`inline-flex w-14 h-14 rounded-xl items-center justify-center mb-6 transition-all duration-300 ${
                      activeStep === index ? 'animate-pulse' : ''
                    }`}
                    style={{ backgroundColor: '#FFD100' }}
                  >
                    <div style={{ color: '#0D2C54' }}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-lg md:text-xl font-bold text-primary mb-3 group-hover:text-primary/90 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Active glow effect */}
                  {activeStep === index && (
                    <div 
                      className="absolute inset-0 rounded-2xl border-2 animate-pulse"
                      style={{ 
                        borderColor: '#0D2C54',
                        backgroundColor: 'rgba(13, 44, 84, 0.05)'
                      }}
                    ></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className={`text-center mt-12 max-w-3xl mx-auto transition-all duration-600 ease-out transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`} style={{ transitionDelay: '1000ms' }}>
          <div className="bg-secondary/50 rounded-xl p-6 md:p-7 border border-border/30">
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-3">
              Поддержка на каждом этапе
            </h3>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
              Наша команда обеспечивает полное сопровождение: от первоначальной настройки до обучения вашего персонала. Вы получаете не просто инструмент, а готовое решение.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24ч</div>
                <div className="text-sm text-muted-foreground">Время интеграции</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15мин</div>
                <div className="text-sm text-muted-foreground">Обучение персонала</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Техподдержка</div>
              </div>
            </div>
            
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center rounded-md text-sm font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 h-10 px-6 group border-b-4 border-accent-dark active:border-b-0 active:translate-y-1"
            >
              <span>Смотреть тарифы</span>
              <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationProcess;