import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, Award, ThumbsUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const CountUp: React.FC<{ end: number; suffix?: string; duration?: number }> = ({ 
  end, 
  suffix = '', 
  duration = 2000 
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [hasStarted, end, duration]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-foreground mb-2">
      {count}{suffix}
    </div>
  );
};

const Results: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimationSimple();

  const stats = [
    {
      icon: Users,
      value: 2000,
      suffix: '+',
      label: t('results.students'),
      color: 'bg-primary/10 text-primary',
      dotColor: 'bg-primary',
    },
    {
      icon: Award,
      value: 2025,
      suffix: '',
      label: t('results.ielts'),
      color: 'bg-accent/20 text-accent-foreground',
      dotColor: 'bg-yellow-500',
    },
    {
      icon: TrendingUp,
      value: 5,
      suffix: '+',
      label: t('results.years'),
      color: 'bg-primary/10 text-primary',
      dotColor: 'bg-green-500',
    },
    {
      icon: ThumbsUp,
      value: 98,
      suffix: '%',
      label: t('results.satisfaction'),
      color: 'bg-accent/20 text-accent-foreground',
      dotColor: 'bg-orange-500',
    },
  ];

  return (
    <section id="results" className="py-16 lg:py-20 bg-background border-y border-border">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Stats Grid - Cambridge style */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`relative text-center animate-fade-in ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Colored dot indicator */}
              <div className={`absolute top-0 right-1/4 w-2 h-2 rounded-full ${stat.dotColor}`} />
              
              <CountUp end={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground font-medium text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Simple scroll animation hook
function useScrollAnimationSimple() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

export default Results;
