import React from 'react';
import { TrendingUp, Users, Award, ThumbsUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const Results: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Users,
      value: '500+',
      label: t('results.students'),
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: Award,
      value: '150+',
      label: t('results.ielts'),
      color: 'bg-accent/20 text-accent-foreground',
    },
    {
      icon: TrendingUp,
      value: '5+',
      label: t('results.years'),
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: ThumbsUp,
      value: '98%',
      label: t('results.satisfaction'),
      color: 'bg-accent/20 text-accent-foreground',
    },
  ];

  return (
    <section id="results" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-1.5">
            <TrendingUp className="w-4 h-4 mr-2" />
            {t('nav.results')}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('results.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('results.subtitle')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-2xl p-8 text-center shadow-card hover:shadow-elegant transition-all duration-300 hover:border-primary/50"
            >
              <div className={`w-16 h-16 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
