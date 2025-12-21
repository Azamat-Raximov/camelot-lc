import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: '',
    message: '',
  });

  const courses = [
    { value: 'general', label: 'General English' },
    { value: 'ielts', label: 'IELTS' },
    { value: 'cefr', label: 'CEFR' },
  ];

  const validatePhone = (phone: string): boolean => {
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length === 9;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast({
        variant: 'destructive',
        title: language === 'uz' ? 'Xatolik' : 'Error',
        description: language === 'uz' ? 'Iltimos, ismingizni kiriting' : 'Please enter your name',
      });
      return;
    }

    if (!validatePhone(formData.phone)) {
      toast({
        variant: 'destructive',
        title: language === 'uz' ? 'Xatolik' : 'Error',
        description: language === 'uz' ? 'Telefon raqami 9 ta raqamdan iborat bo\'lishi kerak' : 'Phone number must be 9 digits',
      });
      return;
    }

    if (!formData.course) {
      toast({
        variant: 'destructive',
        title: language === 'uz' ? 'Xatolik' : 'Error',
        description: language === 'uz' ? 'Iltimos, kursni tanlang' : 'Please select a course',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: language === 'uz' ? 'Muvaffaqiyat!' : 'Success!',
        description: t('contact.success'),
      });
      setFormData({ name: '', phone: '', course: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 9);
    setFormData({ ...formData, phone: value });
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Contact Form Section */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="text-center mb-10">
            <Badge variant="secondary" className="mb-4 px-4 py-1.5">
              <Mail className="w-4 h-4 mr-2" />
              {language === 'uz' ? 'Ro\'yxatdan o\'tish' : 'Registration'}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {language === 'uz' ? 'Kursga yoziling' : 'Enroll in a Course'}
            </h2>
            <p className="text-lg text-muted-foreground">
              {language === 'uz' ? "Ma'lumotlaringizni qoldiring, biz siz bilan bog'lanamiz" : 'Leave your details and we will contact you'}
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 shadow-elegant animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  {t('contact.name')}
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={language === 'uz' ? 'Ismingizni kiriting' : 'Enter your name'}
                  className="h-12"
                  maxLength={100}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  {t('contact.phone')}
                </label>
                <div className="flex">
                  <div className="flex items-center justify-center px-4 bg-secondary border border-r-0 border-input rounded-l-md text-muted-foreground font-medium">
                    +998
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="33 600 95 95"
                    className="h-12 rounded-l-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="course" className="block text-sm font-medium text-foreground mb-2">
                  {t('contact.course')}
                </label>
                <Select
                  value={formData.course}
                  onValueChange={(value) => setFormData({ ...formData, course: value })}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={t('contact.select')} />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.value} value={course.value}>
                        {course.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  {t('contact.message')}
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={language === 'uz' ? 'Xabaringizni yozing...' : 'Write your message...'}
                  rows={4}
                  maxLength={1000}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 royal-gradient text-primary-foreground hover:opacity-90 shadow-royal text-lg font-semibold"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    {language === 'uz' ? 'Yuborilmoqda...' : 'Sending...'}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    {t('contact.submit')}
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Info */}
          <div className="animate-fade-in">
            <Badge variant="secondary" className="mb-4 px-4 py-1.5">
              <Phone className="w-4 h-4 mr-2" />
              {t('nav.contact')}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('contact.subtitle')}
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <a
                href="tel:+998336009595"
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 royal-gradient rounded-xl flex items-center justify-center shadow-royal group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'uz' ? 'Telefon' : 'Phone'}
                  </p>
                  <p className="text-lg font-semibold text-foreground">+998 33 600 95 95</p>
                </div>
              </a>

              <a
                href="https://yandex.uz/maps/org/118052541979/?ll=68.766565%2C40.497976&z=16"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 royal-gradient rounded-xl flex items-center justify-center shadow-royal shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    {language === 'uz' ? 'Manzil' : 'Address'}
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {t('footer.address')}
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Side - Yandex Map */}
          <div className="rounded-xl overflow-hidden border border-border shadow-card h-[400px] animate-fade-in">
            <iframe
              src="https://yandex.uz/map-widget/v1/?ll=68.766565%2C40.497976&mode=search&oid=118052541979&ol=biz&z=16"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Camelot LC Location - Yandex Map"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
