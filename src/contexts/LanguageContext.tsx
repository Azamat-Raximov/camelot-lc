import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'uz' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  uz: {
    // Navigation
    'nav.courses': 'Kurslar',
    'nav.teachers': "O'qituvchilar",
    'nav.results': 'Natijalar',
    'nav.contact': "Bog'lanish",
    'nav.about': 'Biz haqimizda',
    
    // Hero
    'hero.motto': 'WISDOM - IS DOING!',
    'hero.subtitle': "Sirdaryo viloyatidagi ingliz tili o'quv markazi",
    'hero.cta': 'Kurslarni ko\'rish',
    'hero.contact': "Bog'lanish",
    
    // Courses
    'courses.title': 'Bizning Kurslar',
    'courses.subtitle': "Har bir daraja uchun professional ingliz tili ta'limi",
    'courses.general.title': 'General English',
    'courses.general.desc': "Boshlang'ich darajadan yuqori darajagacha umumiy ingliz tili kursi. Grammatika, so'zlashuv va tinglash ko'nikmalarini o'rganing.",
    'courses.ielts.title': 'IELTS Tayyorlov',
    'courses.ielts.desc': "IELTS imtihoniga tayyorgarlik kursi. Reading, Writing, Listening va Speaking bo'limlarini chuqur o'rganing.",
    'courses.cefr.title': 'CEFR Sertifikat',
    'courses.cefr.desc': "A1-C2 darajalari uchun CEFR sertifikati olish kursi. Xalqaro standartlarga mos ta'lim.",
    'courses.duration': 'Davomiyligi',
    'courses.level': 'Daraja',
    
    // Teachers
    'teachers.title': "O'qituvchilarimiz",
    'teachers.subtitle': "Tajribali va malakali o'qituvchilar jamoasi",
    'teachers.experience': 'yillik tajriba',
    
    // Results
    'results.title': "O'quvchilarimiz natijalari",
    'results.subtitle': "Muvaffaqiyatli bitiruvchilarimiz va ularning yutuqlari",
    'results.students': "O'quvchilar soni",
    'results.ielts': "IELTS 7.0+ ballari",
    'results.years': 'Yillik tajriba',
    'results.satisfaction': 'Mijozlar mamnuniyati',
    
    // Why Camelot
    'why.title': 'Nega aynan Camelot?',
    'why.subtitle': "Sirdaryo viloyatida eng yaxshi ta'lim markazi bo'lishimizning sabablari",
    'why.quality.title': "Sifatli ta'lim",
    'why.quality.desc': "Xalqaro standartlarga mos zamonaviy o'qitish metodlari",
    'why.teachers.title': "Malakali o'qituvchilar",
    'why.teachers.desc': "CELTA/DELTA sertifikatiga ega tajribali ustozlar",
    'why.environment.title': 'Qulay muhit',
    'why.environment.desc': "Zamonaviy jihozlangan qulay o'quv xonalari",
    'why.results.title': 'Kafolatlangan natija',
    'why.results.desc': "Yuzlab muvaffaqiyatli o'quvchilar va yuqori ball natijalari",
    
    // Gallery
    'gallery.title': 'Bizning Markaz',
    'gallery.subtitle': "Zamonaviy o'quv muhitimizdan lavhalar",
    
    // FAQ
    'faq.title': "Ko'p so'raladigan savollar",
    'faq.q1': 'Kurslar qachon boshlanadi?',
    'faq.a1': "Yangi guruhlar har oyning boshida ochiladi. Ro'yxatdan o'tish uchun biz bilan bog'laning.",
    'faq.q2': "To'lov qanday amalga oshiriladi?",
    'faq.a2': "To'lovni naqd, bank kartasi orqali yoki oylik to'lov rejasi bo'yicha amalga oshirish mumkin.",
    'faq.q3': 'Sinov darsi bormi?',
    'faq.a3': "Ha, birinchi dars bepul sinov darsi sifatida o'tkaziladi.",
    'faq.q4': "Qaysi yoshdagi o'quvchilar qabul qilinadi?",
    'faq.a4': "Biz 10 yoshdan kattalarni qabul qilamiz. Bolalar va kattalar uchun alohida guruhlar mavjud.",
    
    // Contact
    'contact.title': "Biz bilan bog'laning",
    'contact.subtitle': "Savollaringiz bormi? Biz bilan bog'laning!",
    'contact.name': 'Ismingiz',
    'contact.phone': 'Telefon raqamingiz',
    'contact.course': "Qaysi kursga qiziqasiz?",
    'contact.message': 'Xabaringiz (ixtiyoriy)',
    'contact.submit': 'Yuborish',
    'contact.success': "Murojaatingiz yuborildi! Tez orada bog'lanamiz.",
    'contact.select': 'Kursni tanlang',
    
    // Footer
    'footer.address': 'GULISTON SHAHAR, BEELINE KO\'CHA OXIRI',
    'footer.rights': 'Barcha huquqlar himoyalangan',
    'footer.slogan': "Bilim - bu qilishdir!",
  },
  en: {
    // Navigation
    'nav.courses': 'Courses',
    'nav.teachers': 'Teachers',
    'nav.results': 'Results',
    'nav.contact': 'Contact',
    'nav.about': 'About Us',
    
    // Hero
    'hero.motto': 'WISDOM - IS DOING!',
    'hero.subtitle': 'The best English language center in Sirdarya region',
    'hero.cta': 'View Courses',
    'hero.contact': 'Contact Us',
    
    // Courses
    'courses.title': 'Our Courses',
    'courses.subtitle': 'Professional English education for every level',
    'courses.general.title': 'General English',
    'courses.general.desc': 'General English course from beginner to advanced level. Learn grammar, speaking and listening skills.',
    'courses.ielts.title': 'IELTS Preparation',
    'courses.ielts.desc': 'IELTS exam preparation course. Deep study of Reading, Writing, Listening and Speaking sections.',
    'courses.cefr.title': 'CEFR Certificate',
    'courses.cefr.desc': 'CEFR certification course for A1-C2 levels. Education matching international standards.',
    'courses.duration': 'Duration',
    'courses.level': 'Level',
    
    // Teachers
    'teachers.title': 'Our Teachers',
    'teachers.subtitle': 'Experienced and qualified teaching team',
    'teachers.experience': 'years experience',
    
    // Results
    'results.title': 'Our Students Results',
    'results.subtitle': 'Successful graduates and their achievements',
    'results.students': 'Total Students',
    'results.ielts': 'IELTS 7.0+ Scores',
    'results.years': 'Years Experience',
    'results.satisfaction': 'Client Satisfaction',
    
    // Why Camelot
    'why.title': 'Why Camelot?',
    'why.subtitle': 'Reasons why we are the best education center in Sirdarya region',
    'why.quality.title': 'Quality Education',
    'why.quality.desc': 'Modern teaching methods matching international standards',
    'why.teachers.title': 'Qualified Teachers',
    'why.teachers.desc': 'Experienced teachers with CELTA/DELTA certificates',
    'why.environment.title': 'Comfortable Environment',
    'why.environment.desc': 'Modern equipped comfortable classrooms',
    'why.results.title': 'Guaranteed Results',
    'why.results.desc': 'Hundreds of successful students and high score results',
    
    // Gallery
    'gallery.title': 'Our Center',
    'gallery.subtitle': 'Glimpses of our modern learning environment',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.q1': 'When do courses start?',
    'faq.a1': 'New groups open at the beginning of each month. Contact us to register.',
    'faq.q2': 'How can I make payment?',
    'faq.a2': 'Payment can be made in cash, by bank card, or through monthly payment plan.',
    'faq.q3': 'Is there a trial class?',
    'faq.a3': 'Yes, the first class is held as a free trial class.',
    'faq.q4': 'What age students are accepted?',
    'faq.a4': 'We accept students from age 10 and above. Separate groups for children and adults.',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Have questions? Get in touch with us!',
    'contact.name': 'Your Name',
    'contact.phone': 'Your Phone Number',
    'contact.course': 'Which course interests you?',
    'contact.message': 'Your Message (optional)',
    'contact.submit': 'Submit',
    'contact.success': 'Your request has been sent! We will contact you soon.',
    'contact.select': 'Select a course',
    
    // Footer
    'footer.address': 'GULISTON CITY, END OF BEELINE STREET',
    'footer.rights': 'All rights reserved',
    'footer.slogan': 'Wisdom is doing!',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('uz');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
