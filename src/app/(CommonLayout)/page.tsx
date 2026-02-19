import HeroSection from '@/components/layout/Hero';
import CategorySection from '@/components/layout/Services';
import AboutSection from '@/components/layout/AboutSection';
import ServicesSection from '@/components/layout/ServicesSection';
import TutorSection from '@/components/layout/TutorSection';

export default async function Home() {
  return (
    <div className="">
      <HeroSection></HeroSection>
      <TutorSection></TutorSection>
      <ServicesSection></ServicesSection>
      <CategorySection></CategorySection>
      <AboutSection></AboutSection>
    </div>
  );
}
