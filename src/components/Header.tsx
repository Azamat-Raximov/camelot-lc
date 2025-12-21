import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/logo.jpg';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const langRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: '#courses', label: t('nav.courses') },
    { href: '#teachers', label: t('nav.teachers') },
    { href: '#results', label: t('nav.results') },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
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
                <Globe className="w-4 h-4" />
                <span className="flex items-center gap-1">
                  {language === 'uz' ? '🇺🇿' : '🇬🇧'}
                  <span className="uppercase">{language}</span>
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-elegant overflow-hidden min-w-[140px] animate-fade-in">
                  <button
                    onClick={() => handleLanguageChange('uz')}
                    className={`w-full px-4 py-2.5 text-left font-medium transition-colors flex items-center gap-2 ${
                      language === 'uz' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    <span>🇺🇿</span>
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
                    <span>🇬🇧</span>
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

        {/* Mobile Menu with Animation */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-4 border-t border-border flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-left px-4 py-3 text-foreground hover:bg-secondary rounded-lg transition-all duration-200"
                style={{
                  transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                  transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
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
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                opacity: isMenuOpen ? 1 : 0,
              }}
            >
              {t('nav.contact')}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
