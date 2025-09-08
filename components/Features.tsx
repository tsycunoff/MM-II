
import React, { useState, useEffect, useRef } from 'react';
import { NotificationIcon, CrmIcon, BirthdayIcon, ChartIcon } from './icons';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  isVisible: boolean;
  delay: number;
}> = ({ icon, title, description, isVisible, delay }) => (
  <div
    className={`bg-card border rounded-lg p-6 transition-all duration-500 transform ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center bg-muted text-muted-foreground">
        {icon}
      </div>
      <div>
        <h3 className="text-md font-semibold text-card-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  </div>
);

const Features: React.FC = () => {
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

  const features = [
    {
      icon: <NotificationIcon className="w-5 h-5"/>,
      title: 'Сервисные уведомления',
      description: 'Автоматически информируйте клиентов о статусе ремонта: "Машина принята", "Запчасти заказаны", "Машина готова" и т.д.',
    },
    {
      icon: <BirthdayIcon className="w-5 h-5"/>,
      title: 'Триггерные рассылки',
      description: 'Напоминайте о ТО, поздравляйте с днём рождения и возвращайте "потерянных" клиентов с помощью умных сценариев.',
    },
    {
      icon: <ChartIcon className="w-5 h-5"/>,
      title: 'Панель аналитики',
      description: 'Отслеживайте ключевые метрики: количество отзывов, рейтинг, процент перехваченного негатива и возвраты клиентов.',
    },
  ];

  return (
    <section ref={sectionRef} id="features" className="py-20 md:py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-primary">
            Больше, чем просто отзывы (тариф Pro)
          </h2>
          <p className="text-lg text-muted-foreground mt-4">
            Motor Mind Pro — это полноценная платформа для удержания и возврата клиентов, которая работает на вас 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              {...feature}
              isVisible={isInView}
              delay={150 * (index + 1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;