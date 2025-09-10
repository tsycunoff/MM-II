import React, { useState, useEffect, useCallback, useRef } from 'react';

const AnchorNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(0);
  const animationFrame = useRef<number>();

  // Правильные ID секций в порядке App.tsx
  const sections = [
    { id: 'hero', label: 'Главная' },
    { id: 'problems', label: 'Проблемы' },
    { id: 'solution', label: 'Решения' },
    { id: 'how-it-works', label: 'Как работает' },
    { id: 'results', label: 'Результаты' },
    { id: 'saas', label: 'О Motor Mind' },
    { id: 'features', label: 'Возможности' },
    { id: 'integration', label: 'Интеграция' },
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
          
          if (elementTop <= 120 && elementTop + elementHeight > 80) {
            const distanceFromTop = Math.abs(elementTop - 60);
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
      {/* Компактный контейнер */}
      <div className="relative">
        {/* Фоновое свечение - фирменный синий */}
        <div 
          className="absolute -inset-1 rounded-lg blur-sm opacity-50"
          style={{ backgroundColor: 'rgba(13, 44, 84, 0.08)' }}
        />
        
        {/* Главный контейнер - компактный */}
        <div className="relative bg-white/90 backdrop-blur-lg border border-slate-200/60 rounded-lg p-1 shadow-lg">
          {/* Индикатор активной секции - фирменный синий */}
          <div 
            className="absolute left-0.5 w-0.5 rounded-full transition-all duration-400 ease-out"
            style={{
              height: '14px',
              top: `${4 + sections.findIndex(s => s.id === activeSection) * 20}px`,
              background: 'linear-gradient(to bottom, #0D2C54, #183A68)'
            }}
          />
          
          {/* Кнопки навигации - маленькие */}
          <div className="space-y-0.5 relative z-10">
            {sections.map((section, index) => {
              const isActive = activeSection === section.id;
              const isHovered = hoveredSection === section.id;
              
              return (
                <div key={section.id} className="relative group">
                  {/* Подсказка - компактная */}
                  <div 
                    className={`absolute right-7 top-1/2 transform -translate-y-1/2 px-2 py-0.5 text-white text-xs rounded shadow-lg transition-all duration-200 whitespace-nowrap pointer-events-none ${
                      isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                    }`}
                    style={{ backgroundColor: '#0D2C54' }}
                  >
                    {section.label}
                    <div 
                      className="absolute left-full top-1/2 transform -translate-y-1/2 border-2 border-transparent"
                      style={{ borderLeftColor: '#0D2C54' }}
                    />
                  </div>

                  {/* Маленькая кнопка-точка */}
                  <button
                    onClick={() => scrollToSection(section.id)}
                    onMouseEnter={() => setHoveredSection(section.id)}
                    onMouseLeave={() => setHoveredSection(null)}
                    className={`relative w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center ${
                      isActive 
                        ? 'shadow-md scale-110' 
                        : 'bg-slate-100/80 hover:bg-slate-200/80 hover:scale-105 border border-slate-300/50'
                    }`}
                    style={{
                      background: isActive 
                        ? 'linear-gradient(135deg, #0D2C54, #183A68)'
                        : undefined,
                      boxShadow: isActive 
                        ? '0 3px 12px rgba(13, 44, 84, 0.3), 0 0 8px rgba(13, 44, 84, 0.2)' 
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
                        
                        {/* Фирменные желтые частицы */}
                        <div className="absolute inset-0 pointer-events-none">
                          <div 
                            className="absolute top-0 left-1/2 w-0.5 h-0.5 rounded-full animate-ping transform -translate-x-0.5"
                            style={{ backgroundColor: '#FFD100', animationDelay: '0s' }}
                          />
                          <div 
                            className="absolute bottom-0 right-0 w-0.5 h-0.5 rounded-full animate-ping"
                            style={{ backgroundColor: '#FFD100', animationDelay: '0.4s' }}
                          />
                          <div 
                            className="absolute top-1/2 left-0 w-0.5 h-0.5 rounded-full animate-ping transform -translate-y-0.5"
                            style={{ backgroundColor: '#FFD100', animationDelay: '0.8s' }}
                          />
                        </div>
                      </>
                    )}

                    {/* Hover эффект - фирменный синий */}
                    {isHovered && !isActive && (
                      <div 
                        className="absolute inset-0 rounded-full animate-pulse"
                        style={{ backgroundColor: 'rgba(13, 44, 84, 0.15)' }}
                      />
                    )}
                  </button>

                  {/* Боковой индикатор прогресса - фирменный желтый */}
                  {isActive && (
                    <div 
                      className="absolute -right-0.5 top-1/2 transform -translate-y-1/2 w-0.5 h-2 rounded-full animate-pulse"
                      style={{ 
                        background: `linear-gradient(to bottom, transparent, #FFD100, transparent)`
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Декоративные элементы - фирменные цвета */}
        <div 
          className="absolute -top-0.5 -right-0.5 w-0.5 h-0.5 rounded-full animate-pulse opacity-70"
          style={{ backgroundColor: '#FFD100' }}
        />
        <div 
          className="absolute -bottom-0.5 -left-0.5 w-0.5 h-0.5 rounded-full animate-pulse opacity-50"
          style={{ backgroundColor: '#0D2C54', animationDelay: '0.8s' }}
        />
      </div>
    </div>
  );
};

export default AnchorNavigation;