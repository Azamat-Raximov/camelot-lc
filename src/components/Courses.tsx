import React from 'react';
import { BookOpen, Target, Award, Clock, BarChart3, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Courses: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  const courses = [
    {
      icon: BookOpen,
      title: t('courses.general.title'),
      description: t('courses.general.desc'),
      duration: '3-6 oy',
      level: 'A1 - C1',
      iconColor: 'bg-primary/10 text-primary',
      cardGradient: 'bg-gradient-to-br from-[hsl(217,78%,41%)] via-[hsl(217,78%,51%)] to-[hsl(217,78%,61%)]',
    },
    {
      icon: Target,
      title: t('courses.ielts.title'),
      description: t('courses.ielts.desc'),
      duration: '2-4 oy',
      level: 'B1 - C2',
      iconColor: 'bg-orange-500/10 text-orange-500',
      cardGradient: 'bg-gradient-to-br from-[hsl(25,95%,50%)] via-[hsl(30,95%,55%)] to-[hsl(35,95%,60%)]',
    },
    {
      icon: Award,
      title: t('courses.cefr.title'),
      description: t('courses.cefr.desc'),
      duration: '1-3 oy',
      level: 'A1 - C2',
      iconColor: 'bg-purple-500/10 text-purple-500',
      cardGradient: 'bg-gradient-to-br from-[hsl(270,70%,50%)] via-[hsl(280,70%,55%)] to-[hsl(290,70%,60%)]',
    },
    {
      icon: GraduationCap,
      title: t('courses.sat.title'),
      description: t('courses.sat.desc'),
      duration: '3-6 oy',
      level: 'All Levels',
      iconColor: 'bg-emerald-500/10 text-emerald-500',
      cardGradient: 'bg-gradient-to-br from-[hsl(160,70%,40%)] via-[hsl(170,70%,45%)] to-[hsl(180,70%,50%)]',
    },
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="courses" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <Badge variant="secondary" className="mb-4 px-4 py-1.5">
            <BookOpen className="w-4 h-4 mr-2" />
            {t('nav.courses')}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('courses.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('courses.subtitle')}
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <Card
              key={index}
              onClick={scrollToContact}
              className={`group ${course.cardGradient} border-0 transition-all duration-300 shadow-card hover:shadow-elegant overflow-hidden hover-lift animate-scale-in cursor-pointer ${isVisible ? 'visible' : ''} stagger-${index + 1}`}
            >
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <course.icon className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">{course.title}</CardTitle>
                <CardDescription className="text-white/80 leading-relaxed">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 pt-4 border-t border-white/20">
                  <div className="flex items-center gap-2 text-white/80">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <BarChart3 className="w-4 h-4" />
                    <span className="text-sm">{course.level}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
