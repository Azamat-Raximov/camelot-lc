import React, { useState, useEffect } from 'react';
import { Users, Award, ChevronLeft, ChevronRight, User } from 'lucide-react';
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
  ieltsScore?: string;
  image?: string;
}

const Teachers: React.FC = () => {
  const { t, language } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const teachersWithImages: Teacher[] = [
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

  const teachersWithoutImages: Teacher[] = [
    { name: 'Sardor Tursunov', role: language === 'uz' ? 'General English' : 'General English' },
    { name: 'Gulnora Karimova', role: language === 'uz' ? 'CEFR Mutaxassisi' : 'CEFR Specialist' },
    { name: 'Shoxrux Hamidov', role: language === 'uz' ? 'IELTS Ustozi' : 'IELTS Teacher' },
    { name: 'Dilnoza Rahimova', role: language === 'uz' ? 'General English' : 'General English' },
    { name: 'Bekzod Aliyev', role: language === 'uz' ? 'Speaking Expert' : 'Speaking Expert' },
    { name: 'Nodira Saidova', role: language === 'uz' ? 'Writing Expert' : 'Writing Expert' },
    { name: 'Otabek Jumayev', role: language === 'uz' ? 'IELTS Ustozi' : 'IELTS Teacher' },
    { name: 'Malika Xolmatova', role: language === 'uz' ? 'CEFR Mutaxassisi' : 'CEFR Specialist' },
    { name: 'Jasur Ergashev', role: language === 'uz' ? 'General English' : 'General English' },
    { name: 'Zarina Abdullayeva', role: language === 'uz' ? 'IELTS Ustozi' : 'IELTS Teacher' },
  ];

  const allTeachers = [...teachersWithImages, ...teachersWithoutImages];

  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3;
      return 1;
    }
    return 3;
  };

  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, allTeachers.length - visibleCount);

  const goNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto-play every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const visibleTeachers = allTeachers.slice(currentIndex, currentIndex + visibleCount);
  
  // Handle wrap-around
  if (visibleTeachers.length < visibleCount) {
    const remaining = visibleCount - visibleTeachers.length;
    visibleTeachers.push(...allTeachers.slice(0, remaining));
  }

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

        {/* Teacher Carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Left Arrow */}
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center transition-all hover:bg-secondary hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>

          {/* Teacher Cards */}
          <div className="flex gap-6 overflow-hidden px-2">
            {visibleTeachers.map((teacher, index) => (
              <Card
                key={`${teacher.name}-${index}`}
                className={`flex-1 min-w-0 group bg-card border-border hover:border-primary/50 transition-all duration-300 shadow-card hover:shadow-elegant overflow-hidden hover-lift animate-scale-in ${isVisible ? 'visible' : ''}`}
              >
                <div className="relative overflow-hidden aspect-square">
                  {teacher.image ? (
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center">
                      <User className="w-24 h-24 text-muted-foreground/50" />
                    </div>
                  )}
                  {teacher.ieltsScore && (
                    <div className="absolute top-4 right-4">
                      <Badge className="royal-gradient text-primary-foreground">
                        <Award className="w-3 h-3 mr-1" />
                        IELTS {teacher.ieltsScore}
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-1">{teacher.name}</h3>
                  <p className="text-primary font-medium">{teacher.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center transition-all hover:bg-secondary hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(allTeachers.length / visibleCount) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx * visibleCount)}
              className={`w-2 h-2 rounded-full transition-all ${
                Math.floor(currentIndex / visibleCount) === idx
                  ? 'bg-primary w-6'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>

        {/* Additional Teachers Count */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            {language === 'uz' 
              ? `Jami ${allTeachers.length}+ tajribali ustozlar`
              : `Total ${allTeachers.length}+ experienced teachers`
            }
          </p>
        </div>
      </div>
    </section>
  );
};

export default Teachers;