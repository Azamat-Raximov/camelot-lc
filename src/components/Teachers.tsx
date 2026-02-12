import React from 'react';
import { Users, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import teacherAhadbek from '@/assets/teacher-ahadbek.jpg';
import teacherJavlonbek from '@/assets/teacher-javlonbek.jpg';
import teacherZuhur from '@/assets/teacher-zuhur.jpg';
import teacherOzodbek from '@/assets/teacher-ozodbek.jpg';
import teacherAzizbek from '@/assets/teacher-azizbek.jpg';
import teacherKhusndor from '@/assets/teacher-khusndor.jpg';
import teacherMirzohid from '@/assets/teacher-mirzohid.jpg';
import teacherMohinur from '@/assets/teacher-mohinur.jpg';
import teacherMuzaffar from '@/assets/teacher-muzaffar.jpg';
import teacherDoston from '@/assets/teacher-doston.jpg';
import teacherNigina from '@/assets/teacher-nigina.jpg';
import teacherShahboz from '@/assets/teacher-shahboz.jpg';
import teacherDiyorbek from '@/assets/teacher-diyorbek.jpg';

interface Teacher {
  name: string;
  role: string;
  ieltsScore: string;
  image: string;
}

const Teachers: React.FC = () => {
  const { t, language } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const teachers: Teacher[] = [
    { name: 'Berdimurotov Shahboz', role: language === 'uz' ? 'IELTS Ustozi' : 'IELTS Teacher', ieltsScore: '8.5', image: teacherShahboz },
    { name: 'Doston Jumaboyev', role: language === 'uz' ? 'IELTS Ustozi' : 'IELTS Teacher', ieltsScore: '8.5', image: teacherDoston },
    { name: 'Ozodbek Qilichev', role: language === 'uz' ? 'IELTS Ustozi' : 'IELTS Teacher', ieltsScore: '7.5', image: teacherOzodbek },
    { name: 'Ahadbek Odilbekov', role: language === 'uz' ? 'IELTS Ustozi' : 'IELTS Teacher', ieltsScore: '8.0', image: teacherAhadbek },
    { name: 'Mansurov Zuhur', role: language === 'uz' ? 'IELTS Ustozi' : 'IELTS Teacher', ieltsScore: '8.0', image: teacherZuhur },
    { name: 'Azizbek Toshmatov', role: language === 'uz' ? 'IELTS Ustozi' : 'IELTS Teacher', ieltsScore: '8.0', image: teacherAzizbek },
    { name: 'Sattorov Khusndor', role: language === 'uz' ? 'IELTS Ustozi' : 'IELTS Teacher', ieltsScore: '8.0', image: teacherKhusndor },
    { name: 'Mirzohid Ibrohimov', role: language === 'uz' ? 'IELTS Ustozi' : 'IELTS Teacher', ieltsScore: '8.0', image: teacherMirzohid },
    { name: 'Rasulov Muzaffar', role: language === 'uz' ? 'IELTS Ustozi' : 'IELTS Teacher', ieltsScore: '8.0', image: teacherMuzaffar },
    { name: 'Nigina Abdunabiyeva', role: language === 'uz' ? 'IELTS Ustozi' : 'IELTS Teacher', ieltsScore: '8.0', image: teacherNigina },
    { name: 'Diyorbek Egamberdiyev', role: language === 'uz' ? 'IELTS Ustozi' : 'IELTS Teacher', ieltsScore: '8.0', image: teacherDiyorbek },
    { name: 'Mohinur Abdullayeva', role: language === 'uz' ? 'IELTS Ustozi' : 'IELTS Teacher', ieltsScore: '7.5', image: teacherMohinur },
    { name: 'Javlonbek Abdurazzoqov', role: language === 'uz' ? 'IELTS Ustozi' : 'IELTS Teacher', ieltsScore: '7.5', image: teacherJavlonbek },
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

        {/* Teacher Carousel */}
        <div className={`relative max-w-6xl mx-auto animate-scale-in ${isVisible ? 'visible' : ''}`}>
          {/* Navigation Arrows */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 bg-card/90 backdrop-blur-sm border border-border rounded-full p-2 shadow-elegant hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 bg-card/90 backdrop-blur-sm border border-border rounded-full p-2 shadow-elegant hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 md:gap-6">
              {teachers.map((teacher) => (
                <div
                  key={teacher.name}
                  className="flex-[0_0_45%] sm:flex-[0_0_30%] lg:flex-[0_0_23%] min-w-0"
                >
                  <Card className="group bg-card border-border hover:border-primary/50 transition-all duration-300 shadow-card hover:shadow-elegant overflow-hidden hover-lift">
                    <div className="relative overflow-hidden aspect-[3/4]">
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className="royal-gradient text-primary-foreground text-xs">
                          <Award className="w-3 h-3 mr-1" />
                          IELTS {teacher.ieltsScore}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-3 md:p-4 text-center">
                      <h3 className="text-sm md:text-base font-bold text-foreground mb-1">{teacher.name}</h3>
                      <p className="text-primary font-medium text-xs md:text-sm">{teacher.role}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teachers;
