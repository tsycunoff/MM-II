
import React, { useState, useEffect, useRef } from 'react';

const StatCard: React.FC<{
  value: string;
  label: string;
  description: string;
  isVisible: boolean;
  delay: number;
}> = ({ value, label, description, isVisible, delay }) => {
  return (
    <div
      className={`bg-primary-card rounded-lg p-6 text-center transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-5xl lg:text-6xl font-extrabold text-white">{value}</div>
      <h3 className="text-md font-semibold text-white mt-3">{label}</h3>
      <p className="text-sm text-white/70 mt-1">{description}</p>
    </div>
  );
};

const Results: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const resultsData = [
    { value: '×3', label: 'рост числа отзывов', description: 'на Яндекс.Картах и 2ГИС' },
    { value: '+1.2', label: 'пункта к рейтингу', description: 'в среднем, что выводит сервис в топ' },
    { value: '54-68%', label: 'клиентов отвечают', description: 'на запрос в WhatsApp, в отличие от 5% в email' },
    { value: '+36%', label: 'возвратов на ТО', description: 'за счёт доверия и автоматических напоминаний' },
  ];

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
    <section ref={sectionRef} id="results" className="py-20 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter">
            Результаты, которые говорят сами за себя
          </h2>
          <p className="text-lg text-white/70 mt-4">
            Наши клиенты видят рост ключевых показателей уже в первый месяц использования Motor Mind.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resultsData.map((result, index) => (
            <StatCard
              key={index}
              {...result}
              isVisible={isInView}
              delay={150 * (index + 1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;