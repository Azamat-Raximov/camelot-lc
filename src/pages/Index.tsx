import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyCamelot from '@/components/WhyCamelot';
import Courses from '@/components/Courses';
import Teachers from '@/components/Teachers';
import Results from '@/components/Results';
import Gallery from '@/components/Gallery';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <WhyCamelot />
        <Courses />
        <Teachers />
        <Results />
        <Gallery />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
