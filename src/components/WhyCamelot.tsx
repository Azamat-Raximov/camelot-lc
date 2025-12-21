import React from 'react';
import { Crown, GraduationCap, Users, Trophy, Sparkles, Calendar, Building2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const WhyCamelot: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  const features = [
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
      icon: Trophy,
      title: t('why.testCenter.title'),
      description: t('why.testCenter.desc'),
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

        {/* Features Grid - Circular design */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
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
      </div>
    </section>
  );
};

export default WhyCamelot;
