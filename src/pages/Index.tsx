import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyCamelot from '@/components/WhyCamelot';
import Courses from '@/components/Courses';
import Teachers from '@/components/Teachers';
import Results from '@/components/Results';
import CenterGallery from '@/components/CenterGallery';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
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
          <WhyCamelot />
          <Courses />
          <Teachers />
          <Results />
          <CenterGallery />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
