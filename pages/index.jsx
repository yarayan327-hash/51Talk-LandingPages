import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import PainPoints from '../components/PainPoints';
import Methodology from '../components/Methodology';
import Courses from '../components/Courses';
import Services from '../components/Services';
import Teachers from '../components/Teachers';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import LanguageSelector from '../components/LanguageSelector';

export default function Home() {
  const [language, setLanguage] = useState('zh');
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent(language);
  }, [language]);

  const loadContent = async (lang) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/content?lang=${lang}`);
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      } else {
        // Fallback to static content
        const staticContent = await import(`../content/generated/content_${lang}.json`);
        setContent(staticContent.default);
      }
    } catch (error) {
      console.error('Failed to load content:', error);
      // Fallback to static import
      try {
        const staticContent = await import(`../content/generated/content_${lang}.json`);
        setContent(staticContent.default);
      } catch (fallbackError) {
        console.error('Failed to load static content:', fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <LanguageSelector
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />
      <Hero content={content.Hero} language={language} />
      <PainPoints content={content.PainPoints} language={language} />
      <Methodology content={content.Methodology} language={language} />
      <Courses content={content.CourseSystem} language={language} />
      <Services content={content.Services} language={language} />
      <Teachers content={content.Teachers} language={language} />
      <Testimonials content={content.About} language={language} />
      <CTA content={content.CTA} language={language} />
      <Footer language={language} />
    </div>
  );
}