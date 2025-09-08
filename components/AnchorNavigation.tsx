import React, { useState, useEffect, useCallback, useRef } from 'react';

const AnchorNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(0);
  const animationFrame = useRef<number>();

  // ИСПРАВИЛ: добавил все секции из App.tsx
  const sections = [
    { id: 'hero', label: 'Главная' },
    { id: 'problems', label: 'Проблемы' },
    { id: 'solution', label: 'Решения' },
    { id: 'how-it-works', label: 'Как работает' },
    { id: 'results', label: 'Результаты' },
    { id: 'saasdescription', label: 'SaaS описание' },
    { id: 'features', label: 'Возможности' },
    { id: 'pricing', label: 'Тарифы' },
    { id: 'faq', label: 'FAQ' },
  ];

  const updateActiveSection = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    if (scrollY > lastScrollY.current) {
      setScrollDirection('down');
    } else if (scrollY < lastScrollY.current) {
      setScrollDirection('up');
    }
    lastScrollY.current = scrollY;

    setIsVisible(scrollY > 200);

    let currentSection = 'hero';
    
    if (scrollY < 100) {
      currentSection = 'hero';
    }
    else if (scrollY + windowHeight >= documentHeight - 200) {
      currentSection = 'faq';
    }
    else {
      let closestSection = { id: 'hero', distance: Infinity };
      
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top;
          const elementHeight = rect.height;
          
          if (elementTop <= 100 && elementTop + elementHeight > 100) {
            const distanceFromTop = Math.abs(elementTop);
            if (distanceFromTop < closestSection.distance) {
              closestSection = { id: section.id, distance: distanceFromTop };
            }
          }
        }
      });
      
      if (closestSection.id !== 'hero') {
        currentSection = closestSection.id;
      }
    }

    setActiveSection(currentSection);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
        }
        
        animationFrame.current = requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateActiveSection, { passive: true });
    
    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateActiveSection);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [updateActiveSection]);

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      const targetY = elementTop - headerHeight;
      
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed right-3 top-1/2 transform -translate-y-1/2 hidden xl:block transition-all duration-300 ${
        scrollDirection === 'down' ? 'translate-x-0' : '-translate-x-1'
      }`}
      style={{ zIndex: 50 }}
    >
      {/* РЕАЛЬНО уменьшенный контейнер */}
      <div className="relative">
        {/* Фоновое свечение - синее */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/8 to-blue-600/8 rounded-lg blur-sm opacity-50" />
        
        {/* Главный контейнер - РЕАЛЬНО компактный */}
        <div className="relative bg-white/90 backdrop-blur-lg border border-slate-200/60 rounded-lg p-1 shadow-lg">
          {/* Индикатор активной секции - СИНИЙ */}
          <div 
            className="absolute left-0.5 w-0.5 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full transition-all duration-400 ease-out"
            style={{
              height: '14px',
              top: `${4 + sections.findIndex(s => s.id === activeSection) * 20}px`,
            }}
          />
          
          {/* Кнопки навигации - РЕАЛЬНО маленькие */}
          <div className="space-y-0.5 relative z-10">
            {sections.map((section, index) => {
              const isActive = activeSection === section.id;
              const isHovered = hoveredSection === section.id;
              
              return (
                <div key={section.id} className="relative group">
                  {/* Подсказка - компактная */}
                  <div 
                    className={`absolute right-7 top-1/2 transform -translate-y-1/2 px-2 py-0.5 bg-slate-900 text-white text-xs rounded shadow-lg transition-all duration-200 whitespace-nowrap pointer-events-none ${
                      isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                    }`}
                  >
                    {section.label}
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-2 border-transparent border-l-slate-900" />
                  </div>

                  {/* РЕАЛЬНО маленькая кнопка-точка */}
                  <button
                    onClick={() => scrollToSection(section.id)}
                    onMouseEnter={() => setHoveredSection(section.id)}
                    onMouseLeave={() => setHoveredSection(null)}
                    className={`relative w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center ${
                      isActive 
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-md scale-110' 
                        : 'bg-slate-100/80 hover:bg-slate-200/80 hover:scale-105 border border-slate-300/50'
                    }`}
                    style={{
                      boxShadow: isActive 
                        ? '0 3px 12px rgba(59, 130, 246, 0.3), 0 0 8px rgba(59, 130, 246, 0.2)' 
                        : isHovered
                        ? '0 2px 6px rgba(0, 0, 0, 0.08)'
                        : '0 1px 3px rgba(0, 0, 0, 0.04)'
                    }}
                  >
                    {/* Центральная точка */}
                    <div 
                      className={`w-1 h-1 rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'bg-white shadow-sm' 
                          : 'bg-slate-400 group-hover:bg-slate-600'
                      }`}
                      style={{
                        transform: `scale(${isActive ? 1.3 : isHovered ? 1.1 : 1})`
                      }}
                    />

                    {/* Активные эффекты */}
                    {isActive && (
                      <>
                        {/* Пульсирующее кольцо */}
                        <div className="absolute inset-0 rounded-full border border-white/40 animate-ping" />
                        
                        {/* Золотые частицы - МАЛЕНЬКИЕ */}
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute top-0 left-1/2 w-0.5 h-0.5 bg-yellow-400 rounded-full animate-ping transform -translate-x-0.5" style={{ animationDelay: '0s' }} />
                          <div className="absolute bottom-0 right-0 w-0.5 h-0.5 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
                          <div className="absolute top-1/2 left-0 w-0.5 h-0.5 bg-yellow-400 rounded-full animate-ping transform -translate-y-0.5" style={{ animationDelay: '0.8s' }} />
                        </div>
                      </>
                    )}

                    {/* Hover эффект - синий */}
                    {isHovered && !isActive && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/15 to-blue-600/15 animate-pulse" />
                    )}
                  </button>

                  {/* Боковой индикатор прогресса - золотой */}
                  {isActive && (
                    <div className="absolute -right-0.5 top-1/2 transform -translate-y-1/2 w-0.5 h-2 bg-gradient-to-b from-transparent via-yellow-400 to-transparent rounded-full animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Декоративные элементы - маленькие */}
        <div className="absolute -top-0.5 -right-0.5 w-0.5 h-0.5 bg-yellow-400 rounded-full animate-pulse opacity-70" />
        <div className="absolute -bottom-0.5 -left-0.5 w-0.5 h-0.5 bg-blue-500 rounded-full animate-pulse opacity-50" style={{ animationDelay: '0.8s' }} />
      </div>
    </div>
  );
};

export default AnchorNavigation;