import React from 'react';
import { Product } from '../../types';
import { Edit, Trash2 } from 'lucide-react';
import ProductForm from './ProductForm';
import { ProductCategory } from '../pages/Products';

interface ProductTableProps {
  products: Product[];
  categories: ProductCategory[];
  editingProduct: Product | null;
  onEdit: (product: Product) => void;
  onSave: (product: Product, setUploading: (value: boolean) => void) => void;
  onDelete: (id: string) => void;
  onCancelEdit: () => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, categories, editingProduct, onEdit, onSave, onDelete, onCancelEdit }) => {
  const formatPrice = (price: string | number): string => {
    const numericPrice = typeof price === 'string'
      ? parseFloat(price.replace(/[^0-9.]/g, ''))
      : price;
    
    if (isNaN(numericPrice)) {
      return '';
    }

    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(numericPrice);
  };

  const formatProductName = (name: string): React.ReactNode => {
    const words = name.split(' ');
    const firstLine = words.slice(0, 5).join(' ');
    const remainingWords = words.slice(5);

    if (remainingWords.length > 0) {
      return (
        <>
          <span className="block">{firstLine}</span>
          <span className="block text-gray-500">{remainingWords[0]}...</span>
        </>
      );
    }
    return firstLine;
  };

  return (
    <div className="admin-table-container">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="admin-table-header">Image</th>
            <th scope="col" className="admin-table-header">Product Name</th>
            <th scope="col" className="admin-table-header">Category</th>
            <th scope="col" className="admin-table-header">Price</th>
            <th scope="col" className="admin-table-header">Rating</th>
            <th scope="col" className="admin-table-header">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <React.Fragment key={product.id}>
              <tr className={editingProduct?.id === product.id ? 'bg-red-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={product.image} alt={product.name} className="h-12 w-12 object-cover rounded" />
                </td>
                <td className="admin-table-cell-text-truncate">{formatProductName(product.name)}</td>
                <td className="admin-table-cell text-gray-500">
                  {product.category?.name || 'Uncategorized'}
                </td>
                <td className="admin-table-cell text-gray-500 whitespace-nowrap">{formatPrice(product.price)}</td>
                <td className="admin-table-cell text-gray-500">{product.rating}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
              {editingProduct?.id === product.id && (
                <tr>
                  <td colSpan={6}>
                    <ProductForm
                      product={editingProduct}
                      categories={categories}
                      onSave={onSave}
                      onCancel={onCancelEdit}
                    />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;