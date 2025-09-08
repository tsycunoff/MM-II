
import React, { useState, useEffect, useRef } from 'react';
import { WhatsAppIcon } from './icons';

const Hero: React.FC<{ onTryFreeClick: () => void }> = ({ onTryFreeClick }) => {
  const [chatStep, setChatStep] = useState(0); // 0: initial, 1: show msg1, 2: show msg2, 3: show msg3
  const [isIslandExpanded, setIsIslandExpanded] = useState(false);
  const [islandContentVisible, setIslandContentVisible] = useState(false);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    const schedule = (fn: () => void, delay: number) => {
        timeouts.push(setTimeout(fn, delay));
    };

    const animateAndProceed = (nextStep: number) => {
        setIsIslandExpanded(true);
        schedule(() => setIslandContentVisible(true), 200);
        schedule(() => setIslandContentVisible(false), 1400);
        schedule(() => setIsIslandExpanded(false), 1600);
        schedule(() => setChatStep(nextStep), 1800);
    };

    if (chatStep === 0) {
        schedule(() => animateAndProceed(1), 1500);
    } else if (chatStep === 1) {
        schedule(() => animateAndProceed(2), 3000);
    } else if (chatStep === 2) {
        schedule(() => animateAndProceed(3), 3000);
    } else if (chatStep === 3) {
        schedule(() => setChatStep(0), 4000); // Loop back
    }
    
    return () => {
        timeouts.forEach(clearTimeout);
    };
  }, [chatStep]);
  
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col items-start text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-primary leading-tight md:leading-[1.1]">
              Повысьте рейтинг автосервиса и верните до 50% клиентов
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl mt-6">
              Motor Mind — автоматизированный сервис на базе WhatsApp для сбора отзывов, перехвата негатива и возврата клиентов на повторное обслуживание.
            </p>
            <div className="flex w-full items-center space-x-4 py-8">
              <button
                onClick={onTryFreeClick}
                className="inline-flex items-center justify-center rounded-md text-sm font-bold ring-offset-background transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 h-11 px-8 border-b-4 border-accent-dark active:border-b-0 active:translate-y-1"
              >
                Попробовать бесплатно
              </button>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-secondary h-11 px-8"
              >
                Как это работает
              </a>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
                <div className="flex -space-x-2 mr-2">
                    <div className="w-8 h-8 bg-slate-200 rounded-full border-2 border-white flex items-center justify-center text-slate-500 text-xs font-bold">A</div>
                    <div className="w-8 h-8 bg-slate-200 rounded-full border-2 border-white flex items-center justify-center text-slate-500 text-xs font-bold">B</div>
                    <div className="w-8 h-8 bg-slate-200 rounded-full border-2 border-white flex items-center justify-center text-slate-500 text-xs font-bold">C</div>
                </div>
                <span>Присоединились 150+ автосервисов</span>
            </div>
          </div>
          
          <div className="relative w-full max-w-sm mx-auto">
            <div className="relative bg-slate-900 p-1.5 rounded-[2.5rem] shadow-2xl border-4 border-slate-800">
                <div className="relative bg-white rounded-[2.2rem] overflow-hidden">
                    <div className={`absolute top-2.5 left-1/2 -translate-x-1/2 bg-black z-20 origin-top transition-all duration-300 ease-out ${
                        isIslandExpanded ? 'w-[170px] h-8' : 'w-24 h-5'
                    } rounded-full flex items-center justify-center px-2`}>
                        {islandContentVisible && (
                            <div className="flex items-center gap-2 text-white text-[10px] font-medium whitespace-nowrap animate-fade-in opacity-0" style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}>
                                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                    <WhatsAppIcon className="w-2.5 h-2.5 text-white" />
                                </div>
                                <span>Новое сообщение</span>
                            </div>
                        )}
                    </div>
                  
                  <div className="pt-12">
                      <div className="bg-slate-100 p-3 flex items-center gap-2">
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                            <WhatsAppIcon className="w-5 h-5 text-slate-600"/>
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-800">Ваш Автосервис</p>
                          <p className="text-xs text-slate-500">онлайн</p>
                        </div>
                      </div>
                      
                      <div className="p-4 space-y-3 bg-slate-50 min-h-[372px]">
                        <div className={`transform transition-all duration-500 ${chatStep >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                            <div className="bg-white p-3 rounded-xl rounded-bl-md max-w-[85%] shadow-sm border border-slate-100">
                            <p className="text-sm text-slate-800">Здравствуйте! Оцените, пожалуйста, качество нашего обслуживания от 1 до 5.</p>
                          </div>
                        </div>

                        <div className={`flex justify-end transform transition-all duration-500 ${chatStep >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                          <div className="bg-blue-500 text-white p-3 rounded-xl rounded-br-md shadow-sm max-w-[70%]">
                            <p className="text-sm">⭐⭐⭐⭐⭐</p>
                          </div>
                        </div>

                        <div className={`transform transition-all duration-500 ${chatStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                          <div className="bg-white p-3 rounded-xl rounded-bl-md max-w-[85%] shadow-sm border border-slate-100">
                            <p className="text-sm text-slate-800 mb-2">Спасибо! Будем рады, если оставите отзыв на Яндекс.Картах.</p>
                            <a href="#" className="text-sm text-blue-600 font-medium">Оставить отзыв</a>
                          </div>
                        </div>
                      </div>
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
