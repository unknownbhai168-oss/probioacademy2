import React, { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { BrandPreloader } from './components/BrandPreloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { TeacherProfile } from './components/TeacherProfile';
import { Courses } from './components/Courses';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TeachingMethodology } from './components/TeachingMethodology';
import { StudentExperience } from './components/StudentExperience';
import { AdmissionForm } from './components/AdmissionForm';
import { Location } from './components/Location';
import { Contact } from './components/Contact';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

export function App() {
  const [selectedCourseTitle, setSelectedCourseTitle] = useState<string>('');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectCourseAndBook = (courseTitle: string) => {
    setSelectedCourseTitle(courseTitle);
    scrollToSection('admission');
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#F8F9FC] text-[#202A3A]">
        <BrandPreloader />
        <Navbar onBookClassClick={() => scrollToSection('admission')} />

        <main className="flex-1">
          <Hero
            onExploreCourses={() => scrollToSection('courses')}
            onBookDemo={() => scrollToSection('admission')}
          />
          <About />
          <TeacherProfile />
          <Courses onSelectCourseAndBook={handleSelectCourseAndBook} />
          <WhyChooseUs />
          <TeachingMethodology />
          <StudentExperience />
          <AdmissionForm selectedCourseTitle={selectedCourseTitle} />
          <Location />
          <Contact />
          <FAQ />
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </MotionConfig>
  );
}

export default App;
