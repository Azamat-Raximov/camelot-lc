import React, { useState, useEffect, useRef } from 'react';
import { Award, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Import result images
import result1 from '@/assets/result-1.jpg';
import result2 from '@/assets/result-2.jpg';
import result3 from '@/assets/result-3.jpg';
import result4 from '@/assets/result-4.jpg';
import result5 from '@/assets/result-5.jpg';
import result6 from '@/assets/result-6.jpg';
import result7 from '@/assets/result-7.jpg';
import result8 from '@/assets/result-8.jpg';
import result9 from '@/assets/result-9.jpg';

const resultImages = [
  result1, result2, result3, result4, result5,
  result6, result7, result8, result9,
];

function useScrollAnimationSimple() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

const Results: React.FC = () => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimationSimple();

  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 640) return 2;
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

  const maxIndex = Math.max(0, resultImages.length - visibleCount);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const visibleItems = resultImages.slice(currentIndex, currentIndex + visibleCount);

  return (
    <section id="results" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {language === 'uz' ? 'Natijalar' : 'Results'}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {language === 'uz' ? 'IELTS va CEFR Natijalarimiz' : 'Our IELTS & CEFR Results'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'uz'
              ? "Eng so'ngi natijalarimizdan"
              : 'From our latest results'}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto" ref={ref}>
          <button
            onClick={() => setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center transition-all ${
              currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-secondary hover:scale-110'
            }`}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>

          <div className="flex gap-4 overflow-hidden">
            {visibleItems.map((image, idx) => (
              <div
                key={currentIndex + idx}
                onClick={() => setSelectedImage(image)}
                className={`flex-1 relative rounded-xl overflow-hidden shadow-lg cursor-pointer group transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="aspect-[3/4] w-full bg-muted/20">
                  <img
                    src={image}
                    alt={`Certificate ${currentIndex + idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="text-primary-foreground text-sm font-medium bg-primary/80 px-3 py-1 rounded-full">
                    {language === 'uz' ? "Ko'rish" : 'View'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center transition-all ${
              currentIndex >= maxIndex ? 'opacity-40 cursor-not-allowed' : 'hover:bg-secondary hover:scale-110'
            }`}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>

        <div className="text-center mt-6">
          <p className="text-muted-foreground text-sm">
            {language === 'uz'
              ? "Va yana 2000+ dan ortiq muvaffaqiyatli natijalar..."
              : "And over 2000+ more successful results..."}
          </p>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-foreground hover:text-primary transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Certificate"
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-elegant"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Results;
