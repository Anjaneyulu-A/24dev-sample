import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import Button from '../../ui/Button';
import { ProductCategory } from '../pages/Products';

interface ProductFormProps {
  product?: Product;
  categories: ProductCategory[];
  onSave: (product: Partial<Product>, setUploading: (value: boolean) => void) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, categories, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({ name: '', price: '', rating: 0, productLink: '', image: '', category: { id: '', name: '' } });
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'category_id') {
      const selectedCategory = categories.find(cat => cat.id === value);
      setFormData(prev => ({ ...prev, category: selectedCategory, category_id: selectedCategory?.id }));
    } else if (name === 'price') {
      const cleanedValue = value.replace(/[^0-9.]/g, '');
      setFormData(prev => ({ ...prev, price: cleanedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, setUploading);
  };
  
  const formTitle = product ? 'Edit Product' : 'Add New Product';
  const submitButtonText = uploading ? (product ? 'Updating...' : 'Adding...') : (product ? 'Update Product' : 'Add Product');

  const ratingOptions = Array.from({ length: 10 }, (_, i) => ((i + 1) * 0.5).toFixed(1));

  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-8">
      <h2 className="text-xl font-semibold mb-4">{formTitle}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleInputChange}
            required
            className="admin-form-input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="text"
            name="price"
            value={formData.price || ''}
            onChange={handleInputChange}
            required
            className="admin-form-input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <input
            type="number"
            name="rating"
            step="0.1"
            min="0.5"
            max="5.0"
            list="rating-options"
            value={formData.rating || ''}
            onChange={handleInputChange}
            required
            className="admin-form-input"
          />
          <datalist id="rating-options">
            {ratingOptions.map(option => (
              <option key={option} value={option}></option>
            ))}
          </datalist>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Link</label>
          <input
            type="text"
            name="productLink"
            value={formData.productLink || ''}
            onChange={handleInputChange}
            required
            className="admin-form-input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image || ''}
            onChange={handleInputChange}
            required
            className="admin-form-input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category_id"
            value={formData.category?.id || ''}
            onChange={handleInputChange}
            className="admin-form-input"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex space-x-4">
          <Button
            type="submit"
            disabled={uploading}
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            {submitButtonText}
          </Button>
          {product && (
            <Button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;