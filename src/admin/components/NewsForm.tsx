// src/admin/components/NewsForm.tsx
import React, { useState, useEffect } from 'react';
import Button from '../../ui/Button';
import { NewsArticle, NewsCategory } from '../../types';
import { Trash2 } from 'lucide-react';

interface NewsFormProps {
  formData: Partial<NewsArticle>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<NewsArticle>>>;
  categories: NewsCategory[];
  onSave: (imageFiles: (File | null)[]) => void;
  onCancel: () => void;
}

const NewsForm: React.FC<NewsFormProps> = ({ formData, setFormData, categories, onSave, onCancel }) => {
  const [imageFiles, setImageFiles] = useState<(File | null)[]>(Array(3).fill(null));
  
  useEffect(() => {
    setImageFiles(Array(3).fill(null));
  }, [formData.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'category_id') {
      const selectedCategory = categories.find(cat => cat.id === value);
      setFormData(prev => ({ ...prev, category: selectedCategory, category_id: selectedCategory?.id }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0] || null;
    setImageFiles(prev => {
        const newFiles = [...prev];
        newFiles[index] = file;
        return newFiles;
    });

    if (file && formData.image && formData.image[index]) {
      setFormData(prev => {
          const newImageUrls = [...(prev.image || [])];
          newImageUrls[index] = '';
          return { ...prev, image: newImageUrls };
      });
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => {
      const newFiles = [...prev];
      newFiles[index] = null;
      return newFiles;
    });
    setFormData(prev => {
      const newImageUrls = [...(prev.image || [])];
      newImageUrls[index] = '';
      return { ...prev, image: newImageUrls };
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(imageFiles);
  };
  
  const formTitle = formData.id ? 'Edit Article' : 'Add New Article';
  const submitButtonText = formData.id ? "Review Update" : "Review Post";

  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-8">
      <h2 className="text-xl font-semibold mb-4">{formTitle}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title*</label>
          <input
            type="text"
            name="title"
            value={formData.title || ''}
            onChange={handleInputChange}
            required
            className="admin-form-input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Body Content*</label>
          <textarea
            name="body_content"
            rows={8}
            value={formData.body_content || ''}
            onChange={handleInputChange}
            required
            className="admin-form-input"
            placeholder={`Enter your article body content here.
To embed images (Image 2 and Image 3), use these placeholders:
[IMAGE_2_LEFT] or [IMAGE_2_RIGHT]
[IMAGE_3_LEFT] or [IMAGE_3_RIGHT]

Example:
This is the first paragraph.
[IMAGE_2_RIGHT]
Here is some more text flowing around Image 2.
[IMAGE_3_LEFT]
And finally, the last paragraph.`}
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Excerpt (Optional)</label>
          <input
            type="text"
            name="excerpt"
            value={formData.excerpt || ''}
            onChange={handleInputChange}
            className="admin-form-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Article Images (Max 3)</label>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <input
                type="file"
                name={`image-${index}`}
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
                className="admin-form-input"
              />
              { (imageFiles[index] || (formData.image && formData.image[index])) && (
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">News Link (Optional)</label>
          <input
            type="text"
            name="newslink"
            value={formData.newslink || ''}
            onChange={handleInputChange}
            className="admin-form-input"
            placeholder={`News Link`}
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

export default NewsForm;