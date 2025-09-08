import React, { useState, useEffect, useCallback, useRef } from 'react';

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const lastScrollTop = useRef(0);
  const animationFrame = useRef<number>();

  const updateScrollProgress = useCallback(() => {
    const scrollTop = Math.max(0, window.pageYOffset || document.documentElement.scrollTop);
    const documentHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const windowHeight = window.innerHeight;
    
    // Исправленный расчет - учитываем реальную прокручиваемую область
    const maxScroll = documentHeight - windowHeight;
    
    if (maxScroll <= 0) {
      setScrollProgress(0);
      setIsVisible(false);
      return;
    }

    // Точный расчет прогресса без скачков
    const rawProgress = (scrollTop / maxScroll) * 100;
    const progress = Math.max(0, Math.min(100, rawProgress));
    
    // Расчет скорости для эффектов
    const currentVelocity = Math.abs(scrollTop - lastScrollTop.current);
    setVelocity(currentVelocity);
    lastScrollTop.current = scrollTop;
    
    setScrollProgress(progress);
    setIsVisible(scrollTop > 50);
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
        }
        
        animationFrame.current = requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      setTimeout(updateScrollProgress, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Начальный расчет
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [updateScrollProgress]);

  return (
    <>
      {/* Основной прогресс-бар с правильным z-index */}
      <div 
        className={`fixed top-0 left-0 w-full pointer-events-none transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
        style={{ zIndex: 60 }} // Выше чем Header (z-50)
      >
        {/* Фоновая полоса */}
        <div className="relative h-1 bg-gradient-to-r from-slate-200/30 via-slate-100/50 to-slate-200/30 backdrop-blur-sm">
          
          {/* Основной прогресс с динамическими эффектами */}
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent via-yellow-400 to-accent transition-all duration-300 ease-out"
            style={{ 
              width: `${scrollProgress}%`,
              boxShadow: `0 0 ${Math.min(velocity, 20)}px rgba(255, 212, 0, ${Math.min(velocity / 15, 0.8)})`,
              filter: velocity > 5 ? 'brightness(1.3) saturate(1.2)' : 'brightness(1)',
              transform: `scaleY(${velocity > 8 ? 1.5 : 1})`,
              transformOrigin: 'center'
            }}
          />
          
          {/* Анимированный блеск */}
          <div 
            className={`absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent ${
              velocity > 3 ? 'animate-pulse' : ''
            }`}
            style={{ 
              width: `${Math.min(scrollProgress + 15, 100)}%`,
              opacity: velocity > 2 ? 0.8 : 0.4
            }}
          />
          
          {/* Дополнительные эффекты скорости */}
          {velocity > 10 && (
            <>
              <div 
                className="absolute top-0 h-full bg-gradient-to-r from-accent/40 to-transparent animate-ping"
                style={{ 
                  right: 0,
                  width: '80px',
                  animationDuration: '0.5s'
                }}
              />
              <div className="absolute top-0 right-0 w-1 h-full bg-white/90 animate-pulse" />
            </>
          )}
        </div>
        
        {/* Световой эффект снизу */}
        <div 
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent blur-sm"
          style={{ 
            width: `${Math.min(scrollProgress + 20, 100)}%`,
            opacity: Math.min(velocity / 10, 0.8)
          }}
        />
      </div>

      {/* Круговой индикатор в углу */}
      <div 
        className={`fixed bottom-6 right-6 pointer-events-none transition-all duration-500 ${
          isVisible && scrollProgress > 5 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
        style={{ zIndex: 60 }}
      >
        <div className="relative w-14 h-14">
          {/* Фоновое кольцо */}
          <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="stroke-slate-200/40"
              strokeWidth="2.5"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* Прогресс кольца с эффектами */}
            <path
              className="stroke-accent transition-all duration-300 ease-out"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              style={{
                strokeDasharray: '100, 100',
                strokeDashoffset: 100 - scrollProgress,
                filter: `drop-shadow(0 0 ${Math.min(velocity / 2, 8)}px rgba(255, 212, 0, ${Math.min(velocity / 20, 0.8)}))`,
                strokeWidth: velocity > 8 ? '3' : '2.5'
              }}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          
          {/* Центральный процент с эффектами */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
              style={{
                transform: velocity > 12 ? 'scale(1.1)' : 'scale(1)',
                boxShadow: velocity > 8 ? '0 0 12px rgba(255, 212, 0, 0.4)' : '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <span 
                className="text-xs font-bold text-slate-800 transition-all duration-300"
                style={{ 
                  textShadow: velocity > 10 ? '0 0 6px rgba(255, 212, 0, 0.6)' : 'none'
                }}
              >
                {Math.round(scrollProgress)}
              </span>
            </div>
          </div>
          
          {/* Дополнительные частицы для очень быстрого скролла */}
          {velocity > 15 && (
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '0.8s' }}>
              <div className="absolute top-0 left-1/2 w-1 h-1 bg-accent rounded-full transform -translate-x-1/2" />
              <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-accent rounded-full transform -translate-x-1/2" />
              <div className="absolute left-0 top-1/2 w-1 h-1 bg-accent rounded-full transform -translate-y-1/2" />
              <div className="absolute right-0 top-1/2 w-1 h-1 bg-accent rounded-full transform -translate-y-1/2" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ScrollProgress;