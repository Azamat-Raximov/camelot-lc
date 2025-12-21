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
    'nav.faq': 'FAQ',
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
    'results.ielts': "2025 yildagi IELTS natijalar",
    'results.years': 'Yillik tajriba',
    'results.satisfaction': "O'quvchilar mamnuniyati",
    'results.cefr': "CEFR natijalari",
    
    // Why Camelot
    'why.title': 'Nega aynan Camelot?',
    'why.subtitle': "Sirdaryo viloyatida eng yaxshi ta'lim markazi bo'lishimizning sabablari",
    'why.freeTeacher.title': "Bepul ikkinchi o'qituvchi",
    'why.freeTeacher.desc': "Agar mavzuni yetarli darajada o'zlashtira olmagan bo'lsangiz, yordamchi o'qituvchilar doimo yoningizda bo'ladi va siz xohlagan mavzuni yana bir bor tushuntirib berishadi.",
    'why.events.title': 'Tadbirlar',
    'why.events.desc': "Camelot Talk, Challenge'lar va boshqa qiziqarli tadbirlar muntazam ravishda o'tkazib boriladi.",
    'why.testCenter.title': 'Test Markazi',
    'why.testCenter.desc': "Alohida test markazimiz mavjud. Bu markazda siz nafaqat MOCK imtihonlarini, balki haqiqiy IELTS imtihoniga maksimal darajada o'xshash sharoitda test topshirish imkoniyatiga ega bo'lasiz.",
    'why.teachers.title': "Tajribali o'qituvchilar",
    'why.teachers.desc': "Har bir o'qituvchimiz maxsus o'qitish kurslarini muvaffaqiyatli tamomlagan va ularning IELTS natijalari 8.5 gacha yetadi.",
    'why.coworking.title': 'Co-working zonalar',
    'why.coworking.desc': "Har bir filialimizda o'quvchilarimiz uchun maxsus co-working zonalar tashkil etilgan. Bu yerda siz darslardan bo'sh vaqtingizda ingliz tilini mustaqil ravishda o'rganishingiz mumkin.",
    
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
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.about': 'About Us',
    
    // Hero
    'hero.motto': 'WISDOM - IS DOING!',
    'hero.subtitle': 'English language center in Sirdarya region',
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
    'results.ielts': '2025 IELTS Results',
    'results.years': 'Years Experience',
    'results.satisfaction': 'Student Satisfaction',
    'results.cefr': 'CEFR Results',
    
    // Why Camelot
    'why.title': 'Why Camelot?',
    'why.subtitle': 'Reasons why we are the best education center in Sirdarya region',
    'why.freeTeacher.title': 'Free Assistant Teacher',
    'why.freeTeacher.desc': "If you haven't fully grasped a topic, assistant teachers are always available to explain any subject again.",
    'why.events.title': 'Events',
    'why.events.desc': 'Camelot Talk, Challenges and other exciting events are held regularly.',
    'why.testCenter.title': 'Test Center',
    'why.testCenter.desc': 'We have a dedicated test center where you can take MOCK exams and tests in conditions as close as possible to the real IELTS exam.',
    'why.teachers.title': 'Experienced Teachers',
    'why.teachers.desc': 'Each of our teachers has successfully completed special training courses and their IELTS scores reach up to 8.5.',
    'why.coworking.title': 'Co-working Zones',
    'why.coworking.desc': 'Each branch has special co-working zones for our students. Here you can study English independently during your free time from classes.',
    
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

// Keep a stable context reference across Vite Fast Refresh/HMR.
// Otherwise, the Provider can hold an old context instance while consumers import a new one,
// which triggers: "useLanguage must be used within a LanguageProvider".
const globalForLang = globalThis as unknown as {
  __camelot_language_context?: React.Context<LanguageContextType | undefined>;
};

const LanguageContext =
  globalForLang.__camelot_language_context ??
  createContext<LanguageContextType | undefined>(undefined);

globalForLang.__camelot_language_context = LanguageContext;
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
