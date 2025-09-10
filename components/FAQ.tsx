import React, { useState, useEffect, useRef } from 'react';

const faqData = [
  {
    question: 'Как быстро происходит подключение?',
    answer: 'Подключение и базовая настройка занимают не более 24 часов. Мы предоставляем персонального менеджера, который поможет на всех этапах.'
  },
  {
    question: 'Нужно ли мне интегрировать сервис с моей CRM?',
    answer: 'Интеграция не обязательна для тарифа Start, но рекомендуется для тарифа Pro, чтобы автоматизировать сервисные уведомления и триггерные рассылки. Мы поддерживаем большинство популярных CRM и 1С.'
  },
  {
    question: 'Что будет, если клиент поставит плохую оценку?',
    answer: 'Если оценка ниже 5 звезд, система не отправит клиента на карты. Вместо этого, менеджер вашего автосервиса получит мгновенное уведомление. Это позволяет оперативно связаться с клиентом и решить проблему до того, как она станет публичной.'
  },
  {
    question: 'Сколько клиентов реально отвечают в WhatsApp?',
    answer: 'В среднем 54-68% клиентов отвечают на сообщения в WhatsApp, что в 10 раз выше, чем отклик по email (5-7%). WhatsApp воспринимается как личное общение, поэтому люди охотнее идут на контакт.'
  },
  {
    question: 'Какие затраты помимо подписки?',
    answer: 'Никаких дополнительных затрат нет. Стоимость WhatsApp Business API входит в тариф. Вы платите только фиксированную ежемесячную сумму, независимо от количества сообщений и клиентов.'
  },
  {
    question: 'Насколько сложно обучить персонал?',
    answer: 'Система работает полностью автоматически. Персоналу нужно только научиться реагировать на уведомления о негативных отзывах, что занимает не более 15 минут. Мы предоставляем все необходимые инструкции.'
  },
  {
    question: 'Что если у меня маленький автосервис?',
    answer: 'Motor Mind одинаково эффективен для СТО с 5 постами и крупных сетей. Даже 10-15 дополнительных положительных отзывов в месяц кардинально улучшат вашу репутацию в картах и привлекут новых клиентов.'
  },
  {
    question: 'Есть ли гарантия возврата денег?',
    answer: 'Да, мы предоставляем 100% гарантию возврата денег в течение 14 дней. Если Motor Mind не оправдает ваши ожидания, мы вернем всю сумму без вопросов и объяснений.'
  },
  {
    question: 'Могу ли я отменить подписку в любое время?',
    answer: 'Да, вы можете отменить подписку в любой момент без каких-либо штрафов. У нас нет долгосрочных договоров, и мы ценим вашу свободу выбора.'
  },
];

const FAQItem: React.FC<{
  item: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
  isVisible: boolean;
  delay: number;
}> = ({ item, isOpen, onClick, isVisible, delay }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className={`border-b border-border/50 transition-all duration-600 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-6 md:py-8 group hover:bg-background/50 transition-colors duration-300 rounded-lg px-2 -mx-2"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg md:text-xl font-bold text-primary group-hover:text-primary/90 transition-colors duration-300 pr-4">
          {item.question}
        </h3>
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-all duration-300">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={`text-primary transition-transform duration-600 ease-out ${isOpen ? 'rotate-180' : ''}`}
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </div>
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
        }}
        className="overflow-hidden transition-all duration-600 ease-out"
      >
        <div className="pb-6 md:pb-8 pr-12">
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="py-20 md:py-24 bg-secondary">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className={`text-center mb-16 md:mb-20 transition-all duration-600 ease-out transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter text-primary leading-tight">
            Часто задаваемые вопросы
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            Ответы на самые важные вопросы о Motor Mind
          </p>
        </div>

        <div className="bg-background rounded-2xl shadow-sm border border-border/30 p-6 md:p-8 lg:p-10">
          <div className="space-y-0">
            {faqData.map((item, index) => (
              <FAQItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                isVisible={isInView}
                delay={100 + (150 * index)}
              />
            ))}
          </div>
        </div>

        <div className={`text-center mt-12 transition-all duration-600 ease-out transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`} style={{ transitionDelay: '800ms' }}>
          <p className="text-muted-foreground">
            Не нашли ответ на свой вопрос?{' '}
            <a 
              href="#" 
              className="font-semibold text-primary hover:text-primary/80 transition-colors duration-300"
            >
              Свяжитесь с нами
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;