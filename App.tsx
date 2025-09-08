import React, { useState, useCallback, memo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Problems from './components/Problems';
import Solution from './components/Solution';
import HowItWorks from './components/HowItWorks';
import Results from './components/Results';
import Features from './components/Features';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CallToAction from './components/CallToAction';
import SaaSDescription from './components/SaaSDescription';
import ScrollProgress from './components/ScrollProgress';
import AnchorNavigation from './components/AnchorNavigation';

const RequestFormModal: React.FC<{ onClose: () => void }> = memo(({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        telegram: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => {
            onClose();
        }, 2000);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div 
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-2xl duration-300 rounded-xl"
                onClick={e => e.stopPropagation()}
            >
                {isSuccess ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">Заявка отправлена!</h2>
                        <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время.</p>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                            <h2 className="text-xl font-bold leading-none tracking-tight text-primary">Заявка на подключение</h2>
                            <p className="text-sm text-muted-foreground">Оставьте ваши данные, и мы свяжемся с вами в течение часа.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="grid gap-6 py-4">
                            <div className="grid gap-2">
                                <label htmlFor="name" className="text-sm font-medium text-foreground">Имя *</label>
                                <input 
                                    id="name" 
                                    name="name" 
                                    required 
                                    value={formData.name} 
                                    onChange={handleInputChange} 
                                    className="h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all" 
                                    placeholder="Ваше имя" 
                                />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="phone" className="text-sm font-medium text-foreground">Телефон *</label>
                                <input 
                                    id="phone" 
                                    name="phone" 
                                    type="tel" 
                                    required 
                                    value={formData.phone} 
                                    onChange={handleInputChange} 
                                    className="h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all" 
                                    placeholder="+7 (999) 123-45-67" 
                                />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                                <input 
                                    id="email" 
                                    name="email" 
                                    type="email" 
                                    value={formData.email} 
                                    onChange={handleInputChange} 
                                    className="h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all" 
                                    placeholder="your@email.com" 
                                />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="telegram" className="text-sm font-medium text-foreground">Telegram</label>
                                <input 
                                    id="telegram" 
                                    name="telegram" 
                                    value={formData.telegram} 
                                    onChange={handleInputChange} 
                                    className="h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all" 
                                    placeholder="@username" 
                                />
                            </div>
                        
                            <div className="pt-2">
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting} 
                                    className="inline-flex items-center justify-center rounded-lg text-base font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-yellow-400 text-blue-900 hover:bg-yellow-500 h-12 px-6 w-full shadow-lg group"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Отправляем...
                                        </div>
                                    ) : (
                                        <>
                                            <span>Отправить заявку</span>
                                            <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                        <button 
                            onClick={onClose} 
                            className="absolute right-4 top-4 rounded-lg opacity-70 ring-offset-background transition-all hover:opacity-100 hover:bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none" 
                            aria-label="Закрыть"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
});
RequestFormModal.displayName = 'RequestFormModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <div className="bg-background font-sans text-foreground antialiased">
      <ScrollProgress />
      <Header onConnectClick={openModal} />
      <AnchorNavigation />
      <main>
        <Hero onTryFreeClick={openModal} />
        <Problems />
        <Solution />
        <HowItWorks />
        <Results />
        <SaaSDescription />
        <Features />
        <Pricing onConnectClick={openModal} />
        <FAQ />
        <CallToAction onConnectClick={openModal} />
      </main>
      <Footer />
      {isModalOpen && <RequestFormModal onClose={closeModal} />}
    </div>
  );
};

export default App;