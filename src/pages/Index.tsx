import React, { lazy, Suspense } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';

const WhyCamelot = lazy(() => import('@/components/WhyCamelot'));
const Courses = lazy(() => import('@/components/Courses'));
const Teachers = lazy(() => import('@/components/Teachers'));
const Results = lazy(() => import('@/components/Results'));
const CenterGallery = lazy(() => import('@/components/CenterGallery'));
const FAQ = lazy(() => import('@/components/FAQ'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));
import landingBg from '@/assets/landing-bg.png';

const Index: React.FC = () => {
  return (
    <div 
      className="min-h-screen bg-background"
      style={{
        backgroundImage: `url(${landingBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="min-h-screen bg-background/90">
        <Header />
        <main>
          <Hero />
          <Suspense fallback={<div className="min-h-[200px]" />}>
            <WhyCamelot />
            <Teachers />
            <Results />
            <CenterGallery />
            <Courses />
            <Contact />
            <FAQ />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
};

export default Index;
