// src/ui/NewsCard.tsx
import React from 'react';
import { NewsArticle } from '../types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface NewsCardProps {
  newsArticle: NewsArticle;
  showButton?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ newsArticle, showButton = false }) => {
  
  const colSpanClass = newsArticle.colSpan ? `md:col-span-${newsArticle.colSpan}` : '';
  
  const formatPostDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd-MM-yyyy');
    } catch (e) {
      console.error("Invalid date format:", dateString, e);
      return dateString;
    }
  };

  return (
    <article className={`group news-card ${colSpanClass}`}>
      {newsArticle.image && newsArticle.image.length > 0 && (
        <img
          src={newsArticle.image[0]}
          alt={newsArticle.title}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="news-card-category">
            {newsArticle.category?.name || 'Uncategorized'}
          </span>
          <span className="text-gray-500 text-xs">{formatPostDate(newsArticle.created_at)}</span>
        </div>
        <h3 className="news-card-title">
          {newsArticle.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{newsArticle.excerpt}</p>
        <Link
          to={`/news/${newsArticle.slug}`}
          className="text-gray-800 group-hover:text-red-500 font-semibold text-sm transition-colors duration-300 inline-block"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
};

export default React.memo(NewsCard);