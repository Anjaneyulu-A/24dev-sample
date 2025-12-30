// src/components/SearchPage.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
// Removed: import { supabase } from '../api/supabaseClient'; 
// We are now calling a secure Edge Function proxy instead.

import { Product } from '../types';
import ProductCard from '../ui/ProductCard';
import ContentWrapper from './ContentWrapper';
import Seo from './Seo';

// Define a list of common product categories for structured searching
const productCategories = ['mobiles', 'laptops', 'televisions', 'refrigerators', 'ac'];

// Utility function to parse the search query and extract filters
const parseQuery = (query: string) => {
  const parsed = {
    keywords: query,
    category: '', 
    priceFilter: { min: 0, max: 9999999 },
  };

  const words = query.toLowerCase().split(' ');
  const keywordsToKeep: string[] = [];

  words.forEach((word, index) => {
    if (productCategories.includes(word)) {
      parsed.category = word;
    }
    // Check for price filters
    else if (word === 'under' && words[index + 1]) {
      const price = parseInt(words[index + 1].replace(/[^0-9]/g, ''));
      if (!isNaN(price)) {
        parsed.priceFilter.max = price;
      }
    } else if (word === 'over' && words[index + 1]) {
      const price = parseInt(words[index + 1].replace(/[^0-9]/g, ''));
      if (!isNaN(price)) {
        parsed.priceFilter.min = price;
      }
    } else if (isNaN(parseInt(word))) {
      keywordsToKeep.push(word);
    }
  });

  parsed.keywords = keywordsToKeep.join(' ').trim();
  const commonWords = ['best', 'top', 'new', 'for', 'a', 'an', 'the', 'is', 'in'];
  parsed.keywords = parsed.keywords
    .split(' ')
    .filter(word => !commonWords.includes(word))
    .join(' ');
  
  return parsed;
};

const SearchPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q');
  
  useEffect(() => {
    if (!query || query.trim() === '') {
      navigate('/', { replace: true });
      return;
    }

    const performAmazonSearch = async () => {
      setLoading(true);
      setSearchError('');
      setSearchResults(null);

      const parsed = parseQuery(query);
      const searchKeyword = parsed.keywords || query;

      try {
        // *** NEW: Call the secure Edge Function proxy ***
        const response = await fetch('/api/amazon-search', { // REPLACE with your actual Edge Function URL
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Pass the keyword and filters to the server
          body: JSON.stringify({ 
            keyword: searchKeyword, 
            category: parsed.category,
            priceFilter: parsed.priceFilter
          }),
        });

        if (!response.ok) {
          throw new Error('Search failed on the server side or PA API throttled the request.');
        }

        const rawData = await response.json();
        
        // Map the PA API response structure to your local 'Product' type
        const mappedProducts: Product[] = rawData.map((item: any) => ({
             // Assuming the server returns a clean array of objects
             id: item.ASIN || item.Id || item.id, // Use ASIN as ID
             name: item.title,
             price: item.priceFormatted || item.price, // Use formatted string for display
             image: item.imageUrl || item.image,
             rating: item.rating || 4.5, // Use a fallback rating if not available
             productLink: item.affiliateLink || item.productLink, // Use affiliate link
             price_numeric: item.priceNumeric, // Use numeric price for local filtering/sorting if needed
        }));
        
        setSearchResults(mappedProducts);
      } catch (error) {
        console.error('API Search Error:', error);
        setSearchError('Could not fetch live products. Please ensure the Amazon search function is configured correctly.');
        setSearchResults([]);
      }
      setLoading(false);
    };

    performAmazonSearch();
  }, [query, navigate]);

  const hasResults = searchResults && searchResults.length > 0;

  return (
    <>
      <Seo 
        title={`Search Results for "${query}" | 24TechBuy`}
        description={`Live product results for ${query} from Amazon.`}
      />
      <div className="min-h-screen bg-gray-50 py-16">
        <ContentWrapper>
          <h1 className="text-3xl font-bold mb-8 text-gray-900">
            Search Results for "{query}"
          </h1>
          
          {searchError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6">
                <p>{searchError}</p>
              </div>
          )}
          
          {loading ? (
            <div className="text-center text-gray-500 text-lg">Loading live products from Amazon...</div>
          ) : !hasResults ? (
            <div className="text-center text-gray-500 text-lg">
              No results found for "{query}" on Amazon.
            </div>
          ) : (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Live Products ({searchResults.length})</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} showButton={true} />
                ))}
              </div>
            </div>
          )}
        </ContentWrapper>
      </div>
    </>
  );
};

export default SearchPage;