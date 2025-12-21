import React, { useState, useEffect, useRef } from 'react';
import { Award, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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

const cefrImages = [cefr1, cefr2, cefr3, cefr4, cefr5, cefr6, cefr7, cefr8, cefr9, cefr10];

const Results: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimationSimple();

  return (
    <section id="results" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-12">
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

        {/* CEFR Certificates Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cefrImages.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer group transform transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <img
                src={image}
                alt={`CEFR Certificate ${index + 1}`}
                className="w-full h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <span className="text-primary-foreground text-sm font-medium">
                  {language === 'uz' ? "Ko'rish" : 'View'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* More Results Text */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            {language === 'uz' 
              ? "Va yana 2000+ dan ortiq muvaffaqiyatli natijalar..."
              : "And over 2000+ more successful results..."
            }
          </p>
        </div>
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
          <img
            src={selectedImage}
            alt="CEFR Certificate"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-elegant"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
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
