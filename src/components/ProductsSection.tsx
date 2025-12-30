import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../ui/ProductCard';
import { Product } from '../types';
import { supabase } from '../api/supabaseClient';
import ContentWrapper from './ContentWrapper';

const FEATURED_PRODUCTS_COUNT = 20;

const ProductsSection: React.FC = () => {
  const navigate = useNavigate();
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false })
      .range(0, FEATURED_PRODUCTS_COUNT - 1); // Fetch 20 products

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setDisplayedProducts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="bg-white py-5">
      <ContentWrapper>
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Featured Products
        </h2>
        
        {loading && displayedProducts.length === 0 ? (
          <div className="text-center text-gray-500">Loading products...</div>
        ) : (
          <div className="products-grid">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} showButton={true} />
            ))}
          </div>
        )}
        
        <div className="text-center">
          <button
            onClick={() => navigate('/products')}
            className="bg-red-500 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            View All Products
          </button>
        </div>
      </ContentWrapper>
    </section>
  );
};

export default ProductsSection;