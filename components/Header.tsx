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
          return rect.top <= 100 && rect.bottom >= 100;
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
    { href: '#how-it-works', label: 'Как это работает', id: 'how-it-works' },
    { href: '#results', label: 'Результаты', id: 'results' },
    { href: '#pricing', label: 'Тарифы', id: 'pricing' },
    { href: '#faq', label: 'FAQ', id: 'faq' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };
  
  const NavLink = ({ href, label, isActive }: { href: string, label: string, isActive: boolean }) => (
    <a
      href={href}
      onClick={(e) => { e.preventDefault(); scrollToSection(href); }}
      className={`transition-colors hover:text-foreground/80 ${isActive ? 'text-foreground font-semibold' : 'text-foreground/60'}`}
    >
      {label}
    </a>
  );

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${isScrolled ? 'border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60' : 'border-transparent bg-background'}`}>
      <div className="container flex h-16 items-center mx-auto px-6">
        <a href="#" className="mr-6 flex items-center space-x-2" onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
          <LogoIcon className="h-8 w-auto text-primary" />
          <span className="font-bold text-primary">Motor Mind</span>
        </a>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden md:flex gap-6 text-sm">
            {navLinks.map(link => (
              <NavLink key={link.href} href={link.href} label={link.label} isActive={activeSection === link.id} />
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2 ml-4">
             <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-secondary h-9 px-4"
              >
                Авторизация
            </button>
             <button
              onClick={onConnectClick}
              className="inline-flex items-center justify-center rounded-md text-sm font-bold ring-offset-background transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 h-9 px-4 py-2 border-b-4 border-accent-dark active:border-b-0 active:translate-y-1"
            >
              Подключить
            </button>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-md text-sm font-medium p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Открыть меню"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-y-auto p-6 pb-32 shadow-md animate-fade-in" onClick={() => setIsMenuOpen(false)}>
          <div className="relative z-20 grid gap-6 rounded-md bg-background p-4 text-popover-foreground shadow-md border">
            <nav className="grid grid-flow-row auto-rows-max text-sm">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }} className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline">{link.label}</a>
              ))}
            </nav>
            <div className="flex flex-col space-y-2">
                 <button
                  onClick={onConnectClick}
                  className="inline-flex items-center justify-center rounded-md text-sm font-bold ring-offset-background transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 h-9 px-4 py-2 border-b-4 border-accent-dark active:border-b-0 active:translate-y-1"
                >
                  Подключить
                </button>
                <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-secondary h-9 px-4"
                  >
                    Авторизация
                </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;