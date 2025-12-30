import React from 'react';
import HeroSection from './HeroSection';
import ProductsSection from './ProductsSection';
import NewsSection from './NewsSection';
import Seo from './Seo';
import { Helmet } from 'react-helmet-async';


const HomePage: React.FC = () => {
  return (
    <>
      <Seo 
        title="Buy All Electronics, Laptops, Gadgets & Tech Accessories Online | 24TechBuy"
        description="Shop the latest laptops, gadgets, and home tech accessories at 24TechBuy. Get genuine products, best prices, fast delivery, and a smooth online shopping experience across India."
      />
      <Helmet>
        {/* Google Search Console verification code */}
        <meta name="google-site-verification" content="9ENFiR0ZkQF26tkuETPgsiGZMo9k0Li21fPUEhycKy4"/>
      </Helmet>
      <HeroSection />
      <ProductsSection />
      <NewsSection />
    </>
  );
};

export default HomePage;

