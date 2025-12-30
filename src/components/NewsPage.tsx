import React, { useState, useEffect } from 'react';
import NewsCard from '../ui/NewsCard';
import { Link } from 'react-router-dom';
import { NewsArticle } from '../types';
import { supabase } from '../api/supabaseClient';
import Seo from './Seo';

const NewsPage: React.FC = () => {
  const [allNews, setAllNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllNews = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('news_articles')
        .select('*, category:news_category(name)')
        .order('id', { ascending: false });

      if (error) {
        console.error('Error fetching all news:', error);
      } else {
        setAllNews(data as NewsArticle[] || []);
      }
      setLoading(false);
    };

    fetchAllNews();
  }, []);

  return (
    <>
      <Seo 
        title="Tech News, Updates & Tips | 24TechBuy"
        description="Stay updated with the latest tech trends, product launches, reviews, and advice from 24TechBuy. Your go-to source for all things gadgets, innovations, and tech tips in India."
      />
    <div className="min-h-screen bg-white py-4">
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
              <span className="text-gray-800 font-semibold">News</span>
            </li>
          </ol>
        </nav>
        
        <h1 className="text-2xl font-bold  mb-4 text-gray-900">
          All News & Articles
        </h1>
        
        {loading ? (
          <div className="text-center text-gray-500">Loading articles...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {allNews.map((article) => (
              <NewsCard key={article.id} newsArticle={article} />
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default NewsPage;