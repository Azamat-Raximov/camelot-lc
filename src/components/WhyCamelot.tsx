import React, { useState, useEffect } from 'react';
import { Crown, GraduationCap, Users, Trophy, Calendar, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const WhyCamelot: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const features = [
    {
      icon: Trophy,
      title: t('why.testCenter.title'),
      description: t('why.testCenter.desc'),
    },
    {
      icon: Users,
      title: t('why.freeTeacher.title'),
      description: t('why.freeTeacher.desc'),
    },
    {
      icon: Calendar,
      title: t('why.events.title'),
      description: t('why.events.desc'),
    },
    {
      icon: GraduationCap,
      title: t('why.teachers.title'),
      description: t('why.teachers.desc'),
    },
    {
      icon: Building2,
      title: t('why.coworking.title'),
      description: t('why.coworking.desc'),
    },
  ];

  const goNext = () => {
    setCurrentIndex((prev) => (prev >= features.length - 1 ? 0 : prev + 1));
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? features.length - 1 : prev - 1));
  };

  // Auto-play every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= features.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section id="why-camelot" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <Badge variant="secondary" className="mb-4 px-4 py-1.5">
            <Crown className="w-4 h-4 mr-2" />
            Camelot LC
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('why.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('why.subtitle')}
          </p>
        </div>

        {/* Mobile Carousel */}
        {isMobile ? (
          <div className="relative max-w-sm mx-auto">
            {/* Left Arrow */}
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center transition-all ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:bg-secondary hover:scale-110'
              }`}
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            {/* Feature Card */}
            <div className="overflow-hidden">
              <div
                className="transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                <div className="flex">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 px-2"
                    >
                      <div className="group text-center p-8 bg-card border border-border rounded-2xl shadow-card">
                        <div className="w-20 h-20 mx-auto royal-gradient rounded-full flex items-center justify-center shadow-royal mb-6">
                          <feature.icon className="w-10 h-10 text-primary-foreground" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={goNext}
              disabled={currentIndex >= features.length - 1}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center transition-all ${
                currentIndex >= features.length - 1
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:bg-secondary hover:scale-110'
              }`}
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {features.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'bg-primary w-6'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Desktop Grid - Show only 3 at a time */
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.slice(currentIndex, currentIndex + 3).map((feature, index) => (
              <div
                key={currentIndex + index}
                className={`group text-center p-8 bg-card border border-border rounded-2xl shadow-card hover:shadow-elegant transition-all duration-300 hover:border-primary/50 hover-lift animate-scale-in ${isVisible ? 'visible' : ''} stagger-${index + 1}`}
              >
                <div className="w-20 h-20 mx-auto royal-gradient rounded-full flex items-center justify-center shadow-royal group-hover:scale-110 transition-transform mb-6">
                  <feature.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyCamelot;