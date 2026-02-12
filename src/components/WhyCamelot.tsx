import React, { useState, useEffect } from 'react';
import { Crown, GraduationCap, Users, Trophy, Calendar, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import testCenterBg from '@/assets/test-center-bg.jpg';

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
      bgImage: testCenterBg,
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
    }, 8000);
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

        {/* Carousel with arrows for both mobile and desktop */}
        <div className="relative max-w-6xl mx-auto">
          {/* Left Arrow */}
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 lg:-translate-x-6 z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center transition-all hover:bg-secondary hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-foreground" />
          </button>

          {/* Feature Cards */}
          <div className="overflow-hidden px-4 lg:px-0">
            <div
              className="transition-transform duration-300 ease-in-out flex"
              style={{ 
                transform: isMobile 
                  ? `translateX(-${currentIndex * 100}%)`
                  : `translateX(-${currentIndex * (100 / 3)}%)`
              }}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`${isMobile ? 'w-full' : 'w-1/3'} flex-shrink-0 px-2 lg:px-4`}
                >
                  <div 
                    className={`group text-center p-8 border border-border rounded-2xl shadow-card hover:shadow-elegant transition-all duration-300 hover:border-primary/50 hover-lift animate-scale-in relative overflow-hidden ${isVisible ? 'visible' : ''}`}
                    style={feature.bgImage ? {
                      backgroundImage: `url(${feature.bgImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    } : {}}
                  >
                    {feature.bgImage && (
                      <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" />
                    )}
                    {!feature.bgImage && <div className="absolute inset-0 bg-card" />}
                    <div className="relative z-10">
                      <div className="w-20 h-20 mx-auto royal-gradient rounded-full flex items-center justify-center shadow-royal group-hover:scale-110 transition-transform mb-6">
                        <feature.icon className="w-10 h-10 text-primary-foreground" />
                      </div>
                      <h3 className={`text-xl font-bold mb-3 ${feature.bgImage ? 'text-white' : 'text-foreground'}`}>{feature.title}</h3>
                      <p className={`leading-relaxed text-sm ${feature.bgImage ? 'text-white/90' : 'text-muted-foreground'}`}>{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 lg:translate-x-6 z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center transition-all hover:bg-secondary hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-foreground" />
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
      </div>
    </section>
  );
};

export default WhyCamelot;