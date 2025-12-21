import React, { useState } from 'react';
import { Menu, X, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 royal-gradient rounded-lg flex items-center justify-center shadow-royal group-hover:scale-105 transition-transform">
              <Crown className="w-6 h-6 text-primary-foreground" />
            </div>
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
            {/* Language Toggle */}
            <div className="flex items-center bg-secondary rounded-lg p-1">
              <button
                onClick={() => setLanguage('uz')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  language === 'uz'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                UZ
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  language === 'en'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                EN
              </button>
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left px-4 py-3 text-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('#contact')}
                className="mt-2 royal-gradient text-primary-foreground"
              >
                {t('nav.contact')}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
