import React from 'react';
import { Users, Award, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import teacher1 from '@/assets/teacher-1.jpg';
import teacher2 from '@/assets/teacher-2.jpg';
import teacher3 from '@/assets/teacher-3.jpg';

const Teachers: React.FC = () => {
  const { t, language } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  const teachers = [
    {
      name: 'Nilufar Karimova',
      role: language === 'uz' ? 'IELTS Mutaxassisi' : 'IELTS Specialist',
      experience: 8,
      image: teacher1,
      certification: 'CELTA',
    },
    {
      name: 'Jasur Tursunov',
      role: language === 'uz' ? 'General English' : 'General English',
      experience: 6,
      image: teacher2,
      certification: 'TESOL',
    },
    {
      name: 'Madina Rahimova',
      role: language === 'uz' ? 'CEFR Ekspert' : 'CEFR Expert',
      experience: 10,
      image: teacher3,
      certification: 'DELTA',
    },
  ];

  return (
    <section id="teachers" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <Badge variant="secondary" className="mb-4 px-4 py-1.5">
            <Users className="w-4 h-4 mr-2" />
            {t('nav.teachers')}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('teachers.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('teachers.subtitle')}
          </p>
        </div>

        {/* Teacher Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher, index) => (
            <Card
              key={index}
              className={`group bg-card border-border hover:border-primary/50 transition-all duration-300 shadow-card hover:shadow-elegant overflow-hidden hover-lift animate-scale-in ${isVisible ? 'visible' : ''} stagger-${index + 1}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="royal-gradient text-primary-foreground">
                    <Award className="w-3 h-3 mr-1" />
                    {teacher.certification}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-foreground mb-1">{teacher.name}</h3>
                <p className="text-primary font-medium mb-3">{teacher.role}</p>
                <div className="flex items-center justify-center gap-1 text-muted-foreground">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <span className="text-sm">
                    {teacher.experience} {t('teachers.experience')}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teachers;
