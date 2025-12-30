import { Product, NewsArticle } from '../types';

export const generateProducts = (start: number, count: number): Product[] => {
  const products: Product[] = [];
  const productNames = [
    'iPhone 15 Pro Max', 'Samsung Galaxy S24', 'MacBook Air M3', 'iPad Pro', 
    'Sony WH-1000XM5', 'Dell XPS 13', 'AirPods Pro', 'Apple Watch Series 9',
    'Surface Pro 9', 'ThinkPad X1 Carbon', 'Galaxy Watch 6', 'Pixel 8 Pro',
    'MacBook Pro M3', 'Surface Laptop 5', 'iPhone 14', 'Galaxy S23 Ultra',
    'iPad Air', 'Microsoft Surface Go', 'OnePlus 12', 'Google Pixel Buds',
    'HP Spectre x360', 'Asus ZenBook', 'Lenovo Yoga', 'Acer Swift',
    'Huawei MateBook', 'Sony Xperia', 'Nokia G22', 'Xiaomi 13 Pro',
    'Oppo Find X6', 'Vivo X90 Pro', 'Realme GT 3', 'Nothing Phone 2',
    'Steam Deck', 'Nintendo Switch', 'PS5 Controller', 'Xbox Series X',
    'ROG Phone 7', 'RedMagic 8 Pro', 'Black Shark 5', 'Legion Phone'
  ];
  
  const images = [
    'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400'
  ];
  
  for (let i = start; i < start + count; i++) {
    const priceValue = (Math.random() * 2000 + 100).toFixed(0);
    products.push({
      id: i + 1,
      name: productNames[i % productNames.length],
      price: `Rs. ${parseInt(priceValue).toLocaleString('en-IN')}`,
      image: images[i % images.length],
      rating: Math.floor(Math.random() * 2) + 4,
      productLink: `https://www.amazon.in/dp/B09${(i + 1).toString().padStart(3, '0')}`,
      colSpan: Math.random() > 0.8 ? 2 : undefined
    });
  }
  
  return products;
};

export const generateAllProducts = (): Product[] => {
  return generateProducts(0, 40);
};

export const generateNewsArticles = (start: number, count: number): NewsArticle[] => {
  const articles: NewsArticle[] = [];
  const titles = [
    'The Future of AI in Consumer Technology',
    'Best Smartphones of 2024: Complete Review',
    'MacBook vs Surface: Ultimate Comparison',
    'Wireless Headphones Buyer\'s Guide',
    'Gaming Laptops: Performance vs Portability',
    'Smart Home Devices You Need in 2024',
    'Electric Vehicle Technology Advances',
    'Foldable Phones: Are They Worth It?',
  ];
  
  const categories = ['Reviews', 'News', 'Guides', 'Analysis', 'Trends'];
  const images = [
    'https://images.pexels.com/photos/1181216/pexels-photo-1181216.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=400'
  ];
  
  for (let i = start; i < start + count; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    articles.push({
      id: i + 1,
      title: titles[i % titles.length],
      excerpt: 'Discover the latest insights and comprehensive analysis of cutting-edge technology trends that are shaping our digital future.',
      image: images[i % images.length],
      date: date.toLocaleDateString(),
      category: categories[i % categories.length],
      newsLink: i % 3 === 0 ? `https://www.techcrunch.com/news/${i+1}` : `/news/${i+1}`,
      colSpan: Math.random() > 0.8 ? 2 : undefined
    });
  }
  
  return articles;
};

export const generateAllNewsArticles = (): NewsArticle[] => {
  return generateNewsArticles(0, 40);
};