import React, { useState, useEffect, useRef, useCallback } from 'react';

const AnimatedCounter: React.FC<{
  end: number;
  suffix: string;
  prefix?: string;
  duration: number;
  isVisible: boolean;
}> = ({ end, suffix, prefix = '', duration, isVisible }) => {
  const [count, setCount] = useState(0);
  const animationRef = useRef<number>();
  
  const animate = useCallback((startTime: number, currentTime: number) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    
    // Максимально плавная easing функция
    const easedProgress = progress < 0.5 
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    
    const newCount = Math.floor(easedProgress * end);
    setCount(newCount);
    
    if (progress < 1) {
      animationRef.current = requestAnimationFrame((time) => animate(startTime, time));
    }
  }, [end, duration]);
  
  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }
    
    const timeout = setTimeout(() => {
      animationRef.current = requestAnimationFrame((startTime) => animate(startTime, startTime));
    }, 200);
    
    return () => {
      clearTimeout(timeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, animate]);
  
  return (
    <span className="tabular-nums">
      {prefix}{count === end && suffix === '%' && end === 68 ? '68' : count}{suffix}
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
  isHighlighted?: boolean;
}> = ({ value, animatedValue, label, description, isVisible, delay, icon, isHighlighted = false }) => {
  return (
    <div
      className={`relative group transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
      }`}
      style={{ 
        transitionDelay: `${delay}ms`,
        outline: 'none !important',
        border: 'none !important'
      }}
    >
      {/* Жидкое стекло фон - БЕЗ РАМОК */}
      <div 
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-white/20 to-white/10 backdrop-blur-xl shadow-xl transition-all duration-700 ease-out group-hover:shadow-2xl group-hover:scale-[1.02] group-hover:from-white/50 group-hover:via-white/30 group-hover:to-white/15"
        style={{ 
          outline: 'none !important',
          border: 'none !important',
          boxShadow: isVisible ? '0 25px 50px -12px rgba(0, 0, 0, 0.1)' : 'none'
        }}
      />
      
      {/* Градиентная подложка для highlighted - БЕЗ РАМОК */}
      {isHighlighted && (
        <>
          <div 
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/20 via-accent/10 to-transparent opacity-60 transition-all duration-700 ease-out group-hover:opacity-80 group-hover:from-accent/25 group-hover:via-accent/15"
            style={{ outline: 'none !important', border: 'none !important' }}
          />
          <div 
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-transparent to-accent/5 transition-opacity duration-700 group-hover:opacity-80"
            style={{ outline: 'none !important', border: 'none !important' }}
          />
        </>
      )}
      
      {/* Контент карточки */}
      <div 
        className="relative z-10 p-8 text-center"
        style={{ outline: 'none !important', border: 'none !important' }}
      >
        {/* Иконка с фирменными цветами */}
        <div className={`inline-flex w-14 h-14 rounded-xl items-center justify-center mb-6 transition-all duration-700 ease-out transform group-hover:scale-110 group-hover:rotate-3 ${
          isHighlighted 
            ? 'bg-gradient-to-br from-blue-500 to-accent text-white shadow-lg group-hover:shadow-xl group-hover:shadow-accent/25 group-hover:from-blue-600 group-hover:to-yellow-400' 
            : 'bg-gradient-to-br from-slate-100 to-white text-primary shadow-sm group-hover:from-blue-50 group-hover:to-accent/10 group-hover:text-blue-600 group-hover:shadow-lg group-hover:shadow-blue-500/20'
        }`}>
          {icon}
        </div>
        
        {/* Анимированное значение с градиентом */}
        <div className="mb-4 leading-none">
          <span className={`text-5xl lg:text-6xl xl:text-7xl font-black transition-all duration-700 ease-out ${
            isHighlighted 
              ? 'bg-gradient-to-r from-blue-600 via-accent to-blue-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-yellow-400 group-hover:to-blue-500'
              : 'text-primary group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-blue-600 group-hover:to-primary group-hover:bg-clip-text group-hover:text-transparent'
          }`}>
            {animatedValue ? (
              <AnimatedCounter
                end={animatedValue.end}
                suffix={animatedValue.suffix}
                prefix={animatedValue.prefix}
                duration={1800}
                isVisible={isVisible}
              />
            ) : (
              value
            )}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-slate-800 mb-3 transition-all duration-500 ease-out group-hover:text-slate-900">{label}</h3>
        <p className="text-sm text-slate-600 leading-relaxed transition-all duration-500 ease-out group-hover:text-slate-700">{description}</p>
      </div>
      
      {/* Floating particles для highlighted */}
      {isHighlighted && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full animate-pulse opacity-60" style={{ animationDelay: '0s' }} />
          <div className="absolute bottom-6 left-6 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-8 w-1.5 h-1.5 bg-accent/80 rounded-full animate-bounce opacity-50" style={{ animationDelay: '0.5s' }} />
        </div>
      )}
      
      {/* Hover glow эффект */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out pointer-events-none ${
        isHighlighted 
          ? 'bg-gradient-to-r from-blue-500/3 via-accent/5 to-blue-500/3 blur-xl transform scale-110'
          : 'bg-gradient-to-r from-primary/3 via-blue-500/3 to-primary/3 blur-lg transform scale-105'
      }`} />
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
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    { 
      value: '+1.2',
      animatedValue: { end: 1, suffix: '.2', prefix: '+' },
      label: 'пункта к рейтингу', 
      description: 'в среднем, что выводит сервис в топ',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      isHighlighted: true,
    },
    { 
      value: '68%',
      animatedValue: { end: 68, suffix: '%', prefix: '' },
      label: 'клиентов отвечают', 
      description: 'на запрос в WhatsApp, в отличие от 5% в email',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    { 
      value: '+36%',
      animatedValue: { end: 36, suffix: '%', prefix: '+' },
      label: 'возвратов на ТО', 
      description: 'за счёт доверия и автоматических напоминаний',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="results" 
      className="py-20 md:py-24 relative overflow-hidden"
    >
      {/* Динамический градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-yellow-50/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-white/30" />
      
      {/* Анимированные фоновые элементы */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-accent/5 to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-transparent via-blue-500/2 to-transparent rounded-full animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Заголовок с улучшенной анимацией */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 transition-all duration-1000 transform ${
            isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}>
            <span className="bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent">
              Результаты, которые говорят
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent via-yellow-500 to-accent bg-clip-text text-transparent">
              сами за себя
            </span>
          </h2>
          <p className={`text-xl text-muted-foreground leading-relaxed transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`} style={{ transitionDelay: '200ms' }}>
            Наши клиенты видят рост ключевых показателей уже в первый месяц использования Motor Mind.
          </p>
        </div>
        
        {/* Сетка карточек с улучшенными отступами */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {resultsData.map((result, index) => (
            <StatCard
              key={index}
              {...result}
              isVisible={isInView}
              delay={150 * (index + 1)}
            />
          ))}
        </div>

        {/* Премиальный блок с интересным фактом */}
        <div className={`mt-20 text-center transition-all duration-1000 transform ${
          isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`} style={{ transitionDelay: '1000ms' }}>
          <div className="relative max-w-5xl mx-auto group">
            {/* Жидкое стекло фон */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/60 via-white/40 to-white/20 backdrop-blur-xl shadow-2xl transition-all duration-700 group-hover:shadow-3xl" />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-accent/15 to-blue-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
            
            {/* Контент */}
            <div className="relative z-10 p-12 md:p-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-yellow-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Интересный факт
                </h3>
              </div>
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                Автосервисы, использующие Motor Mind, получают на{' '}
                <span className="font-black bg-gradient-to-r from-blue-600 to-accent bg-clip-text text-transparent">2.3× больше</span>{' '}
                повторных визитов и зарабатывают дополнительно{' '}
                <span className="font-black bg-gradient-to-r from-accent to-yellow-500 bg-clip-text text-transparent">₽47,000 в месяц</span>{' '}
                в среднем благодаря автоматизации.
              </p>
            </div>
            
            {/* Декоративные элементы */}
            <div className="absolute top-6 right-6 w-3 h-3 bg-accent rounded-full animate-pulse opacity-60" />
            <div className="absolute bottom-8 left-8 w-2 h-2 bg-blue-500 rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;