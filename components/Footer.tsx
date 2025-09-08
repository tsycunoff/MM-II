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
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <div className="flex items-center mb-8">
              <LogoIcon className="h-12 w-auto text-gray-900 mr-4" />
              <span className="text-2xl font-bold text-gray-900">Motor Mind</span>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-sm">
              Автоматизируем работу с клиентами для автосервисов через WhatsApp. 
              Увеличиваем количество положительных отзывов и возвращаем клиентов.
            </p>
            
            <div className="flex space-x-6">
              <a 
                href="#" 
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Telegram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Product */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                  Продукт
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#solution"
                      onClick={(e) => { e.preventDefault(); scrollToSection('#solution'); }}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Решения
                    </a>
                  </li>
                  <li>
                    <a
                      href="#how-it-works"
                      onClick={(e) => { e.preventDefault(); scrollToSection('#how-it-works'); }}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Как работает
                    </a>
                  </li>
                  <li>
                    <a
                      href="#results"
                      onClick={(e) => { e.preventDefault(); scrollToSection('#results'); }}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Результаты
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      onClick={(e) => { e.preventDefault(); scrollToSection('#pricing'); }}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Тарифы
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                  Компания
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      О нас
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Блог
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Карьера
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Контакты
                    </a>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                  Ресурсы
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#faq"
                      onClick={(e) => { e.preventDefault(); scrollToSection('#faq'); }}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Документация
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Помощь
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Статус системы
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                  Правовое
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Конфиденциальность
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Условия
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Оферта
                    </a>
                  </li>
                  <li>
                    <a href="mailto:legal@motormind.ru" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Правовые вопросы
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Motor Mind. Все права защищены.
            </p>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-6">
              <a 
                href="mailto:support@motormind.ru" 
                className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
              >
                support@motormind.ru
              </a>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500 text-sm">
                Сделано для автобизнеса
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;