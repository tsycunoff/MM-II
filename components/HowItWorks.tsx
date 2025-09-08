import React, { useState, useEffect, useRef } from 'react';
import { WhatsAppIcon, StarIcon, MessageSquareIcon } from './icons';

const InteractiveStep: React.FC<{
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
      className={`relative cursor-pointer transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${isActive ? 'scale-105' : 'hover:scale-102'}`}
      style={{ transitionDelay: `${150 * (index + 1)}ms` }}
      onClick={onClick}
    >
      {/* Connection line */}
      {index < 2 && (
        <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-transparent transform -translate-y-1/2 z-0">
          <div className={`h-full bg-gradient-to-r from-accent-500 to-accent-300 transition-all duration-1000 ${isActive ? 'w-full' : 'w-0'}`}></div>
        </div>
      )}

      <div className={`relative bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-500 ${
        isActive 
          ? 'border-accent-400 shadow-2xl bg-gradient-to-br from-white to-accent-50' 
          : 'border-gray-200 hover:border-primary-200 hover:shadow-xl'
      }`}>
        {/* Animated background */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-400/10 to-primary-400/10 opacity-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : ''}`}></div>
        
        {/* Step number badge */}
        <div className={`absolute -top-4 -left-4 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold transition-all duration-500 ${
          isActive 
            ? 'bg-gradient-to-r from-accent-500 to-accent-400 scale-125 shadow-lg' 
            : 'bg-gradient-to-r from-primary-500 to-primary-400'
        }`}>
          {index + 1}
        </div>

        <div className="relative z-10">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${
            isActive 
              ? 'bg-gradient-to-br from-accent-500 to-accent-400 shadow-lg scale-110' 
              : 'bg-gradient-to-br from-primary-100 to-primary-200'
          }`}>
            <step.icon className={`w-8 h-8 transition-colors duration-500 ${
              isActive ? 'text-white' : 'text-primary-600'
            }`} />
          </div>
          
          <h3 className={`text-xl font-bold mb-3 transition-colors duration-500 ${
            isActive ? 'text-primary-700' : 'text-primary-600'
          }`}>
            {step.title}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed">
            {step.description}
          </p>

          {/* Expanded detail */}
          <div className={`mt-4 transition-all duration-500 overflow-hidden ${
            isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="border-t border-accent-200 pt-4">
              <p className="text-sm text-primary-600 font-medium">
                {step.detail}
              </p>
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-500/20 to-primary-500/20 opacity-0 transition-opacity duration-500 blur-xl ${
          isActive ? 'opacity-100' : ''
        }`}></div>
      </div>
    </div>
  );
};

const HowItWorks: React.FC = () => {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-advance steps
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveStep(prev => (prev + 1) % steps.length);
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [isInView, steps.length]);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-20 md:py-32 bg-gradient-to-b from-secondary-50 via-background to-primary-50 relative overflow-hidden">
      {/* Background elements */}
      {/* FIX: Replaced styled-jsx with an inline style object to resolve TypeScript error. */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      ></div>
      <div className="absolute top-20 right-1/4 w-64 h-64 bg-accent-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center max-w-4xl mx-auto mb-20 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-primary-200 border border-primary-300 mb-6">
            <span className="text-sm font-semibold text-primary-700">Простота использования</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-primary mb-6">
            Как это работает?{' '}
            <span className="bg-gradient-to-r from-accent-500 to-accent-600 bg-clip-text text-transparent">Проще некуда!</span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Весь процесс полностью автоматизирован и занимает у клиента не больше минуты
          </p>
        </div>

        {/* Interactive Steps */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
            {steps.map((step, index) => (
              <InteractiveStep
                key={index}
                step={step}
                index={index}
                isActive={activeStep === index}
                isVisible={isInView}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>

          {/* Progress indicator */}
          <div className={`flex justify-center mt-12 transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeStep === index 
                      ? 'bg-accent-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Готовы попробовать?
            </h3>
            <p className="text-muted-foreground mb-6">
              Настройка занимает 24 часа. Никаких сложных интеграций - мы все сделаем за вас.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-400 text-accent-foreground font-bold rounded-lg hover:from-accent-600 hover:to-accent-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Получить демо
              </button>
              <button className="px-6 py-3 border-2 border-primary-200 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 hover:border-primary-300 transition-all duration-300">
                Узнать больше
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;