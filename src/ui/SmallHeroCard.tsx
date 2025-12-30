import React from 'react';

interface SmallHeroCardProps {
  title: string;
  link: string;
  image?: string;
}

const SmallHeroCard: React.FC<SmallHeroCardProps> = ({ title, link, image }) => {
  return (
    <a
      href={link}
      className="small-hero-card"
    >
      <div className="flex flex-col h-full">
        {image && (
          <div className="flex justify-center items-center h-40 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <h3 className="flex-1 p-4 text-lg font-bold text-gray-900 line-clamp-2 md:text-xl">
          {title}
        </h3>
      </div>
    </a>
  );
};

export default SmallHeroCard;