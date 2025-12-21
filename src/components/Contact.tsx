import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Info */}
          <div>
            <Badge variant="secondary" className="mb-4 px-4 py-1.5">
              <Mail className="w-4 h-4 mr-2" />
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

              <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl">
                <div className="w-12 h-12 royal-gradient rounded-xl flex items-center justify-center shadow-royal shrink-0">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'uz' ? 'Manzil' : 'Address'}
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {t('footer.address')}
                  </p>
                </div>
              </div>

              {/* Google Map */}
              <div className="rounded-xl overflow-hidden border border-border shadow-card">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24528.654326784494!2d68.77!3d40.49!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38b3c24e22b27281%3A0x9c60f8e8bbf37f!2sGulistan%2C%20Uzbekistan!5e0!3m2!1sen!2sus!4v1703123456789!5m2!1sen!2sus"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Camelot LC Location"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-elegant">
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
      </div>
    </section>
  );
};

export default Contact;
