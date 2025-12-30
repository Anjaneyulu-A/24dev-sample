import React, { useState, useEffect } from 'react';
import { supabase } from '../../api/supabaseClient';
import { Box } from 'lucide-react';
import { Product } from '../../types';
import Button from '../../ui/Button';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';

export interface ProductCategory {
  id: string;
  name: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');

    const { data: categoriesData, error: categoriesError } = await supabase
      .from('product_categories')
      .select('*');

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
      setError('Failed to load categories.');
      setLoading(false);
      return;
    }
    setCategories(categoriesData || []);

    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('*, category:product_categories(name, id)')
      .order('id', { ascending: false });

    if (productsError) {
      console.error('Error fetching products:', productsError);
      setError('Failed to load products.');
      setProducts([]);
    } else {
      setProducts(productsData || []);
    }
    setLoading(false);
  };

  const handleAddProduct = async (newProduct: Partial<Product>, setUploading: (value: boolean) => void) => {
    setUploading(true);
    setError('');
    
    // Create a new product object with category_id
    const { category, ...productPayload } = newProduct;

    const { error } = await supabase.from('products').insert([{ ...productPayload, category_id: category?.id }]);

    if (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product. Check your RLS policy.');
    } else {
      setIsAdding(false);
      fetchData(); // Refresh data
    }
    setUploading(false);
  };

  const handleUpdateProduct = async (updatedProduct: Product, setUploading: (value: boolean) => void) => {
    setUploading(true);
    setError('');

    // Create an update payload with category_id
    const { id, category, search_text_tsvector, ...updates } = updatedProduct;

    const { error } = await supabase
      .from('products')
      .update({
        ...updates,
        category_id: category?.id,
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product. Check your RLS policy.');
    } else {
      setEditingProduct(null);
      fetchData(); // Refresh data
    }
    setUploading(false);
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setError('');
      const { error } = await supabase.from('products').delete().eq('id', id);

      if (error) {
        console.error('Error deleting product:', error);
        setError('Failed to delete product. Check your RLS policy.');
      } else {
        fetchData(); // Refresh data
      }
    }
  };

  return (
    <div className="admin-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Box size={32} className="text-red-500" />
          <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
        </div>
        <Button
          onClick={() => {
            setIsAdding(!isAdding);
            setEditingProduct(null);
            setError('');
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          {isAdding ? 'Cancel' : 'Add New Product'}
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {isAdding && (
        <ProductForm
          categories={categories}
          onSave={handleAddProduct}
          onCancel={() => setIsAdding(false)}
        />
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Existing Products</h2>
        {loading ? (
          <div className="text-center text-gray-500">Loading products...</div>
        ) : (
          <ProductTable
            products={products}
            categories={categories}
            editingProduct={editingProduct}
            onEdit={setEditingProduct}
            onSave={handleUpdateProduct}
            onDelete={handleDeleteProduct}
            onCancelEdit={() => setEditingProduct(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Products;