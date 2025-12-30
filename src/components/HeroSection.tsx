// src/components/HeroSection.tsx
import React from 'react';
import CarouselBanner from '../ui/CarouselBanner';
// import SmallCardCarousel from '../ui/SmallCardCarousel';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-white">
      <CarouselBanner/>
    </section>
  );
};

export default HeroSection;