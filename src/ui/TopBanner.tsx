import React from 'react';

interface TopBannerProps {
  image: string;
  link: string;
}

const TopBanner: React.FC<TopBannerProps> = ({ image, link }) => {
  return (
    <a href={link} className="block w-full h-auto overflow-hidden  shadow-lg">
      <img
        src={image}
        alt="Top promotional banner"
        className="w-full h-full object-cover"
      />
    </a>
  );
};

export default TopBanner;