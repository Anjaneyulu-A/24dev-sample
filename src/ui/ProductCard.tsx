// src/ui/ProductCard.tsx
import React, { useState } from 'react';
import { Product } from '../types';
import { Share2, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  showButton?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showButton = false }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copyStatus, setCopyStatus] = useState('Copy Link');

  const renderStars = (rating: number) => {
    const starPercentage = (rating / 5) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

    return (
      <div className="relative inline-block">
        <div className="flex text-gray-300">
          {'★'.repeat(5)}
        </div>
        <div
          className="absolute top-0 left-0 overflow-hidden flex text-yellow-500"
          style={{ width: starPercentageRounded }}
        >
          {'★'.repeat(5)}
        </div>
      </div>
    );
  };

  // CRITICAL FIX: Safely parse and format the price string
  const formatPrice = (price: string): string => {
    // 1. Clean the string: remove non-digit/non-dot/non-comma characters and replace first comma with a dot for European formats if necessary (though usually 'Rs. X' implies Indian format). We'll stick to a simple clean.
    const cleanedPrice = price.replace(/[^0-9.]/g, '');
    const numericPrice = parseFloat(cleanedPrice);
    
    // Fallback if price cannot be parsed
    if (isNaN(numericPrice)) {
      return price; 
    }

    // Format the cleaned numeric value to INR
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(numericPrice);
  };
  
  const colSpanClass = product.colSpan ? `md:col-span-${product.colSpan}` : '';

  const handleCopyLink = () => {
    // The productLink property will now contain the Amazon affiliate link
    const productUrl = product.productLink;
    navigator.clipboard.writeText(productUrl).then(() => {
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy Link'), 2000);
      setShowShareMenu(false);
    }).catch(err => {
      console.error('Failed to copy link:', err);
      setCopyStatus('Failed');
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this product: ${product.name}`,
          url: product.productLink,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopyLink();
    }
    setShowShareMenu(false);
  };

  // Handle cases where product.price might be a number from the new API structure
  const priceString = typeof product.price === 'number' ? product.price.toString() : product.price;

  return (
    <div className={`group product-card ${colSpanClass}`}>
      <div className="relative p-2">
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="absolute top-2 right-2 p-1 rounded-full bg-gray-50/70 text-gray-800 hover:bg-gray-100/90 transition-colors z-10"
          aria-label="Share product"
        >
          <Share2 size={20} />
        </button>

        {showShareMenu && (
          <div className="absolute top-10 right-2 w-36 bg-white rounded-md shadow-lg py-1 z-20">
            <button
              onClick={handleCopyLink}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
            >
              <LinkIcon size={16} />
              <span>{copyStatus}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
            >
              <Share2 size={16} />
              <span>Share</span>
            </button>
          </div>
        )}
        
        {/* Link to external product page */}
        <a href={product.productLink} target="_blank" rel="noopener noreferrer">
          <img
            src={`${product.image}?width=400`}
            alt={product.name}
            className="w-full h-28 object-contain"
          />
        </a>
      </div>

      <div className="p-3 text-center flex-1 flex flex-col justify-between">
        <div>
          <h3 className="product-card-title">{product.name}</h3>
          <div className="flex items-center justify-center mb-1">
            <span className="text-sm">
              {renderStars(product.rating)}
            </span>
            <span className="text-gray-500 text-xs ml-1">{product.rating.toFixed(1)}</span>
          </div>
          <span className="product-card-price">
            {formatPrice(priceString)}
          </span>
        </div>
      </div>

      {showButton && (
        <a
          href={product.productLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-b-lg font-semibold transition-colors duration-300 text-center block text-sm"
        >
          View Details
        </a>
      )}
    </div>
  );
};

export default React.memo(ProductCard);