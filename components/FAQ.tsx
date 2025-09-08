
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
    question: 'Насколько сложно обучить персонал?',
    answer: 'Система работает полностью автоматически. Персоналу нужно только научиться реагировать на уведомления о негативных отзывах, что занимает не более 15 минут. Мы предоставляем все необходимые инструкции.'
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
}> = ({ item, isOpen, onClick }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-4"
        aria-expanded={isOpen}
      >
        <h3 className="text-md font-medium text-foreground">
          {item.question}
        </h3>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            <path d="m6 9 6 6 6-6"></path>
        </svg>
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
        }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <p className="text-muted-foreground text-sm pb-4">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-24 bg-secondary">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-primary">
            Часто задаваемые вопросы
          </h2>
        </div>
        <div>
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;