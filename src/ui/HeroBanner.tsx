import React from 'react';
import { Banner } from '../types';

interface HeroBannerProps {
  banner: Banner;
}

const BannerImagePoster: React.FC<{ imageUrl: string }> = ({ imageUrl }) => (
  <img
    src={imageUrl}
    alt="Promotional poster"
    className="w-full h-full object-cover"
  />
);

const BannerCardContent: React.FC<{ title: string; subtitle: string; offer: string; imageUrl: string }> = ({ title, subtitle, offer, imageUrl }) => (
  <div className="flex flex-col h-full justify-end relative">
    <div className="space-y-2">
      <h3 className="text-sm font-bold opacity-80">{subtitle}</h3>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-3xl font-extrabold text-red-400">{offer}</p>
    </div>
    <img
      src={imageUrl}
      alt={title}
      className="w-24 h-24 object-contain absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4"
    />
  </div>
);

const BannerQuoteCard: React.FC<{ quote: string; author: string }> = ({ quote, author }) => (
  <div className="flex flex-col h-full justify-center text-center p-4">
    <p className="text-xl italic mb-4">"{quote}"</p>
    <p className="text-lg font-semibold">- {author}</p>
  </div>
);

const HeroBanner: React.FC<HeroBannerProps> = ({ banner }) => {
  const colSpanClass = banner.colSpan ? `md:col-span-${banner.colSpan}` : '';
  
  const renderBannerContent = () => {
    switch (banner.content.type) {
      case 'image-poster':
        return <BannerImagePoster imageUrl={banner.content.imageUrl} />;
      case 'card':
        return <BannerCardContent {...banner.content} />;
      case 'quote-card':
        return <BannerQuoteCard {...banner.content} />;
      default:
        return null;
    }
  };

  return (
    <a
      href={banner.link}
      className={`${banner.bgColor} ${colSpanClass} text-white rounded-xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden`}
    >
      {renderBannerContent()}
    </a>
  );
};

export default HeroBanner;