import React from 'react';

const PromoBanners: React.FC = () => {
  const banners = [
    {
      id: 1,
      title: 'Flash Sale',
      subtitle: 'Up to 50% Off',
      description: 'Limited time offer on smartphones',
      bgColor: 'bg-gradient-to-br from-purple-400 to-pink-500',
      textColor: 'text-white'
    },
    {
      id: 2,
      title: 'New Arrivals',
      subtitle: 'Latest Tech',
      description: 'Discover cutting-edge gadgets',
      bgColor: 'bg-gradient-to-br from-blue-500 to-green-400',
      textColor: 'text-white'
    },
    {
      id: 3,
      title: 'Premium Deals',
      subtitle: 'Exclusive Offers',
      description: 'Best prices on premium brands',
      bgColor: 'bg-gradient-to-br from-orange-400 to-red-500',
      textColor: 'text-white'
    },
    {
      id: 4,
      title: 'Gaming Zone',
      subtitle: 'Power Up',
      description: 'Gaming laptops & accessories',
      bgColor: 'bg-gradient-to-br from-green-400 to-blue-500',
      textColor: 'text-white'
    },
    {
      id: 5,
      title: 'Audio Fest',
      subtitle: 'Sound Perfect',
      description: 'Headphones & speakers sale',
      bgColor: 'bg-gradient-to-br from-pink-400 to-purple-500',
      textColor: 'text-white'
    },
    {
      id: 6,
      title: 'Smart Home',
      subtitle: 'Future Living',
      description: 'IoT devices & smart gadgets',
      bgColor: 'bg-gradient-to-br from-teal-400 to-cyan-500',
      textColor: 'text-white'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Special Offers & Promotions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`${banner.bgColor} ${banner.textColor} rounded-xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden`}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
                <h4 className="text-xl font-semibold mb-3 opacity-90">{banner.subtitle}</h4>
                <p className="text-sm opacity-80 mb-4">{banner.description}</p>
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg font-semibold transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;