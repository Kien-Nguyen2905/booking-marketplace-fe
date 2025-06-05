'use client';
import React from 'react';
import {
  DestinationShowcase,
  RecommendedAccommodations,
} from '@/features/home/components';
import { SectionImage } from '@/features/home/components/SectionImage';
import { PromoCodeSlider } from '@/features/home/components/PromoCodeSlider';
import { SearchBanner } from '@/features/home/components/SearchBanner';

const Homepage = () => {
  return (
    <div className="flex flex-col gap-8">
      <SearchBanner />
      <div className="container mx-auto px-4 pt-15">
        <PromoCodeSlider />
      </div>
      <RecommendedAccommodations />

      <div className="container mx-auto px-4">
        <DestinationShowcase />
      </div>
      <SectionImage />
    </div>
  );
};

export default Homepage;
