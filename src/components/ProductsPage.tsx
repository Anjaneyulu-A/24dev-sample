import React, { useState, useEffect } from 'react';
import ProductCard from '../ui/ProductCard';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { supabase } from '../api/supabaseClient';
import Seo from './Seo';

const ProductsPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error('Error fetching all products:', error);
      } else {
        setAllProducts(data || []);
      }
      setLoading(false);
    };

    fetchAllProducts();
  }, []);

  return (
    <>
        <Seo 
        title="Explore Our Products - Electronics, Laptops, Gadgets & Tech Accessories | 24TechBuy"
        description="Browse the full collection at 24TechBuy — discover laptops, electronics, and tech accessories from trusted brands. Find great deals, quality specs, and fast delivery across India."
      />
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="container mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <nav className="text-gray-600 mb-4" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link to="/" className="text-gray-600 hover:text-gray-800 transition-colors">
                Home
              </Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="flex items-center">
              <span className="text-gray-800 font-semibold">Products</span>
            </li>
          </ol>
        </nav>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-5">
          All Products
        </h1>
        
        {loading ? (
          <div className="text-center text-gray-500">Loading products...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 ">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} showButton={true} />
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ProductsPage;