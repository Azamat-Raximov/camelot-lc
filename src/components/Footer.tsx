import React from 'react';
import { Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/logo.jpg';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: '#courses', label: t('nav.courses') },
    { href: '#teachers', label: t('nav.teachers') },
    { href: '#results', label: t('nav.results') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <img 
                src={logo} 
                alt="Camelot LC Logo" 
                className="w-10 h-10 rounded-lg object-cover"
              />
              <span className="text-xl font-bold text-background">
                Camelot <span className="text-accent">LC</span>
              </span>
            </a>
            <p className="text-background/70 mb-2 max-w-sm">
              {t('footer.slogan')}
            </p>
            <p className="text-background/50 text-sm">
              {language === 'uz'
                ? "Sirdaryo viloyatidagi ingliz tili o'quv markazi"
                : 'English language center in Sirdarya region'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">
              {language === 'uz' ? 'Tezkor havolalar' : 'Quick Links'}
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-background/70 hover:text-accent transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">
              {language === 'uz' ? "Bog'lanish" : 'Contact'}
            </h4>
            <div className="space-y-4">
              <a
                href="tel:+998336009595"
                className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors"
              >
                <Phone className="w-5 h-5" />
                +998 33 600 95 95
              </a>
              <div className="flex items-start gap-3 text-background/70">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{t('footer.address')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-sm">
            © {currentYear} Camelot LC. {t('footer.rights')}.
          </p>
          <a 
            href="https://t.me/azamat_442"
            target="_blank"
            rel="noopener noreferrer"
            className="text-background/50 text-sm flex items-center gap-2 hover:text-accent transition-colors group"
          >
            <span>
              {language === 'uz' 
                ? 'Azamat Raximov tomonidan qilindi. Sizga ham sayt kerakmi? Menga yozing' 
                : 'Made by Azamat Raximov. Need a website? Contact me'}
            </span>
            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
