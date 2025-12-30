import React from 'react';

interface PromoGridCardProps {
  title: string;
  link: string;
  subCards: { id: number; image: string; title: string; link: string; }[];
}

const PromoGridCard: React.FC<PromoGridCardProps> = ({ title, link, subCards }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col overflow-hidden">
      <h3 className="p-4 text-xl font-bold text-gray-900">{title}</h3>
      <div className="grid grid-cols-2 gap-px bg-gray-200 flex-grow">
        {subCards.map((card) => (
          <a key={card.id} href={card.link} className="bg-white hover:bg-gray-50 transition-colors duration-200">
            <div className="flex flex-col items-center justify-center p-3">
              <img
                src={card.image}
                alt={card.title}
                className="w-24 h-20 object-contain mb-2"
              />
              <span className="text-sm text-gray-800 text-center">{card.title}</span>
            </div>
          </a>
        ))}
      </div>
      <a href={link} className="block p-4 text-sm font-semibold text-blue-500 hover:text-red-500 transition-colors">
        Shop Now →
      </a>
    </div>
  );
};

export default PromoGridCard;