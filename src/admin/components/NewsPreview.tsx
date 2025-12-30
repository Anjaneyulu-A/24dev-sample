// src/admin/components/NewsPreview.tsx
import React from 'react';
import Button from '../../ui/Button';
import { NewsArticle } from '../../types';
import { Edit } from 'lucide-react';
import { format } from 'date-fns';

interface NewsPreviewProps {
  article: Partial<NewsArticle>;
  onEdit: () => void;
  onConfirm: () => void;
  isUploading: boolean;
}

const NewsPreview: React.FC<NewsPreviewProps> = ({ article, onEdit, onConfirm, isUploading }) => {
  const confirmButtonText = isUploading ? 'Posting...' : 'Confirm & Post';

  const formatArticleDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return format(date, 'yyyy-MM-dd HH:mm');
    } catch (e) {
      console.error("Invalid date format for preview:", dateString, e);
      return dateString;
    }
  };

  const renderBodyContentWithImages = (body_content: string | undefined, images: string[] | undefined) => {
    if (!body_content) return null;
    let content = body_content.replace(/\n/g, '<br />');

    const imageStyle = 'max-w-xs md:max-w-sm h-auto rounded-lg shadow-md my-4 object-contain';
    const leftAlign = 'float-left mr-4';
    const rightAlign = 'float-right ml-4';

    if (images && images.length > 1) {
      if (images[1]) {
        content = content.replace(
          '[IMAGE_2_LEFT]',
          `<img src="${images[1]}" alt="Article Image 2" class="${imageStyle} ${leftAlign}" />`
        );
        content = content.replace(
          '[IMAGE_2_RIGHT]',
          `<img src="${images[1]}" alt="Article Image 2" class="${imageStyle} ${rightAlign}" />`
        );
      }
      if (images.length > 2 && images[2]) {
        content = content.replace(
          '[IMAGE_3_LEFT]',
          `<img src="${images[2]}" alt="Article Image 3" class="${imageStyle} ${leftAlign}" />`
        );
        content = content.replace(
          '[IMAGE_3_RIGHT]',
          `<img src="${images[2]}" alt="Article Image 3" class="${imageStyle} ${rightAlign}" />`
        );
      }
    }
    
    content = content.replace(/\[IMAGE_[2-3]_(LEFT|RIGHT)\]/g, '');

    return <div className="prose prose-sm max-w-none text-gray-600 clearfix" dangerouslySetInnerHTML={{ __html: content }} />;
  };

  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow-md my-8">
      <div className="flex items-center justify-between text-gray-500 mb-4">
        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
          {article.category?.name || 'Uncategorized'}
        </span>
        <span className="text-sm">{formatArticleDate(article.created_at)}</span>
      </div>
      
      {article.image && article.image.length > 0 && (
        <img
          src={article.image[0]}
          alt={article.title}
          className="w-full h-auto rounded-lg mb-6 shadow-sm"
        />
      )}

      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{article.title}</h1>
      {article.excerpt && (
        <p className="text-xl italic text-gray-700 mb-6">{article.excerpt}</p>
      )}

      {renderBodyContentWithImages(article.body_content, article.image)}
      
      {article.newslink && article.newslink.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-300">
            <h3 className="text-lg font-bold text-gray-800">Read More:</h3>
            <a 
                href={article.newslink[0]} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-1 text-blue-600 hover:underline text-base"
            >
                {article.newslink[0]}
            </a>
        </div>
      )}

      <div className="mt-8 flex space-x-4">
        <Button
          type="button"
          onClick={onEdit}
          className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 flex items-center justify-center space-x-2"
        >
          <Edit size={16} />
          <span>Edit</span>
        </Button>
        <Button
          type="button"
          onClick={onConfirm}
          disabled={isUploading}
          className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
        >
          {confirmButtonText}
        </Button>
      </div>
    </div>
  );
};

export default NewsPreview;