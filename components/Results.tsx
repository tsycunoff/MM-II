import React, { useState, useEffect, useRef } from 'react';

const AnimatedCounter: React.FC<{
  end: number;
  suffix: string;
  prefix?: string;
  duration: number;
  isVisible: boolean;
}> = ({ end, suffix, prefix = '', duration, isVisible }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);
  
  return (
    <span>
      {prefix}{count}{suffix}
    </span>
  );
};

const StatCard: React.FC<{
  value: string;
  animatedValue?: { end: number; suffix: string; prefix?: string };
  label: string;
  description: string;
  isVisible: boolean;
  delay: number;
  icon: React.ReactNode;
  gradient: string;
}> = ({ value, animatedValue, label, description, isVisible, delay, icon, gradient }) => {
  return (
    <div
      className={`relative bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl p-6 lg:p-8 text-center transition-all duration-700 transform hover:scale-105 group overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      {/* Icon */}
      <div className={`inline-flex w-12 h-12 rounded-xl items-center justify-center mb-4 bg-gradient-to-br ${gradient} shadow-lg`}>
        <div className="text-white">
          {icon}
        </div>
      </div>
      
      {/* Animated value */}
      <div className={`text-4xl lg:text-5xl xl:text-6xl font-extrabold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-3 relative z-10`}>
        {animatedValue ? (
          <AnimatedCounter
            end={animatedValue.end}
            suffix={animatedValue.suffix}
            prefix={animatedValue.prefix}
            duration={2000}
            isVisible={isVisible}
          />
        ) : (
          value
        )}
      </div>
      
      <h3 className="text-lg font-bold text-gray-800 mb-2 relative z-10">{label}</h3>
      <p className="text-sm text-gray-600 leading-relaxed relative z-10">{description}</p>
      
      {/* Hover effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-all duration-300"></div>
    </div>
  );
};

const Results: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const resultsData = [
    { 
      value: '×3',
      animatedValue: { end: 3, suffix: '×', prefix: '' },
      label: 'рост числа отзывов', 
      description: 'на Яндекс.Картах и 2ГИС',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      gradient: 'from-blue-500 to-blue-600'
    },
    { 
      value: '+1.2',
      animatedValue: { end: 1.2, suffix: '', prefix: '+' },
      label: 'пункта к рейтингу', 
      description: 'в среднем, что выводит сервис в топ',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      gradient: 'from-yellow-500 to-amber-500'
    },
    { 
      value: '54-68%',
      animatedValue: { end: 68, suffix: '%', prefix: '' },
      label: 'клиентов отвечают', 
      description: 'на запрос в WhatsApp, в отличие от 5% в email',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      gradient: 'from-green-500 to-emerald-500'
    },
    { 
      value: '+36%',
      animatedValue: { end: 36, suffix: '%', prefix: '+' },
      label: 'возвратов на ТО', 
      description: 'за счёт доверия и автоматических напоминаний',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500'
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="results" className="py-20 md:py-24 bg-gradient-primary text-primary-foreground relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary via-primary-700 to-primary-800"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-white">Проверенные результаты</span>
          </div>
          
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Результаты, которые говорят сами за себя
          </h2>
          <p className={`text-lg md:text-xl text-white/80 leading-relaxed transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '200ms' }}>
            Наши клиенты видят рост ключевых показателей уже в первый месяц использования <span className="font-bold text-accent">Motor Mind</span>.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {resultsData.map((result, index) => (
            <StatCard
              key={index}
              {...result}
              isVisible={isInView}
              delay={300 * (index + 1)}
            />
          ))}
        </div>

        {/* Additional insights */}
        <div className={`mt-16 text-center transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '1500ms' }}>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              💡 Интересный факт
            </h3>
            <p className="text-white/90 text-lg leading-relaxed">
              Автосервисы, использующие Motor Mind, получают на <span className="font-bold text-accent">2.3x больше</span> повторных визитов 
              и зарабатывают дополнительно <span className="font-bold text-accent">₽47,000 в месяц</span> в среднем благодаря автоматизации.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;