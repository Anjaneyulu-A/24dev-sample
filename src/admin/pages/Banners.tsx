// src/admin/pages/Banners.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../api/supabaseClient';
import { Image } from 'lucide-react';
import { Banner } from '../../types';
import BannerForm from '../components/BannerForm';
import BannerTable from '../components/BannerTable';
import Button from '../../ui/Button';

const Banners: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');
  const MAX_BANNERS = 8; // Define the maximum number of banners

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');

    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching banners:', error);
      setError('Failed to load banners.');
      setBanners([]);
    } else {
      setBanners(data || []);
    }
    setLoading(false);
  };

  const handleImageUpload = async (imageFile: File): Promise<string | null> => {
    if (!imageFile) return null;
    const fileName = `${Date.now()}-${imageFile.name}`;
    const { error } = await supabase.storage
      .from('banner-images')
      .upload(fileName, imageFile);

    if (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image. Check your storage bucket and RLS policy.');
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('banner-images')
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  };

  const handleSave = async (
    bannerData: Partial<Banner>,
    imageFile: File | null
  ) => {
    setError('');
    
    // Check if the banner limit has been reached for new banners
    if (!bannerData.id && banners.length >= MAX_BANNERS) {
        setError(`You have reached the maximum limit of ${MAX_BANNERS} banners.`);
        return;
    }

    let imageUrl: string | null = null;

    if (imageFile) {
      imageUrl = await handleImageUpload(imageFile);
      if (!imageUrl) return;
    }

    if (bannerData.id) { // Update
      const payload = {
        link: bannerData.link,
        image: imageUrl ? imageUrl : (bannerData.image || null),
        bg_color: bannerData.bg_color,
      };
      const { error } = await supabase
        .from('banners')
        .update(payload)
        .eq('id', bannerData.id);

      if (error) {
        console.error('Error updating banner:', error);
        setError('Failed to update banner.');
      } else {
        setEditingBanner(null);
        setIsAdding(false);
        fetchData();
      }
    } else { // Add new
      if (!imageUrl) {
        setError('Please upload an image for the new banner.');
        return;
      }
      const payload = {
        link: bannerData.link,
        image: imageUrl,
        bg_color: bannerData.bg_color,
      };
      const { error } = await supabase.from('banners').insert([payload]);
      
      if (error) {
        console.error('Error adding banner:', error);
        setError('Failed to add banner.');
      } else {
        setIsAdding(false);
        fetchData();
      }
    }
  };

  const handleDeleteBanner = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      setError('');
      const { error } = await supabase.from('banners').delete().eq('id', id);

      if (error) {
        console.error('Error deleting banner:', error);
        setError('Failed to delete banner.');
      } else {
        fetchData();
      }
    }
  };
  
  const handleEditClick = (banner: Banner) => {
    setEditingBanner(banner);
    setIsAdding(true);
  };
  
  const handleCancel = () => {
      setIsAdding(false);
      setEditingBanner(null);
  };

  const canAddMoreBanners = banners.length < MAX_BANNERS;

  return (
    <div className="admin-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Image size={32} className="text-red-500" />
          <h1 className="text-3xl font-bold text-gray-900">Banner Management</h1>
        </div>
        <Button
          onClick={() => {
            setIsAdding(!isAdding);
            setEditingBanner(null);
            setError('');
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          disabled={isAdding || editingBanner || !canAddMoreBanners}
        >
          {isAdding || editingBanner ? 'Cancel' : 'Add New Banner'}
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {(!canAddMoreBanners && !isAdding && !editingBanner) && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg relative mb-6">
          <span className="block sm:inline">You have reached the maximum limit of {MAX_BANNERS} banners.</span>
        </div>
      )}

      {(isAdding || editingBanner) ? (
        <BannerForm
          banner={editingBanner || undefined}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Existing Banners ({banners.length} of {MAX_BANNERS})</h2>
          {loading ? (
            <div className="text-center text-gray-500">Loading banners...</div>
          ) : (
            <BannerTable
              banners={banners}
              editingBanner={editingBanner}
              onEdit={handleEditClick}
              onDelete={handleDeleteBanner}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Banners;