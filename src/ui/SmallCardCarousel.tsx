import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const placeholders = [
  { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 },
];

const SmallCardCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 2;
  const maxIndex = Math.ceil(placeholders.length / cardsPerPage) - 1;

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === maxIndex ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-25 overflow-hidden">
      <div className="relative flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100 / cardsPerPage}%)` }}>
        {placeholders.map((card, index) => (
          <div key={card.id} className="flex-shrink-0 w-1/2 p-2">
            <div className="bg-white rounded-lg shadow-lg h-80 flex flex-col items-center justify-center">
              <h3 className="text-xl text-gray-400">Placeholder Card {index + 1}</h3>
            </div>
          </div>
        ))}
      </div>
      
      <button onClick={prevSlide} className="absolute top-1/2 left-4 -translate-y-1/2 p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors" aria-label="Previous cards">
        <ChevronLeft size={24} />
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 -translate-y-1/2 p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors" aria-label="Next cards">
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button 
            key={index} 
            onClick={() => setCurrentIndex(index)} 
            className={`w-3 h-1 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
            aria-label={`Go to card set ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SmallCardCarousel;