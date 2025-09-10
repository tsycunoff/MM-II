import React, { useState, useEffect, useRef } from 'react';
import { CheckIcon } from './icons';

const Pricing: React.FC<{ onConnectClick: () => void }> = ({ onConnectClick }) => {
  const [isInView, setIsInView] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const Check = () => (
    <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0D2C54' }}>
      <CheckIcon className="w-3 h-3 text-white" />
    </div>
  );
  
  const XMark = () => (
    <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
      <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  );

  const plans = [
    {
      name: 'Start',
      description: 'Для быстрого старта и сбора отзывов.',
      subtext: 'Все необходимое для работы с отзывами',
      price: { monthly: 3990, yearly: 2990 },
      originalPrice: { monthly: null, yearly: 3990 },
      features: [
        { text: 'Запрос отзывов через WhatsApp', included: true },
        { text: 'Перехват негатива в чат', included: true },
        { text: 'Ссылки на отзывы: Google / Яндекс / 2ГИС', included: true },
        { text: 'Интеграция с CRM / 1С', included: true },
        { text: 'Настройка шаблонов сообщений', included: true },
        { text: 'Базовая аналитика', included: true },
        { text: 'Расширенная аналитика', included: false },
        { text: 'Триггерные рассылки (ТО, winback)', included: false },
      ],
      popular: false,
      cta: 'Начать с Start'
    },
    {
      name: 'Pro',
      description: 'Для максимального возврата клиентов.',
      subtext: 'Полная автоматизация + возврат клиентов',
      price: { monthly: 5990, yearly: 4490 },
      originalPrice: { monthly: null, yearly: 5990 },
      features: [
        { text: 'Запрос отзывов через WhatsApp', included: true },
        { text: 'Перехват негатива в чат', included: true },
        { text: 'Ссылки на отзывы: Google / Яндекс / 2ГИС', included: true },
        { text: 'Расширенная интеграция с CRM / 1С', included: true },
        { text: 'Настройка шаблонов сообщений', included: true },
        { text: 'Базовая аналитика', included: true },
        { text: 'Расширенная аналитика', included: true },
        { text: 'Триггерные рассылки (ТО, winback, ДР)', included: true },
      ],
      popular: true,
      cta: 'Выбрать Pro'
    }
  ];

  return (
    <section ref={sectionRef} id="pricing" className="py-20 md:py-24 bg-background relative overflow-hidden">
      
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full" style={{ background: 'linear-gradient(45deg, #0D2C54, #FFD100)' }}></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full" style={{ background: 'linear-gradient(135deg, #FFD100, #0D2C54)' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-primary leading-tight">
            Прозрачные тарифы
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {" "}без скрытых платежей
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
            Выберите план, который подходит вашему бизнесу.
          </p>
          <p className="text-sm text-muted-foreground mt-3">
            Запуск за 24 часа
          </p>
          
          {/* Value props */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FFD100' }}></div>
              <span>Без долгосрочных договоров</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FFD100' }}></div>
              <span>Персональный менеджер</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FFD100' }}></div>
              <span>30 дней тестового периода</span>
            </div>
          </div>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center p-1.5 rounded-xl bg-slate-100 shadow-inner">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${
                billingCycle === 'monthly' 
                ? 'bg-white text-primary shadow-sm transform scale-105' 
                : 'text-slate-600 hover:text-primary'
              }`}
            >
              Месяц
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300 relative ${
                billingCycle === 'yearly' 
                ? 'bg-white text-primary shadow-sm transform scale-105' 
                : 'text-slate-600 hover:text-primary'
              }`}
            >
              Год
              <span 
                className="absolute -top-2 -right-2 text-[10px] px-2 py-1 rounded-full font-bold text-primary shadow-md"
                style={{ backgroundColor: '#FFD100' }}
              >
                -25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl p-6 lg:p-8 flex flex-col transition-all duration-700 transform hover:scale-[1.02] ${
                plan.popular 
                ? 'border-2 shadow-2xl shadow-primary/10' 
                : 'border border-slate-200 shadow-lg hover:shadow-xl'
              } ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ 
                transitionDelay: `${150 * (index + 1)}ms`,
                borderColor: plan.popular ? '#0D2C54' : undefined
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div 
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-xs font-bold text-primary shadow-lg"
                  style={{ backgroundColor: '#FFD100' }}
                >
                  РЕКОМЕНДУЕМ
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-extrabold text-primary mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-base mb-1">{plan.description}</p>
                <p className="text-sm text-slate-500">{plan.subtext}</p>
              </div>
              
              {/* Pricing */}
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-extrabold text-primary">
                    {plan.price[billingCycle].toLocaleString()}
                  </span>
                  <span className="text-lg text-muted-foreground">₽</span>
                  <span className="text-muted-foreground">/мес.</span>
                </div>
                
                {billingCycle === 'yearly' && plan.originalPrice.yearly && (
                  <div className="mt-2">
                    <span className="text-sm text-slate-400 line-through">
                      {plan.originalPrice.yearly.toLocaleString()}₽/мес.
                    </span>
                    <span className="ml-2 text-sm font-semibold" style={{ color: '#0D2C54' }}>
                      Экономия {((plan.originalPrice.yearly - plan.price.yearly) * 12).toLocaleString()}₽/год
                    </span>
                  </div>
                )}
                
                {billingCycle === 'yearly' && (
                  <p className="text-sm text-muted-foreground mt-2">
                    При оплате за год • {(plan.price.yearly * 12).toLocaleString()}₽
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 text-sm mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {feature.included ? <Check /> : <XMark />}
                    <span className={`leading-relaxed ${
                      feature.included ? 'text-slate-700' : 'text-slate-400 line-through'
                    }`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={onConnectClick}
                className={`w-full py-4 px-6 rounded-xl text-base font-bold transition-all duration-300 transform hover:scale-[1.02] focus:scale-[1.02] shadow-lg ${
                  plan.popular 
                  ? 'text-primary hover:shadow-xl active:scale-[0.98]' 
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 hover:border-slate-300'
                }`}
                style={plan.popular ? { 
                  backgroundColor: '#FFD100',
                  boxShadow: '0 8px 25px rgba(255, 209, 0, 0.4)'
                } : undefined}
              >
                {plan.cta}
              </button>
              
              {plan.popular && (
                <p className="text-center text-xs text-slate-500 mt-3">
                  Запуск за 24 часа • Поддержка 24/7
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Не уверены какой план выбрать? 
            <button 
              onClick={onConnectClick}
              className="ml-1 font-semibold text-primary hover:underline"
            >
              Получите бесплатную консультацию
            </button>
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            <span>✓ Помощь в выборе тарифа</span>
            <span>✓ Демонстрация возможностей</span>
            <span>✓ Расчет ROI для вашего сервиса</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;