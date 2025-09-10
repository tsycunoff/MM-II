import React, { useState, useEffect, useRef } from 'react';
import { WhatsAppIcon, StarIcon, MessageSquareIcon } from './icons';

const StepCard: React.FC<{
  step: {
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    detail: string;
  };
  index: number;
  isActive: boolean;
  isVisible: boolean;
  onClick: () => void;
}> = ({ step, index, isActive, isVisible, onClick }) => {
  return (
    <div
      className={`relative cursor-pointer transition-all duration-700 ease-out will-change-transform group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${isActive ? 'scale-[1.02] z-10' : 'hover:scale-[1.01]'}`}
      style={{ transitionDelay: `${100 * (index + 1)}ms` }}
      onClick={onClick}
    >
      {/* Improved connection line with animation */}
      {index < 2 && (
        <div className="hidden lg:block absolute top-1/2 left-full w-full h-px -translate-y-1/2 z-0">
          <div 
            className={`h-full transition-all duration-1000 ease-out ${
              isActive ? 'w-full opacity-100' : 'w-0 opacity-60'
            }`}
            style={{ 
              background: isActive 
                ? 'linear-gradient(to right, #0D2C54 0%, #FFD100 50%, transparent 100%)' 
                : '#e2e8f0'
            }}
          />
        </div>
      )}

      <div className={`relative bg-white rounded-xl p-6 md:p-8 border transition-all duration-700 ease-out will-change-transform ${
        isActive 
          ? 'border-[#0D2C54] shadow-xl shadow-[#0D2C54]/10' 
          : 'border-slate-200 hover:border-slate-300 shadow-md hover:shadow-lg'
      }`}>
        
        {/* Enhanced step number */}
        <div 
          className={`absolute -top-3 -left-3 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold transition-all duration-700 ${
            isActive ? 'scale-110 shadow-lg' : ''
          }`}
          style={{ 
            backgroundColor: isActive ? '#0D2C54' : '#64748b',
            boxShadow: isActive ? '0 4px 12px rgba(13, 44, 84, 0.3)' : undefined
          }}
        >
          {index + 1}
        </div>

        <div className="relative">
          <div 
            className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-700 shadow-md ${
              isActive ? 'scale-105 shadow-lg' : 'group-hover:scale-105'
            }`}
            style={{ 
              background: isActive 
                ? 'linear-gradient(135deg, #0D2C54, #1a3a6b)' 
                : '#f8fafc'
            }}
          >
            <step.icon className={`w-6 h-6 transition-colors duration-700 ${
              isActive ? 'text-white' : 'text-[#0D2C54]'
            }`} />
          </div>
          
          <h3 className={`text-lg font-bold mb-3 transition-all duration-700 ${
            isActive ? 'text-[#0D2C54] scale-105' : 'text-slate-800 group-hover:text-[#0D2C54]'
          }`}>
            {step.title}
          </h3>
          
          <p className={`text-sm text-muted-foreground leading-relaxed mb-3 transition-colors duration-700 ${
            isActive ? 'text-slate-600' : 'group-hover:text-slate-600'
          }`}>
            {step.description}
          </p>

          {/* Enhanced expanding detail */}
          <div 
            className={`transition-all duration-700 ease-out overflow-hidden ${
              isActive ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="border-t border-slate-200 pt-3 mt-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                {step.detail}
              </p>
            </div>
          </div>
        </div>

        {/* Yellow accent line at bottom (like in Problems) */}
        <div 
          className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 transition-all duration-700 rounded-full ${
            isActive ? 'w-16 opacity-100' : 'w-0 opacity-0 group-hover:w-12 group-hover:opacity-60'
          }`}
          style={{ backgroundColor: '#FFD100' }}
        />

        {/* Hover glow effect */}
        <div className={`absolute inset-0 rounded-xl transition-opacity duration-700 pointer-events-none ${
          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}>
          <div 
            className="absolute inset-0 rounded-xl blur-xl transform scale-110"
            style={{ background: 'radial-gradient(circle at 30% 30%, rgba(13, 44, 84, 0.08), transparent 70%)' }}
          />
        </div>
      </div>
    </div>
  );
};

const HowItWorks: React.FC<{ onConnectClick: () => void }> = ({ onConnectClick }) => {
  const [isInView, setIsInView] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const steps = [
    {
      icon: WhatsAppIcon,
      title: 'Автоматический запрос',
      description: 'После обслуживания клиент получает сообщение с просьбой оценить визит.',
      detail: 'Система отправляет персонализированное сообщение через 2-4 часа после завершения работ. Никакого спама - только вежливая просьба об обратной связи.'
    },
    {
      icon: StarIcon,
      title: 'Простая оценка',
      description: 'Клиент ставит оценку от 1 до 5 звезд одним тапом.',
      detail: 'Максимально простой интерфейс - достаточно нажать на нужное количество звезд. Весь процесс занимает не более 10 секунд.'
    },
    {
      icon: MessageSquareIcon,
      title: 'Умная маршрутизация',
      description: '5★ направляются на карты, 1-4★ попадают к менеджеру для решения проблем.',
      detail: 'Довольные клиенты автоматически получают ссылку на публикацию отзыва. Недовольные попадают в чат для быстрого решения проблемы.'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveStep(prev => (prev + 1) % steps.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isInView, steps.length]);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-20 md:py-24 bg-secondary relative overflow-hidden">
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-[#0D2C54] to-[#FFD100] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-tl from-[#FFD100] to-[#0D2C54] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Enhanced header */}
        <div className={`text-center max-w-4xl mx-auto mb-16 transition-all duration-1000 ease-out ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#0D2C54] animate-pulse"></div>
            <span className="text-sm font-medium text-[#0D2C54] uppercase tracking-wide">Простота использования</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-primary mb-6 leading-tight">
            Как это работает?{' '}
            <span 
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #FFD100 0%, #E6B800 100%)' }}
            >
              Проще некуда!
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Весь процесс полностью автоматизирован и занимает у клиента не больше минуты
          </p>
        </div>

        {/* Enhanced steps with mobile connection lines */}
        <div className="relative mb-12">
          {/* Mobile vertical line */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#0D2C54] via-[#FFD100] to-[#0D2C54] opacity-30"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                step={step}
                index={index}
                isActive={activeStep === index}
                isVisible={isInView}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>

          {/* Enhanced progress dots */}
          <div className={`flex justify-center mt-8 transition-all duration-1000 delay-300 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`h-1.5 rounded-full transition-all duration-700 ${
                    activeStep === index 
                      ? 'w-8 bg-[#0D2C54] shadow-md' 
                      : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Improved CTA section */}
        <div className={`transition-all duration-1000 delay-500 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-primary mb-2">
                  Готовы увидеть Motor Mind в действии?
                </h3>
                <p className="text-muted-foreground">
                  Настройка занимает 24 часа. Никаких сложных интеграций.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={onConnectClick}
                  className="inline-flex items-center gap-2 justify-center rounded-lg text-sm font-bold h-11 px-6 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                  style={{ 
                    backgroundColor: '#FFD100',
                    color: '#0D2C54'
                  }}
                >
                  Получить демо
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                
                <a 
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-lg text-sm font-semibold h-11 px-6 border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-300"
                >
                  Смотреть тарифы
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;