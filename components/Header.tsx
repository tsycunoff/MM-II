import React, { useState, useEffect } from 'react';
import { LogoIcon } from './icons';

const Header: React.FC<{ onConnectClick: () => void }> = ({ onConnectClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);

      const sections = ['solution', 'how-it-works', 'results', 'pricing', 'faq'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      
      setActiveSection(currentSection || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#solution', label: 'Решения', id: 'solution' },
    { href: '#how-it-works', label: 'Как работает', id: 'how-it-works' },
    { href: '#results', label: 'Результаты', id: 'results' },
    { href: '#pricing', label: 'Тарифы', id: 'pricing' },
    { href: '#faq', label: 'FAQ', id: 'faq' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };
  
  const NavLink = ({ href, label, isActive }: { href: string, label: string, isActive: boolean }) => (
    <a
      href={href}
      onClick={(e) => { e.preventDefault(); scrollToSection(href); }}
      className={`relative transition-all duration-300 hover:text-primary group ${
        isActive ? 'text-primary font-semibold' : 'text-foreground/70 hover:text-foreground'
      }`}
    >
      <span>{label}</span>
      <div className={`absolute -bottom-1 left-0 h-0.5 bg-yellow-400 transition-all duration-300 ${
        isActive ? 'w-full' : 'w-0 group-hover:w-full'
      }`}></div>
    </a>
  );

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
      isScrolled 
        ? 'border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-lg' 
        : 'border-transparent bg-background'
    }`}>
      <div className="container flex h-20 lg:h-24 items-center mx-auto px-6">
        <a href="#" className="mr-8 flex items-center space-x-4 group" onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
          <LogoIcon className="h-16 w-auto text-primary transition-transform group-hover:scale-105" />
          <span className="font-bold text-3xl text-primary">Motor Mind</span>
        </a>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden lg:flex gap-8 text-sm">
            {navLinks.map(link => (
              <NavLink key={link.href} href={link.href} label={link.label} isActive={activeSection === link.id} />
            ))}
          </nav>
          
          <div className="hidden lg:flex items-center gap-3 ml-6">
             <button
                className="inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-secondary/80 h-10 px-4"
              >
                Авторизация
            </button>
             <button
              onClick={onConnectClick}
              className="inline-flex items-center justify-center rounded-lg text-sm font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-yellow-400 text-blue-900 hover:bg-yellow-500 h-10 px-6 shadow-lg group"
            >
              <span>Запустить за 24 часа</span>
              <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          <button
            className="lg:hidden inline-flex items-center justify-center rounded-md text-sm font-medium p-2 hover:bg-secondary/80 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Открыть меню"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
            >
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 z-50 bg-black/20 backdrop-blur-sm animate-fade-in" onClick={() => setIsMenuOpen(false)}>
          <div className="bg-background border-b shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="container mx-auto px-6 py-6">
              <nav className="grid gap-4 mb-6">
                {navLinks.map(link => (
                  <a 
                    key={link.href} 
                    href={link.href} 
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }} 
                    className={`flex items-center justify-between py-3 px-4 rounded-lg transition-colors hover:bg-secondary/50 ${
                      activeSection === link.id ? 'bg-yellow-100 text-primary font-semibold' : 'text-foreground'
                    }`}
                  >
                    <span>{link.label}</span>
                    {activeSection === link.id && (
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    )}
                  </a>
                ))}
              </nav>
              
              <div className="grid gap-3">
                <button
                  onClick={onConnectClick}
                  className="inline-flex items-center justify-center rounded-lg text-base font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-yellow-400 text-blue-900 hover:bg-yellow-500 h-12 px-6 shadow-lg group w-full"
                >
                  <span>Запустить Motor Mind</span>
                  <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button
                    className="inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-secondary/80 h-10 px-4 w-full"
                  >
                    Авторизация
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;