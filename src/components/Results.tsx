import React, { useState, useEffect, useRef } from 'react';
import { Award, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Import IELTS certificate images
import ielts1 from '@/assets/ielts-1.jpg';
import ielts2 from '@/assets/ielts-2.jpg';
import ielts4 from '@/assets/ielts-4.jpg';
import ielts5 from '@/assets/ielts-5.jpg';
import ielts6 from '@/assets/ielts-6.jpg';
import ielts7 from '@/assets/ielts-7.jpg';
import ielts8 from '@/assets/ielts-8.jpg';
import ielts9 from '@/assets/ielts-9.jpg';

// Import CEFR certificate images
import cefr1 from '@/assets/cefr-1.jpg';
import cefr2 from '@/assets/cefr-2.jpg';
import cefr3 from '@/assets/cefr-3.jpg';
import cefr4 from '@/assets/cefr-4.jpg';
import cefr5 from '@/assets/cefr-5.jpg';
import cefr6 from '@/assets/cefr-6.jpg';
import cefr7 from '@/assets/cefr-7.jpg';
import cefr8 from '@/assets/cefr-8.jpg';
import cefr9 from '@/assets/cefr-9.jpg';
import cefr10 from '@/assets/cefr-10.jpg';

// IELTS results with names and scores
const ieltsResults = [
  { image: ielts1, name: 'Abdusattorova Lobar', score: '7.5' },
  { image: ielts2, name: 'Egamberganov Diyorbek', score: '8.0' },
  { image: ielts4, name: 'Mansurov Zuhur', score: '8.0' },
  { image: ielts5, name: 'Nozima', score: '8.0' },
  { image: ielts6, name: 'Odilbekov Ahadbek', score: '8.0' },
  { image: ielts7, name: 'Qayumov Komiljon', score: '7.5' },
  { image: ielts8, name: 'Sattorov Xusndor', score: '8.0' },
  { image: ielts9, name: 'Saydaliyev Shohjahon', score: '7.0' },
];

const cefrImages = [cefr1, cefr2, cefr3, cefr4, cefr5, cefr6, cefr7, cefr8, cefr9, cefr10];

// Reusable Carousel Component
interface CarouselItem {
  image: string;
  name?: string;
  score?: string;
}

interface ResultsCarouselProps {
  items: CarouselItem[];
  showInfo?: boolean;
  altPrefix: string;
}

const ResultsCarousel: React.FC<ResultsCarouselProps> = ({ items, showInfo = false, altPrefix }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<CarouselItem | null>(null);
  const { ref, isVisible } = useScrollAnimationSimple();
  const { language } = useLanguage();

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

  const maxIndex = Math.max(0, items.length - visibleCount);

  const goNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto-play every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const visibleItems = items.slice(currentIndex, currentIndex + visibleCount);

  return (
    <>
      <div className="relative max-w-4xl mx-auto" ref={ref}>
        {/* Left Arrow */}
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center transition-all ${
            currentIndex === 0
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-secondary hover:scale-110'
          }`}
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
        </button>

        {/* Images */}
        <div className="flex gap-4 overflow-hidden">
          {visibleItems.map((item, idx) => {
            const actualIndex = currentIndex + idx;
            return (
              <div
                key={actualIndex}
                onClick={() => setSelectedImage(item)}
                className={`flex-1 relative rounded-xl overflow-hidden shadow-lg cursor-pointer group transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <img
                  src={item.image}
                  alt={`${altPrefix} ${actualIndex + 1}`}
                  className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="text-primary-foreground text-sm font-medium bg-primary/80 px-3 py-1 rounded-full">
                    {language === 'uz' ? "Ko'rish" : 'View'}
                  </span>
                </div>
                {/* Name and Score */}
                {showInfo && item.name && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-3 pt-8">
                    <p className="text-foreground text-sm font-semibold text-center">{item.name}</p>
                    <p className="text-primary text-xs font-bold text-center">IELTS {item.score}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={goNext}
          disabled={currentIndex >= maxIndex}
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center transition-all ${
            currentIndex >= maxIndex
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-secondary hover:scale-110'
          }`}
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex
                ? 'bg-primary w-6'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
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
          <div className="text-center">
            <img
              src={selectedImage.image}
              alt="Certificate"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-elegant"
              onClick={(e) => e.stopPropagation()}
            />
            {showInfo && selectedImage.name && (
              <div className="mt-4">
                <p className="text-foreground text-lg font-semibold">{selectedImage.name}</p>
                <p className="text-primary text-base font-bold">IELTS {selectedImage.score}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const Results: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section id="results" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* IELTS Section */}
        <div className="mb-20" id="ielts-results">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {language === 'uz' ? 'IELTS Sertifikatlari' : 'IELTS Certificates'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {language === 'uz' ? 'IELTS Natijalari' : 'IELTS Results'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'uz' 
                ? "O'quvchilarimizning IELTS sertifikatlari - yuqori ballar bilan"
                : "Our students' IELTS certificates - with high scores"
              }
            </p>
          </div>
          <ResultsCarousel 
            items={ieltsResults} 
            showInfo={true} 
            altPrefix="IELTS Certificate" 
          />
        </div>

        {/* CEFR Section */}
        <div id="cefr-results">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {language === 'uz' ? 'CEFR Sertifikatlari' : 'CEFR Certificates'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {language === 'uz' ? 'CEFR Natijalari' : 'CEFR Results'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'uz' 
                ? "O'quvchilarimizning CEFR sertifikatlari - 2000+ dan ortiq muvaffaqiyatli natijalar"
                : "Our students' CEFR certificates - over 2000+ successful results"
              }
            </p>
          </div>
          <ResultsCarousel 
            items={cefrImages.map(img => ({ image: img }))} 
            showInfo={false} 
            altPrefix="CEFR Certificate" 
          />
          
          {/* More Results Text */}
          <div className="text-center mt-6">
            <p className="text-muted-foreground text-sm">
              {language === 'uz' 
                ? "Va yana 2000+ dan ortiq muvaffaqiyatli natijalar..."
                : "And over 2000+ more successful results..."
              }
            </p>
          </div>
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