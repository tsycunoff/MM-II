import React from 'react';
import { LogoIcon } from './icons';

const Footer: React.FC = () => {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-white border-t border-slate-100 relative overflow-hidden">
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.01]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-16 md:py-18 relative z-10">
        
        {/* Main content - оптимизированная сетка */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand section - компактнее */}
          <div className="lg:col-span-5">
            <div className="flex items-center mb-6">
              <LogoIcon className="h-8 w-auto mr-3 text-[#0D2C54]" />
              <span 
                className="text-xl font-extrabold"
                style={{ color: '#0D2C54' }}
              >
                Motor Mind
              </span>
            </div>
            
            {/* Улучшенное описание */}
            <p className="text-slate-700 text-base leading-relaxed mb-8 max-w-md font-medium">
              Автоматизируем работу с клиентами для автосервисов через WhatsApp.{' '}
              <span 
                className="font-semibold"
                style={{ color: '#0D2C54' }}
              >
                Увеличиваем отзывы и возвращаем клиентов.
              </span>
            </p>
            
            {/* Contact info - компактнее */}
            <div className="space-y-3">
              <a 
                href="mailto:hello@motor-mind.ru" 
                className="flex items-center gap-3 text-slate-700 hover:text-[#0D2C54] transition-colors duration-300"
              >
                <div 
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(13, 44, 84, 0.1)' }}
                >
                  <svg className="w-3.5 h-3.5 text-[#0D2C54]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">hello@motor-mind.ru</span>
              </a>

              <a 
                href="tel:+79991234567" 
                className="flex items-center gap-3 text-slate-700 hover:text-[#0D2C54] transition-colors duration-300"
              >
                <div 
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(13, 44, 84, 0.1)' }}
                >
                  <svg className="w-3.5 h-3.5 text-[#0D2C54]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">+7 (999) 123-45-67</span>
              </a>
            </div>
          </div>

          {/* Navigation - только 3 колонки */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              
              {/* Product links */}
              <div>
                <h3 className="text-xs font-bold text-[#0D2C54] uppercase tracking-wider mb-5">
                  Продукт
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#solution"
                      onClick={(e) => { e.preventDefault(); scrollToSection('#solution'); }}
                      className="text-sm text-slate-700 hover:text-[#0D2C54] transition-colors duration-300 font-medium"
                    >
                      Решения
                    </a>
                  </li>
                  <li>
                    <a
                      href="#how-it-works"
                      onClick={(e) => { e.preventDefault(); scrollToSection('#how-it-works'); }}
                      className="text-sm text-slate-700 hover:text-[#0D2C54] transition-colors duration-300 font-medium"
                    >
                      Как работает
                    </a>
                  </li>
                  <li>
                    <a
                      href="#results"
                      onClick={(e) => { e.preventDefault(); scrollToSection('#results'); }}
                      className="text-sm text-slate-700 hover:text-[#0D2C54] transition-colors duration-300 font-medium"
                    >
                      Результаты
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      onClick={(e) => { e.preventDefault(); scrollToSection('#pricing'); }}
                      className="text-sm text-slate-700 hover:text-[#0D2C54] transition-colors duration-300 font-medium"
                    >
                      Тарифы
                    </a>
                  </li>
                  <li>
                    <a
                      href="#faq"
                      onClick={(e) => { e.preventDefault(); scrollToSection('#faq'); }}
                      className="text-sm text-slate-700 hover:text-[#0D2C54] transition-colors duration-300 font-medium"
                    >
                      Вопросы и ответы
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-xs font-bold text-[#0D2C54] uppercase tracking-wider mb-5">
                  Компания
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="https://motor-mind.ru/about" 
                      className="text-sm text-slate-700 hover:text-[#0D2C54] transition-colors duration-300 font-medium"
                    >
                      О нас
                    </a>
                  </li>
                  <li>
                    <a 
                      href="mailto:hello@motor-mind.ru" 
                      className="text-sm text-slate-700 hover:text-[#0D2C54] transition-colors duration-300 font-medium"
                    >
                      Связаться
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://motor-mind.ru/partner" 
                      className="text-sm text-slate-700 hover:text-[#0D2C54] transition-colors duration-300 font-medium"
                    >
                      Партнерская программа
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://motor-mind.ru/privacy" 
                      className="text-sm text-slate-700 hover:text-[#0D2C54] transition-colors duration-300 font-medium"
                    >
                      Конфиденциальность
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://motor-mind.ru/license-agreement" 
                      className="text-sm text-slate-700 hover:text-[#0D2C54] transition-colors duration-300 font-medium"
                    >
                      Публичная оферта
                    </a>
                  </li>
                </ul>
              </div>

              {/* Resources - только реальные */}
              <div>
                <h3 className="text-xs font-bold text-[#0D2C54] uppercase tracking-wider mb-5">
                  Ресурсы
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="https://motor-mind.ru/blog" 
                      className="text-sm text-slate-700 hover:text-[#0D2C54] transition-colors duration-300 font-medium"
                    >
                      Блог
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://motor-mind.ru/status" 
                      className="text-sm text-slate-700 hover:text-[#0D2C54] transition-colors duration-300 font-medium flex items-center gap-2"
                    >
                      Статус сервиса
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section - более тонкий разделитель */}
        <div className="mt-12 pt-6 border-t border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright with social */}
            <div className="flex items-center gap-6">
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} Motor Mind. Все права защищены.
              </p>
              
              {/* Исправленные иконки соцсетей */}
              <div className="flex items-center gap-3">
                <a 
                  href="https://t.me/motormind" 
                  className="text-slate-400 hover:text-[#0D2C54] transition-colors duration-300"
                  aria-label="Telegram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
                <a 
                  href="https://wa.me/79991234567" 
                  className="text-slate-400 hover:text-[#25D366] transition-colors duration-300"
                  aria-label="WhatsApp"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Человечный tagline с акцентом */}
            <div className="flex items-center gap-2">
              <div 
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: '#FFD100' }}
              />
              <span className="text-xs text-slate-500 font-medium">
                Сделано для автобизнеса с заботой
              </span>
            </div>
          </div>
          
          {/* Юридические реквизиты - в самый низ, мелко */}
          <div className="mt-4 pt-3 border-t border-slate-50">
            <p className="text-xs text-slate-400 text-center leading-relaxed">
              ИП Архипов Артём Сергеевич • ИНН: 235212599566 • ОГРНИП: 324237500196784
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;