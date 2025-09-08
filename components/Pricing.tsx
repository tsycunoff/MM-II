
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

  const Check = () => <CheckIcon className="w-4 h-4 text-green-500" />;
  const XMark = () => (
    <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  const plans = [
    {
      name: 'Start',
      description: 'Для быстрого старта и сбора отзывов.',
      price: { monthly: 3990, yearly: 2990 },
      features: [
        { text: 'Запрос отзывов через WhatsApp', included: true },
        { text: 'Перехват негатива в чат', included: true },
        { text: 'Ссылки на отзывы: Google / Яндекс / 2ГИС', included: true },
        { text: 'Настройка шаблонов сообщений', included: true },
        { text: 'Базовая аналитика', included: true },
        { text: 'Сервисные уведомления по этапам', included: false },
        { text: 'Интеграция с CRM / 1С', included: false },
        { text: 'Триггерные рассылки (ТО, winback)', included: false },
      ],
      popular: false,
    },
    {
      name: 'Pro',
      description: 'Для максимального возврата клиентов.',
      price: { monthly: 5990, yearly: 4490 },
      features: [
        { text: 'Запрос отзывов через WhatsApp', included: true },
        { text: 'Перехват негатива в чат', included: true },
        { text: 'Ссылки на отзывы: Google / Яндекс / 2ГИС', included: true },
        { text: 'Настройка шаблонов сообщений', included: true },
        { text: 'Расширенная аналитика', included: true },
        { text: 'Сервисные уведомления по этапам', included: true },
        { text: 'Интеграция с CRM / 1С', included: true },
        { text: 'Триггерные рассылки (ТО, winback)', included: true },
      ],
      popular: true,
    }
  ];

  return (
    <section ref={sectionRef} id="pricing" className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-primary">
            Прозрачные тарифы без скрытых платежей
          </h2>
          <p className="text-lg text-muted-foreground mt-4">
            Выберите план, который подходит вашему бизнесу. Запуск за 24 часа.
          </p>
        </div>

        <div className="flex justify-center mb-8">
            <div className="inline-flex items-center p-1 rounded-lg bg-muted">
                <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${billingCycle === 'monthly' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground'}`}
                >
                Месяц
                </button>
                <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors relative ${billingCycle === 'yearly' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground'}`}
                >
                Год
                 <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">-25%</span>
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`border rounded-lg p-8 flex flex-col transition-all duration-500 transform ${
                plan.popular ? 'border-primary' : ''
              } ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${150 * (index + 1)}ms` }}
            >
              {plan.popular && <div className="text-xs font-semibold text-primary mb-2">РЕКОМЕНДУЕМ</div>}
              <h3 className="text-xl font-bold text-primary">{plan.name}</h3>
              <p className="text-muted-foreground mt-2 flex-grow">{plan.description}</p>
              
              <div className="my-8">
                <span className="text-4xl font-extrabold text-primary">{plan.price[billingCycle].toLocaleString()}₽</span>
                <span className="text-muted-foreground">/мес.</span>
                {billingCycle === 'yearly' && <p className="text-sm text-muted-foreground mt-1">Оплата за год</p>}
              </div>

              <ul className="space-y-3 text-sm mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    {feature.included ? <Check /> : <XMark />}
                    <span className={`ml-2 ${feature.included ? 'text-foreground' : 'text-muted-foreground line-through'}`}>{feature.text}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onConnectClick}
                className={`w-full mt-auto inline-flex items-center justify-center rounded-md text-sm font-bold h-10 px-4 py-2 ring-offset-background transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  plan.popular 
                  ? 'bg-accent text-accent-foreground hover:bg-accent/90 border-b-4 border-accent-dark active:border-b-0 active:translate-y-1' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                Выбрать {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;