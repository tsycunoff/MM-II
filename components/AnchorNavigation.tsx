import React, { useState, useEffect } from 'react';

const AnchorNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const sections = [
    { id: 'hero', label: 'Главная' },
    { id: 'solution', label: 'Решения' },
    { id: 'how-it-works', label: 'Как работает' },
    { id: 'results', label: 'Результаты' },
    { id: 'pricing', label: 'Тарифы' },
    { id: 'faq', label: 'FAQ' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 500);

      let currentSection = 'hero';
      
      if (scrollY < 100) {
        currentSection = 'hero';
      } else {
        for (const section of sections) {
          if (section.id === 'hero') continue;
          
          const element = document.getElementById(section.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) {
              currentSection = section.id;
            }
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block">
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg">
        <div className="space-y-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`block w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                activeSection === section.id
                  ? 'bg-blue-600 border-blue-600 scale-125'
                  : 'border-gray-300 hover:border-blue-400'
              }`}
              title={section.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnchorNavigation;