// src/admin/components/BannerForm.tsx
import React, { useState, useEffect } from 'react';
import Button from '../../ui/Button';
import { Banner } from '../../types';
import { Trash2 } from 'lucide-react';

interface BannerFormProps {
  banner?: Banner;
  onSave: (
    banner: Partial<Banner>,
    imageFile: File | null
  ) => void;
  onCancel: () => void;
}

const BannerForm: React.FC<BannerFormProps> = ({ banner, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Banner>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (banner) {
      setFormData(banner);
      if (banner.image) {
        setImagePreviewUrl(banner.image);
      }
    } else {
      setFormData({ link: '', image: '', bg_color: 'bg-red-500' });
      setImageFile(null);
      setImagePreviewUrl(null);
    }
  }, [banner]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    if (file) {
      const newPreviewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(newPreviewUrl);
    } else {
      setImagePreviewUrl(null);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreviewUrl(null);
    setFormData(prev => ({ ...prev, image: '' }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, imageFile);
  };
  
  const formTitle = formData.id ? 'Edit Banner' : 'Add New Banner';
  const submitButtonText = formData.id ? 'Update Banner' : 'Add Banner';
  
  const colorOptions = [
    { value: 'bg-white', label: 'Solid White' },
    { value: 'bg-black', label: 'Solid Black' },
    { value: 'bg-red-500', label: 'Solid Red' },
    { value: 'bg-blue-500', label: 'Solid Blue' },
    { value: 'bg-yellow-500', label: 'Solid Yellow' },
    { value: 'bg-purple-500', label: 'Solid Purple' },
    { value: 'bg-green-500', label: 'Solid Green' },
    { value: 'bg-orange-500', label: 'Solid Orange' },
    { value: 'bg-pink-500', label: 'Solid Pink' },
    { value: 'bg-teal-500', label: 'Solid Teal' },
    { value: 'bg-cyan-500', label: 'Solid Cyan' },
    { value: 'bg-indigo-500', label: 'Solid Indigo' },
    { value: 'bg-gray-800', label: 'Solid Dark Gray' },
    { value: 'bg-gradient-to-r from-red-500 to-pink-500', label: 'Red-Pink Gradient' },
    { value: 'bg-gradient-to-r from-blue-500 to-green-400', label: 'Blue-Green Gradient' },
    { value: 'bg-gradient-to-r from-purple-500 to-indigo-500', label: 'Purple-Indigo Gradient' },
    { value: 'bg-gradient-to-r from-yellow-500 to-orange-500', label: 'Yellow-Orange Gradient' },
    { value: 'bg-gradient-to-r from-teal-500 to-cyan-500', label: 'Teal-Cyan Gradient' },
    { value: 'bg-gradient-to-r from-fuchsia-500 to-purple-500', label: 'Fuchsia-Purple Gradient' },
    { value: 'bg-gradient-to-r from-green-500 to-blue-500', label: 'Green-Blue Gradient' },
  ];

  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-8">
      <h2 className="text-xl font-semibold mb-4">{formTitle}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Banner Image</label>
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="admin-form-input"
            />
            { (imageFile || formData.image) && (
              <button
                type="button"
                onClick={removeImage}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
          {imagePreviewUrl && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700">Image Preview:</h3>
              <img src={imagePreviewUrl} alt="Banner Preview" className="mt-2 w-40 h-40 object-contain border rounded-md" />
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Background Color</label>
          <select
            name="bg_color"
            value={formData.bg_color || ''}
            onChange={handleInputChange}
            className="admin-form-input"
            required
          >
            <option value="">Select a background</option>
            {colorOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        
        {formData.bg_color && (
            <div className={`w-full h-16 rounded-md shadow-inner mb-4 flex items-center justify-center ${formData.bg_color}`}>
                <span className="text-sm font-semibold text-white mix-blend-difference">Color Preview</span>
            </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Banner Link</label>
          <input
            type="text"
            name="link"
            value={formData.link || ''}
            onChange={handleInputChange}
            className="admin-form-input"
            placeholder={`Banner Link`}
            required
          />
        </div>
        
        <div className="flex space-x-4">
          <Button
            type="submit"
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            {submitButtonText}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BannerForm;