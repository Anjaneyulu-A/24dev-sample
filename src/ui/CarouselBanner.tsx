// src/ui/CarouselBanner.tsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../api/supabaseClient';
import { Banner } from '../types';

const CarouselBanner: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error('Error fetching banners:', error);
      } else {
        setBanners(data || []);
      }
      setLoading(false);
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex(prev => (prev === banners.length - 1 ? 0 : prev + 1));
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [banners, currentIndex]);
  
  if (loading) {
      return (
          // Updated: Added a max height to the loading placeholder
          <div className="flex items-center justify-center w-full max-h-80 bg-gray-200 rounded-xl animate-pulse">
              <span className="text-gray-500">Loading Banners...</span>
          </div>
      );
  }
  
  if (banners.length === 0) {
      return (
        // Updated: Added a max height to the empty state placeholder
        <div className="flex items-center justify-center w-full max-h-80 bg-gray-100 rounded-xl">
            <span className="text-gray-500">No banners available. Please add some in the admin panel.</span>
        </div>
      );
  }

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? banners.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === banners.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    // Updated: Changed fixed height to a dynamic one with a max-height limit
    <div className="relative w-full max-h-95 overflow-hidden"> 
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <a key={banner.id} href={banner.link} className="flex-shrink-0 w-full h-full">
            {banner.image ? (
                // Use object-contain to ensure the full image is visible
                <img src={banner.image} alt="Promotional banner" className="w-full h-full object-contain" />
            ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-xl">
                    <span>No Image</span>
                </div>
            )}
          </a>
        ))}
      </div>
      
      <button onClick={prevSlide} className="absolute top-1/2 left-4 -translate-y-1/2 p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors" aria-label="Previous slide">
        <ChevronLeft size={24} />
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 -translate-y-1/2 p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors" aria-label="Next slide">
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button 
            key={index} 
            onClick={() => setCurrentIndex(index)} 
            className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselBanner;