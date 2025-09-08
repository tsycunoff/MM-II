
import React, { useState, useEffect, useRef } from 'react';
import { WhatsAppIcon, StarIcon, MessageSquareIcon } from './icons';

const HowItWorks: React.FC = () => {
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

  const steps = [
    {
      icon: WhatsAppIcon,
      title: 'Запрос обратной связи в WhatsApp',
      description: 'После обслуживания клиент получает автоматическое сообщение с просьбой оценить визит.',
    },
    {
      icon: StarIcon,
      title: 'Клиент ставит оценку',
      description: 'Простой отправкой оценки от 1 до 5 звёзд.',
    },
    {
      icon: MessageSquareIcon,
      title: 'Магия Motor Mind',
      description: '5★: Клиент получает ссылку для публикации отзыва. 1-4★: Клиент попадает в чат с менеджером для решения проблемы.',
    }
  ];

  return (
    <section ref={sectionRef} id="how-it-works" className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-primary">
            Как это работает? Проще некуда!
          </h2>
          <p className="text-lg text-muted-foreground mt-4">
            Весь процесс полностью автоматизирован и занимает у клиента не больше минуты.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Connector */}
          <div className="absolute left-1/2 top-5 h-[calc(100%-2.5rem)] w-px bg-border -translate-x-1/2 hidden md:block" aria-hidden="true"></div>

          <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-3 md:gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-500 transform ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${150 * (index + 1)}ms` }}
              >
                <div className="relative inline-flex">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-muted mb-4">
                    <step.icon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-md font-semibold text-card-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
