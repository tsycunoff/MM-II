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
          // Start step animation
          const timer = setInterval(() => {
            setActiveStep(prev => (prev + 1) % 3);
          }, 2500);
          observer.disconnect();
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: "01",
      title: "Предоставляете API токен",
      description: "Мы получаем доступ к вашей системе для автоматической интеграции",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3.586l4.293-4.293A6 6 0 0119 9z" />
        </svg>
      ),
      color: "from-blue-500 to-blue-600"
    },
    {
      number: "02", 
      title: "Сканируете QR-код WhatsApp",
      description: "Простое подключение вашего WhatsApp к нашей платформе",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      ),
      color: "from-green-500 to-green-600"
    },
    {
      number: "03",
      title: "Готово! Система работает",
      description: "Менеджер покажет потенциал роста вашего бизнеса",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "from-emerald-500 to-emerald-600"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-24 bg-gradient-to-br from-background via-accent-50/30 to-primary-50/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">Интеграция за 24 часа</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary mb-6">
            Мы все настроим за вас
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Забудьте о сложных интеграциях. <span className="font-semibold text-primary">Три простых шага</span> - и ваш автосервис начинает автоматически собирать отзывы и возвращать клиентов.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 transform ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${activeStep === index ? 'scale-105' : ''}`}
                style={{ transitionDelay: `${200 * (index + 1)}ms` }}
              >
                {/* Step connector for mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute -bottom-4 left-1/2 w-px h-8 bg-gradient-to-b from-primary/30 to-transparent -translate-x-1/2"></div>
                )}

                <div className={`relative bg-white/80 backdrop-blur-sm border-2 rounded-2xl p-8 text-center transition-all duration-500 hover:shadow-xl group ${
                  activeStep === index ? 'border-accent shadow-glow scale-105' : 'border-primary/10 hover:border-primary/20'
                }`}>
                  {/* Step number badge */}
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg transition-all duration-300 bg-gradient-to-r ${step.color} ${
                    activeStep === index ? 'animate-pulse scale-110' : ''
                  }`}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-6 transition-all duration-300 bg-gradient-to-r ${step.color} ${
                    activeStep === index ? 'animate-bounce-gentle' : ''
                  }`}>
                    <div className="text-white">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-primary-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Active indicator */}
                  {activeStep === index && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-accent animate-pulse bg-accent/5"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-16 transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '1000ms' }}>
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Готовы начать зарабатывать больше?
              </h3>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Наш менеджер покажет, сколько дополнительной прибыли вы сможете получить с Motor Mind уже в первый месяц.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={onConnectClick}
                  className="group inline-flex items-center justify-center rounded-xl text-base font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-accent text-accent-foreground hover:shadow-glow h-12 px-8 border-b-4 border-accent-dark active:border-b-0 active:translate-y-1 shadow-lg"
                >
                  <span>Запустить за 24 часа</span>
                  <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                
                <span className="text-white/60 text-sm">
                  ⚡ Быстрее, чем заварить кофе
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationProcess;