import React, { useEffect, useRef } from 'react';
import { Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import center1 from '@/assets/center-1.webp';
import center2 from '@/assets/center-2.webp';
import center3 from '@/assets/center-3.webp';
import center4 from '@/assets/center-4.webp';
import center5 from '@/assets/center-5.webp';
import center6 from '@/assets/center-6.webp';
import center7 from '@/assets/center-7.webp';
import center8 from '@/assets/center-8.webp';
import center9 from '@/assets/center-9.webp';

const CenterGallery: React.FC = () => {
  const { language } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  
  const autoplayPlugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [autoplayPlugin.current]
  );

  const images = [
    { src: center1, alt: 'Camelot bino' },
    { src: center2, alt: 'Sinf xonasi' },
    { src: center3, alt: 'Zinapoya' },
    { src: center4, alt: 'Koridor' },
    { src: center5, alt: 'Dars jarayoni' },
    { src: center6, alt: 'Reseption' },
    { src: center7, alt: 'Sertifikatlar devori' },
    { src: center8, alt: 'Sertifikatlar' },
    { src: center9, alt: 'Camelot logosi' },
  ];

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section id="our-center" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <Badge variant="secondary" className="mb-4 px-4 py-1.5">
            <Building2 className="w-4 h-4 mr-2" />
            {language === 'uz' ? 'Bizning markaz' : 'Our Center'}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {language === 'uz' ? 'Bizning markaz' : 'Our Center'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {language === 'uz' ? 'Zamonaviy jihozlar va qulay muhit' : 'Modern facilities and comfortable environment'}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Left Arrow */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 lg:-translate-x-6 z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center transition-all hover:bg-secondary hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-foreground" />
          </button>

          {/* Embla Carousel */}
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2"
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-card">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 lg:translate-x-6 z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center transition-all hover:bg-secondary hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CenterGallery;
