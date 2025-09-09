import React, { useState, useEffect, useRef } from 'react';
import { NotificationIcon, BirthdayIcon, ChartIcon } from './icons';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  benefit: string;
  isVisible: boolean;
  delay: number;
}> = ({ icon, title, description, benefit, isVisible, delay }) => (
  <div
    className={`group relative bg-white rounded-xl p-6 md:p-8 border border-slate-200 transition-all duration-700 ease-out transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:border-slate-300 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    }`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {/* Icon with brand colors */}
    <div 
      className="inline-flex w-14 h-14 rounded-xl items-center justify-center mb-6 text-white shadow-lg transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-3"
      style={{ background: 'linear-gradient(135deg, #0D2C54, #1a3a6b)' }}
    >
      {icon}
    </div>
    
    <h3 className="text-lg font-bold text-[#0D2C54] mb-3 group-hover:scale-105 transition-transform duration-500">
      {title}
    </h3>
    
    <p className="text-sm text-muted-foreground leading-relaxed mb-4 group-hover:text-slate-600 transition-colors duration-500">
      {description}
    </p>

    {/* Benefit highlight */}
    <div className="flex items-start gap-2">
      <div 
        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
        style={{ backgroundColor: '#FFD100' }}
      />
      <p className="text-xs text-[#0D2C54] font-semibold leading-relaxed">
        {benefit}
      </p>
    </div>

    {/* Subtle accent line */}
    <div 
      className="absolute bottom-0 left-1/2 w-0 h-0.5 -translate-x-1/2 group-hover:w-16 transition-all duration-700 rounded-full"
      style={{ backgroundColor: '#FFD100' }}
    />

    {/* Hover glow */}
    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
      <div 
        className="absolute inset-0 rounded-xl blur-xl transform scale-110"
        style={{ background: 'radial-gradient(circle at 30% 30%, rgba(13, 44, 84, 0.1), transparent 70%)' }}
      />
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <NotificationIcon className="w-7 h-7"/>,
      title: 'Сервисные уведомления',
      description: 'Автоматически информируйте клиентов о каждом этапе ремонта через WhatsApp.',
      benefit: 'Клиенты всегда в курсе → больше доверия → больше возвратов'
    },
    {
      icon: <BirthdayIcon className="w-7 h-7"/>,
      title: 'Триггерные рассылки',
      description: 'Умные напоминания о ТО, поздравления и возврат "потерянных" клиентов.',
      benefit: 'Автоматический возврат клиентов → +30% к повторным визитам'
    },
    {
      icon: <ChartIcon className="w-7 h-7"/>,
      title: 'Панель аналитики',
      description: 'Отслеживайте все метрики: отзывы, рейтинг, перехваченный негатив.',
      benefit: 'Понимание бизнеса → правильные решения → рост прибыли'
    },
  ];

  return (
    <section ref={sectionRef} id="features" className="py-20 md:py-24 bg-secondary relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-6">
            <span className="text-sm font-medium text-[#0D2C54] uppercase tracking-wide">Тариф Pro</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-primary leading-tight mb-6">
            Больше, чем просто отзывы:{' '}
            <span 
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #FFD100 0%, #E6B800 100%)' }}
            >
              полная автоматизация
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            <span className="text-primary font-semibold">Motor Mind Pro</span> — это полноценная платформа для удержания и возврата клиентов, которая работает на вас 24/7.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-16">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              {...feature}
              isVisible={isInView}
              delay={100 * (index + 1)}
            />
          ))}
        </div>

        {/* Premium bottom section */}
        <div className={`text-center transition-all duration-1000 delay-500 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-sm max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#FFD100' }}
              >
                <svg className="w-5 h-5 text-[#0D2C54]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary">
                Все включено в тариф Pro
              </h3>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Получите полный контроль над клиентским опытом: от первого визита до постоянного возврата. 
              Автоматизация, которая работает даже когда вы спите.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="#pricing"
                className="inline-flex items-center gap-2 justify-center rounded-md text-sm font-bold h-11 px-6 transition-all duration-600 hover:scale-105"
                style={{ 
                  backgroundColor: '#FFD100',
                  color: '#0D2C54',
                  boxShadow: '0 3px 0 #E6B800'
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translateY(1px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 2px 0 #E6B800';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 3px 0 #E6B800';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 3px 0 #E6B800';
                }}
              >
                Смотреть тарифы
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </a>
              
              <a 
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-md text-sm font-semibold h-11 px-6 border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-600"
              >
                Как это работает
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;