import React from 'react';
import { PortfolioProvider } from '@/context/PortfolioContext';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AcademicsSection from '@/components/AcademicsSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import InternshipsSection from '@/components/InternshipsSection';
import CertificationsSection from '@/components/CertificationsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main>
          <HeroSection />
          <AcademicsSection />
          <SkillsSection />
          <ProjectsSection />
          <InternshipsSection />
          <CertificationsSection />
        </main>

        <Footer />
      </div>
    </PortfolioProvider>
  );
};

export default Index;
