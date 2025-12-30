// src/admin/pages/News.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../api/supabaseClient';
import { Newspaper } from 'lucide-react';
import { NewsArticle, NewsCategory } from '../../types';
import NewsForm from '../components/NewsForm';
import NewsTable from '../components/NewsTable';
import NewsPreview from '../components/NewsPreview';

const News: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');
  
  // State variables for preview and form data
  const [showPreview, setShowPreview] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<Partial<NewsArticle>>({});
  const [imageFilesToUpload, setImageFilesToUpload] = useState<(File | null)[]>(Array(3).fill(null));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');

    const { data: categoriesData, error: categoriesError } = await supabase
      .from('news_category')
      .select('*');

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
      setError('Failed to load categories.');
      setLoading(false);
      return;
    }

    setCategories(categoriesData || []);

    const { data: articlesData, error: articlesError } = await supabase
      .from('news_articles')
      .select('*, category:news_category(name, id)')
      .order('created_at', { ascending: false });

    if (articlesError) {
      console.error('Error fetching articles:', articlesError);
      setError('Failed to load articles.');
      setArticles([]);
    } else {
      setArticles(articlesData as NewsArticle[] || []);
    }
    setLoading(false);
  };
  
  const handleImageUpload = async (imageFile: File): Promise<string | null> => {
    if (!imageFile) return null;
    const fileName = `${Date.now()}-${imageFile.name}`;
    const { data, error } = await supabase.storage
      .from('news-images')
      .upload(fileName, imageFile);

    if (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image. Check your storage bucket and RLS policy.');
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('news-images')
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  };
  
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleEditClick = (article: NewsArticle) => {
    setEditingArticle(article);
    const articleForForm = { 
        ...article, 
        newslink: article.newslink?.[0] || '',
        image: article.image || []
    };
    setFormData(articleForForm);
    setIsAdding(true);
  };

  const handlePreview = (imageFiles: (File | null)[]) => {
    setImageFilesToUpload(imageFiles);
    
    // Create temporary image URLs for preview from newly selected files
    const tempImageUrls = (imageFiles || []).filter(Boolean).map(file => URL.createObjectURL(file));

    // Combine existing image URLs with new temporary ones for preview
    const combinedImagesForPreview = [...(formData.image?.filter(url => url && !url.startsWith('blob:')) || []), ...tempImageUrls];
    
    setFormData(prev => ({
        ...prev,
        image: combinedImagesForPreview
    }));

    setShowPreview(true);
  };

  const handleConfirmPost = async () => {
    setIsUploading(true);
    setError('');
    
    // Get existing valid URLs from formData.image
    const existingImageUrls = (formData.image?.filter(url => url && !url.startsWith('blob:')) || []);

    // Upload new images and add their URLs to the final list
    const uploadedImageUrls: string[] = [];
    if (imageFilesToUpload && imageFilesToUpload.length > 0) {
      for (const file of imageFilesToUpload) {
        if (file) {
          const url = await handleImageUpload(file);
          if (url) {
            uploadedImageUrls.push(url);
          } else {
            setIsUploading(false);
            return;
          }
        }
      }
    }
    
    const finalImageUrls = [...existingImageUrls, ...uploadedImageUrls];
    const articleSlug = generateSlug(formData.title || '');
    
    const payload = {
      title: formData.title,
      body_content: formData.body_content,
      excerpt: formData.excerpt || null,
      slug: articleSlug,
      category_id: formData.category?.id || null,
      newslink: formData.newslink ? [formData.newslink] : null,
      image: finalImageUrls.length > 0 ? finalImageUrls : null
    };
    
    if (formData.id) {
      const { error } = await supabase
        .from('news_articles')
        .update(payload)
        .eq('id', formData.id);
      
      if (error) {
        console.error('Error updating article:', error);
        setError('Failed to update article. Check your RLS policy.');
      } else {
        setEditingArticle(null);
        setIsAdding(false);
        setShowPreview(false);
        setFormData({});
        setImageFilesToUpload(null);
        fetchData();
      }
    } else {
      const { error } = await supabase.from('news_articles').insert([payload]);

      if (error) {
        console.error('Error adding article:', error);
        setError('Failed to add article. Check your RLS policy.');
      } else {
        setIsAdding(false);
        setShowPreview(false);
        setFormData({});
        setImageFilesToUpload(null);
        fetchData();
      }
    }
    setIsUploading(false);
  };

  const handleDeleteArticle = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setError('');
      const { error } = await supabase.from('news_articles').delete().eq('id', id);

      if (error) {
        console.error('Error deleting article:', error);
        setError('Failed to delete article. Check your RLS policy.');
      } else {
        fetchData();
      }
    }
  };
  
  const handleEditPreview = () => {
    setShowPreview(false);
  };
  
  const handleCancelForm = () => {
    setIsAdding(false);
    setEditingArticle(null);
    setFormData({});
    setImageFilesToUpload(null);
  }
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Newspaper size={32} className="text-red-500" />
          <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setIsAdding(!isAdding);
              setEditingArticle(null);
              setFormData({});
              setError('');
              setShowPreview(false);
              setImageFilesToUpload(null);
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            {isAdding || editingArticle || showPreview ? 'Cancel' : 'Add New Article'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {(isAdding || editingArticle) && !showPreview ? (
        <NewsForm
          formData={formData}
          setFormData={setFormData}
          categories={categories}
          onSave={handlePreview}
          onCancel={handleCancelForm}
        />
      ) : showPreview && Object.keys(formData).length > 0 ? (
        <NewsPreview
          article={formData}
          onEdit={handleEditPreview}
          onConfirm={handleConfirmPost}
          isUploading={isUploading}
        />
      ) : (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Existing Articles</h2>
          {loading ? (
            <div className="text-center text-gray-500">Loading articles...</div>
          ) : (
            <NewsTable
              articles={articles}
              editingArticle={editingArticle}
              onEdit={handleEditClick}
              onDelete={handleDeleteArticle}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default News;