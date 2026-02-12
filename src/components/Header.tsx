import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/logo.jpg';

// Flag images as inline SVG for better compatibility
const UzbekFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" className="w-5 h-5 rounded-sm">
    <path fill="#1EB53A" d="M0 27a4 4 0 004 4h28a4 4 0 004-4v-4H0v4z"/>
    <path fill="#0099B5" d="M0 13h36V9a4 4 0 00-4-4H4a4 4 0 00-4 4v4z"/>
    <path fill="#EEE" d="M0 13h36v10H0z"/>
    <path fill="#CE1126" d="M0 14h36v2H0zm0 6h36v2H0z"/>
    <circle fill="#EEE" cx="8" cy="9" r="4"/>
    <circle fill="#0099B5" cx="9.5" cy="9" r="3.5"/>
    <g fill="#EEE">
      <circle cx="18" cy="7" r="1"/>
      <circle cx="21" cy="7" r="1"/>
      <circle cx="24" cy="7" r="1"/>
      <circle cx="18" cy="10" r="1"/>
      <circle cx="21" cy="10" r="1"/>
      <circle cx="24" cy="10" r="1"/>
      <circle cx="21" cy="13" r="1"/>
      <circle cx="24" cy="13" r="1"/>
      <circle cx="27" cy="7" r="1"/>
      <circle cx="27" cy="10" r="1"/>
      <circle cx="27" cy="13" r="1"/>
      <circle cx="24" cy="16" r="1"/>
    </g>
  </svg>
);

const UKFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" className="w-5 h-5 rounded-sm">
    <path fill="#00247D" d="M0 9.059V13h5.628zM4.664 31H13v-5.837zM23 25.164V31h8.335zM0 23v3.941L5.63 23zM31.337 5H23v5.837zM36 26.942V23h-5.631zM36 13V9.059L30.371 13zM13 5H4.664L13 10.837z"/>
    <path fill="#CF1B2B" d="M25.14 23l9.712 6.801a3.977 3.977 0 00.99-1.749L28.627 23H25.14zM13 23h-2.141l-9.711 6.8c.521.53 1.189.909 1.938 1.085L13 23.943V23zm10-10h2.141l9.711-6.8a3.988 3.988 0 00-1.937-1.085L23 12.057V13zm-10 0H10.86L1.148 6.2a3.994 3.994 0 00-.991 1.749L7.372 13H13z"/>
    <path fill="#EEE" d="M36 21H21v10h2v-5.836L31.335 31H32a3.99 3.99 0 002.852-1.199L25.14 23h3.487l7.215 5.052c.093-.337.158-.686.158-1.052v-.058L30.371 23H36v-2zM0 21v2h5.63L0 26.941V27c0 1.091.439 2.078 1.148 2.8l9.711-6.8H13v.943l-9.914 6.941c.294.07.598.116.914.116h.664L13 25.163V31h2V21H0zM36 9a3.983 3.983 0 00-1.148-2.8L25.14 13H23v-.943l9.915-6.942A4.01 4.01 0 0032 5h-.663L23 10.837V5h-2v10h15v-2h-5.629L36 9.059V9zM13 5v5.837L4.664 5H4c-1.091 0-2.078.44-2.8 1.149L10.86 13H13v-.942L3.086 5.116A4.001 4.001 0 002.172 5H2a4 4 0 00-.991.2L10.86 12H7.373L.157 6.949C.065 7.285 0 7.635 0 8v1.059L5.628 13H0v2h15V5h-2z"/>
    <path fill="#CF1B2B" d="M21 15V5h-6v10H0v6h15v10h6V21h15v-6z"/>
  </svg>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const langRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: '#courses', label: t('nav.courses') },
    { href: '#teachers', label: t('nav.teachers') },
    { href: '#results', label: t('nav.results') },
    { href: '#faq', label: t('nav.faq') },
  ];

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const headerHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      }
    }, 350);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: 'uz' | 'en') => {
    setLanguage(lang);
    setIsLangOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <img 
                src={logo} 
                alt="Camelot LC Logo" 
                className="w-10 h-10 rounded-lg object-cover shadow-royal group-hover:scale-105 transition-transform"
              />
              <span className="text-xl font-bold text-foreground">
                Camelot <span className="text-primary">LC</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-muted-foreground hover:text-primary font-medium transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Language Dropdown */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary text-foreground font-medium transition-all hover:bg-secondary/80"
                >
                  
                  <span className="flex items-center gap-1.5">
                    {language === 'uz' ? <UzbekFlag /> : <UKFlag />}
                    <span className="uppercase">{language}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isLangOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-elegant overflow-hidden min-w-[160px] animate-fade-in z-50">
                    <button
                      onClick={() => handleLanguageChange('uz')}
                      className={`w-full px-4 py-2.5 text-left font-medium transition-colors flex items-center gap-2 ${
                        language === 'uz' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-foreground hover:bg-secondary'
                      }`}
                    >
                      <UzbekFlag />
                      O'zbekcha
                    </button>
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className={`w-full px-4 py-2.5 text-left font-medium transition-colors flex items-center gap-2 ${
                        language === 'en' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-foreground hover:bg-secondary'
                      }`}
                    >
                      <UKFlag />
                      English
                    </button>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => scrollToSection('#contact')}
                className="hidden sm:flex royal-gradient text-primary-foreground hover:opacity-90 shadow-royal"
              >
                {t('nav.contact')}
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-foreground"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Slide from Right */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div 
          className={`absolute top-16 right-0 h-[calc(100vh-4rem)] w-72 bg-card border-l border-border shadow-elegant transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <nav className="p-4 flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-left px-4 py-3 text-foreground hover:bg-secondary rounded-lg transition-all duration-200"
                style={{
                  transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                  transform: isMenuOpen ? 'translateX(0)' : 'translateX(20px)',
                  opacity: isMenuOpen ? 1 : 0,
                }}
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('#contact')}
              className="mt-2 royal-gradient text-primary-foreground"
              style={{
                transitionDelay: isMenuOpen ? `${navLinks.length * 50}ms` : '0ms',
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(20px)',
                opacity: isMenuOpen ? 1 : 0,
              }}
            >
              <Phone className="w-4 h-4 mr-2" />
              {t('nav.contact')}
            </Button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
