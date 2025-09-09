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
    
    // Smooth easing
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
      className={`group transition-all duration-700 ease-out transform will-change-transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div 
        className={`relative bg-white rounded-xl p-6 md:p-8 border transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.02] ${
          isHighlighted 
            ? 'border-[#FFD100] shadow-xl shadow-[#FFD100]/10 hover:shadow-2xl hover:shadow-[#FFD100]/20' 
            : 'border-slate-200 shadow-lg hover:shadow-2xl hover:border-slate-300'
        }`}
      >
        
        {/* Enhanced highlight background with gradient animation */}
        {isHighlighted && (
          <>
            <div 
              className="absolute inset-0 rounded-xl opacity-5 group-hover:opacity-15 transition-opacity duration-700"
              style={{ background: 'linear-gradient(135deg, #FFD100, #0D2C54)' }}
            />
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div 
                className="absolute inset-0 rounded-xl animate-pulse"
                style={{ 
                  background: 'linear-gradient(135deg, transparent, #FFD100, transparent)',
                  padding: '2px',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude'
                }}
              />
            </div>
          </>
        )}
        
        {/* Icon with enhanced effects */}
        <div className={`inline-flex w-12 h-12 rounded-lg items-center justify-center mb-6 transition-all duration-700 ease-out group-hover:scale-125 group-hover:rotate-6 ${
          isHighlighted 
            ? 'text-white shadow-lg group-hover:shadow-xl' 
            : 'text-white shadow-sm group-hover:shadow-lg'
        }`}
        style={{
          background: isHighlighted 
            ? 'linear-gradient(135deg, #0D2C54, #1a3a6b)' 
            : 'linear-gradient(135deg, #22c55e, #16a34a)'
        }}>
          {icon}
        </div>
        
        {/* Animated value - no gradient for +1.2 in static */}
        <div className="mb-4">
          <span className={`text-4xl md:text-5xl lg:text-6xl font-extrabold transition-all duration-700 group-hover:scale-110 ${
            isHighlighted 
              ? 'text-[#0D2C54] group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent'
              : 'text-[#0D2C54]'
          }`}
          style={isHighlighted ? {
            '--tw-gradient-from': '#0D2C54',
            '--tw-gradient-to': '#FFD100'
          } as React.CSSProperties : {}}>
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
        
        <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-[#0D2C54] transition-colors duration-500">
          {label}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-slate-600 transition-colors duration-500">
          {description}
        </p>

        {/* Enhanced floating elements for highlighted */}
        {isHighlighted && (
          <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
            <div 
              className="absolute top-4 right-4 w-2 h-2 rounded-full animate-pulse group-hover:animate-bounce opacity-60 group-hover:opacity-100"
              style={{ backgroundColor: '#FFD100' }}
            />
            <div 
              className="absolute bottom-6 left-6 w-1.5 h-1.5 rounded-full animate-ping opacity-40 group-hover:opacity-70"
              style={{ backgroundColor: '#22c55e', animationDelay: '1s' }}
            />
            <div 
              className="absolute top-1/2 right-8 w-1 h-1 bg-[#0D2C54] rounded-full animate-bounce opacity-30 group-hover:opacity-60"
              style={{ animationDelay: '0.5s', animationDuration: '2s' }}
            />
          </div>
        )}

        {/* Subtle shimmer effect on hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
          <div 
            className="absolute inset-0 rounded-xl"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
              transform: 'translateX(-100%)',
              transition: 'transform 1000ms ease-out'
            }}
          />
        </div>
      </div>
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
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="results" 
      className="py-20 md:py-24 bg-gradient-to-br from-[#0D2C54] to-[#1a3a6b] text-white relative overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>
      
      {/* Floating elements */}
      <div 
        className="absolute top-20 right-20 w-32 h-32 rounded-full opacity-20 animate-pulse"
        style={{ 
          background: 'radial-gradient(circle, #FFD100, transparent 70%)',
          filter: 'blur(40px)',
          animationDuration: '8s'
        }}
      />
      <div 
        className="absolute bottom-20 left-20 w-40 h-40 rounded-full opacity-15 animate-pulse"
        style={{ 
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent 70%)',
          filter: 'blur(50px)',
          animationDuration: '10s',
          animationDelay: '2s'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tighter mb-6 leading-tight transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Результаты, которые говорят сами за себя
          </h2>
          <p className={`text-lg text-white/80 leading-relaxed transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`} style={{ transitionDelay: '200ms' }}>
            Наши клиенты видят рост ключевых показателей уже в первый месяц использования Motor Mind.
          </p>
        </div>
        
        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {resultsData.map((result, index) => (
            <StatCard
              key={index}
              {...result}
              isVisible={isInView}
              delay={150 * (index + 1)}
            />
          ))}
        </div>

        {/* Bottom insight */}
        <div className={`text-center transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="relative max-w-4xl mx-auto group">
            <div 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-10 border border-white/20 transition-all duration-700 hover:bg-white/15 hover:border-white/30"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: '#FFD100' }}
                >
                  <svg className="w-5 h-5 text-[#0D2C54]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Интересный факт
                </h3>
              </div>
              <p className="text-lg text-white/90 leading-relaxed">
                Автосервисы, использующие Motor Mind, получают на{' '}
                <span 
                  className="font-bold"
                  style={{ color: '#FFD100' }}
                >
                  2.3× больше
                </span>{' '}
                повторных визитов и зарабатывают дополнительно{' '}
                <span 
                  className="font-bold"
                  style={{ color: '#FFD100' }}
                >
                  ₽47,000 в месяц
                </span>{' '}
                в среднем благодаря автоматизации.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;