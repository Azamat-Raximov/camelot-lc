import React from 'react';
import { Users, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import teacherAhadbek from '@/assets/teacher-ahadbek.jpg';
import teacherJavlonbek from '@/assets/teacher-javlonbek.jpg';
import teacherZuhur from '@/assets/teacher-zuhur.jpg';
import teacherOzodbek from '@/assets/teacher-ozodbek.jpg';

interface Teacher {
  name: string;
  role: string;
  ieltsScore: string;
  image: string;
}

const Teachers: React.FC = () => {
  const { t, language } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  const teachers: Teacher[] = [
    {
      name: 'Ahadbek Odilbekov',
      role: language === 'uz' ? 'IELTS Ustozi' : 'IELTS Teacher',
      ieltsScore: '8.0',
      image: teacherAhadbek,
    },
    {
      name: 'Javlonbek Abdurazzoqov',
      role: language === 'uz' ? 'IELTS Ustozi' : 'IELTS Teacher',
      ieltsScore: '7.5',
      image: teacherJavlonbek,
    },
    {
      name: 'Mansurov Zuhur',
      role: language === 'uz' ? 'IELTS Ustozi' : 'IELTS Teacher',
      ieltsScore: '8.0',
      image: teacherZuhur,
    },
    {
      name: 'Ozodbek Qilichev',
      role: language === 'uz' ? 'IELTS Ustozi (Listening)' : 'IELTS Teacher (Listening)',
      ieltsScore: '8.5',
      image: teacherOzodbek,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {teachers.map((teacher, index) => (
            <Card
              key={teacher.name}
              className={`group bg-card border-border hover:border-primary/50 transition-all duration-300 shadow-card hover:shadow-elegant overflow-hidden hover-lift animate-scale-in ${isVisible ? 'visible' : ''} stagger-${index + 1}`}
            >
              <div className="relative overflow-hidden aspect-square md:aspect-[3/4]">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="royal-gradient text-primary-foreground">
                    <Award className="w-3 h-3 mr-1" />
                    IELTS {teacher.ieltsScore}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4 text-center">
                <h3 className="text-lg font-bold text-foreground mb-1">{teacher.name}</h3>
                <p className="text-primary font-medium text-sm">{teacher.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Teachers Text */}
        <div className="text-center mt-12">
          <p className="text-xl font-semibold text-muted-foreground">
            {language === 'uz' 
              ? "...va yana 10 dan ortiq tajribali ustozlar"
              : "...and 10+ more experienced teachers"
            }
          </p>
        </div>
      </div>
    </section>
  );
};

export default Teachers;