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
      className={`relative cursor-pointer transition-all duration-600 ease-out will-change-transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${isActive ? 'scale-[1.02] z-10' : 'hover:scale-[1.01]'}`}
      style={{ transitionDelay: `${100 * (index + 1)}ms` }}
      onClick={onClick}
    >
      {/* Simple horizontal connection line */}
      {index < 2 && (
        <div className="hidden lg:block absolute top-1/2 left-full w-full h-px -translate-y-1/2 z-0">
          <div 
            className={`h-full transition-all duration-800 ease-out ${
              isActive ? 'w-full opacity-100' : 'w-0 opacity-60'
            }`}
            style={{ 
              background: isActive 
                ? 'linear-gradient(to right, #0D2C54, transparent)' 
                : '#e2e8f0'
            }}
          />
        </div>
      )}

      <div className={`relative bg-white rounded-xl p-6 md:p-8 border transition-all duration-600 ease-out will-change-transform ${
        isActive 
          ? 'border-[#0D2C54] shadow-xl shadow-[#0D2C54]/10' 
          : 'border-slate-200 hover:border-slate-300 shadow-md hover:shadow-lg'
      }`}>
        
        {/* Clean step number */}
        <div 
          className={`absolute -top-3 -left-3 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold transition-all duration-600 ${
            isActive ? 'scale-110' : ''
          }`}
          style={{ 
            backgroundColor: isActive ? '#0D2C54' : '#64748b'
          }}
        >
          {index + 1}
        </div>

        <div className="relative">
          <div 
            className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-600 ${
              isActive ? 'scale-105' : ''
            }`}
            style={{ 
              backgroundColor: isActive ? '#0D2C54' : '#f8fafc'
            }}
          >
            <step.icon className={`w-6 h-6 transition-colors duration-600 ${
              isActive ? 'text-white' : 'text-[#0D2C54]'
            }`} />
          </div>
          
          <h3 className={`text-lg font-bold mb-3 transition-colors duration-600 ${
            isActive ? 'text-[#0D2C54]' : 'text-slate-800'
          }`}>
            {step.title}
          </h3>
          
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            {step.description}
          </p>

          {/* Clean expanding detail */}
          <div 
            className={`transition-all duration-600 ease-out overflow-hidden ${
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
    <section ref={sectionRef} id="how-it-works" className="py-20 md:py-24 bg-secondary">
      <div className="container mx-auto px-6">
        
        {/* Clean header */}
        <div className={`text-center max-w-4xl mx-auto mb-16 transition-all duration-1000 ease-out ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-6">
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

        {/* Clean steps */}
        <div className="relative mb-12">
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

          {/* Simple progress dots */}
          <div className={`flex justify-center mt-8 transition-all duration-1000 delay-300 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="flex items-center gap-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`h-1.5 rounded-full transition-all duration-600 ${
                    activeStep === index 
                      ? 'w-8 bg-[#0D2C54]' 
                      : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Different CTA approach - horizontal layout */}
        <div className={`transition-all duration-1000 delay-500 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-sm">
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
                  className="inline-flex items-center gap-2 justify-center rounded-md text-sm font-bold h-11 px-6 transition-all duration-600 hover:scale-105"
                  style={{ 
                    backgroundColor: '#FFD100',
                    color: '#0D2C54',
                    boxShadow: '0 3px 0 #E6B800'
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'translateY(1px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 2px 0 #E6B800';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 3px 0 #E6B800';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 3px 0 #E6B800';
                  }}
                >
                  Получить демо
                </button>
                
                <a 
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-md text-sm font-semibold h-11 px-6 border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-600"
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