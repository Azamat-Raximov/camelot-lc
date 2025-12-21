import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';

const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { src: gallery1, alt: 'Modern classroom' },
    { src: gallery2, alt: 'Students learning' },
    { src: gallery3, alt: 'Reception area' },
  ];

  const openLightbox = (src: string) => {
    setSelectedImage(src);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <section className="py-24 lg:py-32 bg-secondary/30">
        <div className="container mx-auto px-4" ref={ref}>
          {/* Section Header */}
          <div className={`text-center max-w-2xl mx-auto mb-16 animate-on-scroll ${isVisible ? 'visible' : ''}`}>
            <Badge variant="secondary" className="mb-4 px-4 py-1.5">
              <Camera className="w-4 h-4 mr-2" />
              Gallery
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('gallery.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('gallery.subtitle')}
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => openLightbox(image.src)}
                className={`group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 hover-lift animate-scale-in cursor-pointer ${isVisible ? 'visible' : ''} stagger-${index + 1}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-background/90 rounded-full flex items-center justify-center">
                      <Camera className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedImage}
            alt="Gallery image enlarged"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-elegant animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default Gallery;
