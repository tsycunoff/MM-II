import React, { useState, useEffect } from 'react';
import { WhatsAppIcon } from './icons';

const Hero: React.FC<{ onTryFreeClick: () => void }> = ({ onTryFreeClick }) => {
  const [chatStep, setChatStep] = useState(0);
  const [isIslandExpanded, setIsIslandExpanded] = useState(false);
  const [islandContentVisible, setIslandContentVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const timeouts: NodeJS.Timeout[] = [];
    const schedule = (fn: () => void, delay: number) => {
        timeouts.push(setTimeout(fn, delay));
    };

    const animateAndProceed = (nextStep: number) => {
        setIsIslandExpanded(true);
        schedule(() => setIslandContentVisible(true), 300);
        schedule(() => setIslandContentVisible(false), 2000);
        schedule(() => setIsIslandExpanded(false), 2300);
        schedule(() => setChatStep(nextStep), 2500);
    };

    if (chatStep === 0) {
        schedule(() => animateAndProceed(1), 1000);
    } else if (chatStep === 1) {
        schedule(() => animateAndProceed(2), 2500);
    } else if (chatStep === 2) {
        schedule(() => animateAndProceed(3), 2500);
    } else if (chatStep === 3) {
        schedule(() => setChatStep(0), 3000);
    }
    
    return () => {
        timeouts.forEach(clearTimeout);
    };
  }, [chatStep]);
  
  return (
    <section className="relative w-full py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Улучшенный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-96 h-96 bg-yellow-100/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={`flex flex-col items-start text-left transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.9] mb-8" style={{ color: '#1E3A5F' }}>
              <span className="block">Повысьте рейтинг</span>
              <span className="block">автосервиса</span>
              <span className="block">и верните до</span>
              <span className="inline-block text-yellow-500 relative">
                50%
                <svg className="absolute -bottom-2 left-0 w-full h-4 text-yellow-300" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0,6 Q25,2 50,4 T100,3" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.7"/>
                </svg>
              </span>
              <span className="block">клиентов</span>
            </h1>
            
            <p className="max-w-xl text-slate-600 text-xl leading-relaxed mb-10">
              <span className="font-semibold text-slate-900">Motor Mind</span> — автоматизированный сервис для сбора отзывов, перехвата негатива и возврата клиентов.
            </p>
            
            <div className="flex flex-col sm:flex-row w-full items-start sm:items-center gap-6 mb-12">
              <button
                onClick={onTryFreeClick}
                className="group inline-flex items-center justify-center rounded-xl text-lg font-bold transition-all duration-300 bg-yellow-400 text-slate-900 hover:bg-yellow-500 hover:shadow-xl h-14 px-10 shadow-lg transform hover:scale-105"
              >
                <span>Демо за 15 минут</span>
                <svg className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-xl text-lg font-medium transition-all duration-300 border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-slate-50 text-slate-900 h-14 px-8 group"
              >
                <span>Как это работает</span>
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
            
            <div className="flex items-center text-sm text-slate-600">
              <div className="flex -space-x-2 mr-4">
                {/* Логотипы автосервисов с fallback на A B C */}
                <div className="w-12 h-12 bg-white rounded-full border-3 border-white shadow-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://pnevmopodveska1.ru/template/img/logo-footer.svg" 
                    alt="Автосервис"
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling!.className = 'w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold';
                      (target.nextElementSibling as HTMLElement)!.textContent = 'A';
                    }}
                  />
                  <div style={{ display: 'none' }}></div>
                </div>
                <div className="w-12 h-12 bg-white rounded-full border-3 border-white shadow-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://zfcenter.ru/sites/default/files/logo_1.png" 
                    alt="Автосервис"
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling!.className = 'w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-lg font-bold';
                      (target.nextElementSibling as HTMLElement)!.textContent = 'B';
                    }}
                  />
                  <div style={{ display: 'none' }}></div>
                </div>
                <div className="w-12 h-12 bg-white rounded-full border-3 border-white shadow-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://fogel.com.ru/images/logo.png" 
                    alt="Автосервис"
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling!.className = 'w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-lg font-bold';
                      (target.nextElementSibling as HTMLElement)!.textContent = 'C';
                    }}
                  />
                  <div style={{ display: 'none' }}></div>
                </div>
                <div className="w-12 h-12 bg-slate-100 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                  <span className="text-slate-600 text-base font-bold">+</span>
                </div>
              </div>
              <span className="font-medium">Растущая сеть автосервисов</span>
            </div>
          </div>
          
          {/* iPhone 16 Pro с правильными пропорциями */}
          <div className={`relative w-full max-w-xs mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ animationDelay: '0.3s' }}>
            <div className="relative bg-slate-900 p-1 rounded-[3.5rem] shadow-2xl w-[320px] h-[680px] lg:w-[340px] lg:h-[720px]">
              <div className="relative bg-white rounded-[3.25rem] overflow-hidden h-full flex flex-col">
                {/* Dynamic Island */}
                <div className={`absolute top-3 left-1/2 transform -translate-x-1/2 bg-black z-20 transition-all duration-700 ease-out ${
                    isIslandExpanded ? 'w-48 h-9' : 'w-32 h-7'
                } rounded-full flex items-center justify-center px-3`}>
                    {islandContentVisible && (
                        <div className="flex items-center gap-2 text-white text-xs font-medium whitespace-nowrap animate-fade-in">
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                                <WhatsAppIcon className="w-3 h-3 text-white" />
                            </div>
                            <span>Новое сообщение</span>
                        </div>
                    )}
                </div>
                
                {/* WhatsApp Header */}
                <div className="bg-gradient-to-r from-slate-100 to-slate-50 p-4 flex items-center gap-3 border-b border-slate-200 flex-shrink-0 pt-12">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                      <WhatsAppIcon className="w-6 h-6 text-white"/>
                  </div>
                  <div>
                    <p className="font-bold text-base text-slate-800">Ваш Автосервис</p>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      онлайн
                    </p>
                  </div>
                </div>
                
                {/* Chat Messages - заполняет оставшееся пространство */}
                <div className="p-4 space-y-4 bg-gradient-to-b from-slate-50 to-slate-100 flex-1">
                  <div className={`transform transition-all duration-1000 ${chatStep >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                    <div className="bg-white p-4 rounded-2xl rounded-bl-lg max-w-[85%] shadow-sm border border-slate-200">
                      <p className="text-sm text-slate-800 leading-relaxed">Здравствуйте! Оцените, пожалуйста, качество нашего обслуживания от 1 до 5 ⭐</p>
                    </div>
                  </div>

                  <div className={`flex justify-end transform transition-all duration-1000 ${chatStep >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                    <div className="bg-blue-500 text-white p-4 rounded-2xl rounded-br-lg shadow-sm max-w-[75%]">
                      <p className="text-base font-medium">⭐⭐⭐⭐⭐</p>
                    </div>
                  </div>

                  <div className={`transform transition-all duration-1000 ${chatStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                    <div className="bg-white p-4 rounded-2xl rounded-bl-lg max-w-[85%] shadow-sm border border-slate-200">
                      <p className="text-sm text-slate-800 mb-3 leading-relaxed">Спасибо! Будем рады, если оставите отзыв на Яндекс.Картах 🙏</p>
                      <a href="#" className="inline-flex items-center gap-2 text-sm text-blue-600 font-medium bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                        <span>Оставить отзыв</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Home indicator */}
                <div className="flex justify-center py-2 flex-shrink-0">
                  <div className="w-32 h-1 bg-slate-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;