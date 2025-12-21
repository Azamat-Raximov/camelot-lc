import React from 'react';
import { Crown, GraduationCap, Users, Trophy, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const WhyCamelot: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: GraduationCap,
      title: t('why.quality.title'),
      description: t('why.quality.desc'),
    },
    {
      icon: Users,
      title: t('why.teachers.title'),
      description: t('why.teachers.desc'),
    },
    {
      icon: Sparkles,
      title: t('why.environment.title'),
      description: t('why.environment.desc'),
    },
    {
      icon: Trophy,
      title: t('why.results.title'),
      description: t('why.results.desc'),
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
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

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex gap-5 p-6 bg-card border border-border rounded-2xl shadow-card hover:shadow-elegant transition-all duration-300 hover:border-primary/50"
            >
              <div className="w-14 h-14 shrink-0 royal-gradient rounded-xl flex items-center justify-center shadow-royal group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCamelot;
