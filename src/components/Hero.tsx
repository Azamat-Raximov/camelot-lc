import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/hero-students.jpg';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Students learning at Camelot LC"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 lg:py-40">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-primary-foreground/90 text-sm font-medium">
              Guliston, Sirdaryo
            </span>
          </div>

          {/* Motto */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            WISDOM - IS DOING!
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button
              onClick={() => scrollToSection('#courses')}
              size="lg"
              className="gold-gradient text-accent-foreground hover:opacity-90 shadow-lg group px-8 py-6 text-lg font-semibold animate-pulse-glow"
            >
              {t('hero.cta')}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => scrollToSection('#contact')}
              size="lg"
              variant="outline"
              className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 backdrop-blur-sm px-8 py-6 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              {t('hero.contact')}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
