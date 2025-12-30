import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewsCard from '../ui/NewsCard';
import { NewsArticle } from '../types';
import { supabase } from '../api/supabaseClient';
import ContentWrapper from './ContentWrapper';

const FEATURED_NEWS_COUNT = 8;

const NewsSection: React.FC = () => {
  const navigate = useNavigate();
  const [displayedNews, setDisplayedNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('news_articles')
      .select('*, category:news_category(name)')
      .order('created_at', { ascending: false })
      .range(0, FEATURED_NEWS_COUNT - 1); // Fetch 8 news articles

    if (error) {
      console.error('Error fetching news:', error);
    } else {
      setDisplayedNews(data as NewsArticle[] || []);
    }
    setLoading(false);
  };
  
  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <section className="bg-gray-50 py-16">
      <ContentWrapper>
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Latest News & Articles
        </h2>
        
        {loading && displayedNews.length === 0 ? (
          <div className="text-center text-gray-500">Loading articles...</div>
        ) : (
          <div className="news-grid">
            {displayedNews.map((newsArticle) => (
              <NewsCard key={newsArticle.id} newsArticle={newsArticle} />
            ))}
          </div>
        )}
        
        <div className="text-center">
          <button
            onClick={() => navigate('/news')}
            className="bg-red-500 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            View All articles
          </button>
        </div>
      </ContentWrapper>
    </section>
  );
};

export default NewsSection;