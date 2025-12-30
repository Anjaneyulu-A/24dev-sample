import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../api/supabaseClient';
import { NewsArticle } from '../types';
import ContentWrapper from './ContentWrapper';
import { format } from 'date-fns';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('news_articles')
        .select('*, category:news_category(name)')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Error fetching article:', error);
      } else {
        setArticle(data as NewsArticle);
      }
      setLoading(false);
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900">Loading Article...</h1>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900">Article Not Found</h1>
      </div>
    );
  }

  const formatArticleDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return format(date, 'yyyy-MM-dd HH:mm');
    } catch (e) {
      console.error("Invalid date format for article:", dateString, e);
      return dateString;
    }
  };

  const renderBodyContentWithImages = (body_content: string | undefined, images: string[] | undefined) => {
    if (!body_content) return null;

    let contentHtml = body_content.replace(/\n/g, '<br />');

    const imageBaseStyle = 'max-w-xs md:max-w-sm h-auto rounded-lg shadow-md my-4 object-contain';
    const imageLeftAlign = 'float-left mr-4';
    const imageRightAlign = 'float-right ml-4';

    if (images && images.length > 1) {
      if (images[1]) {
        contentHtml = contentHtml.replace(
          '[IMAGE_2_LEFT]',
          `<img src="${images[1]}" alt="Article Image 2" class="${imageBaseStyle} ${imageLeftAlign}" />`
        );
        contentHtml = contentHtml.replace(
          '[IMAGE_2_RIGHT]',
          `<img src="${images[1]}" alt="Article Image 2" class="${imageBaseStyle} ${imageRightAlign}" />`
        );
      }
      if (images.length > 2 && images[2]) {
        contentHtml = contentHtml.replace(
          '[IMAGE_3_LEFT]',
          `<img src="${images[2]}" alt="Article Image 3" class="${imageBaseStyle} ${imageLeftAlign}" />`
        );
        contentHtml = contentHtml.replace(
          '[IMAGE_3_RIGHT]',
          `<img src="${images[2]}" alt="Article Image 3" class="${imageBaseStyle} ${imageRightAlign}" />`
        );
      }
    }
    
    contentHtml = contentHtml.replace(/\[IMAGE_[2-3]_(LEFT|RIGHT)\]/g, '');

    return <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap clearfix" dangerouslySetInnerHTML={{ __html: contentHtml }} />;
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <ContentWrapper>
        <nav className="text-gray-600 mb-6" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link to="/" className="text-gray-600 hover:text-gray-800 transition-colors">
                Home
              </Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="flex items-center">
              <Link to="/news" className="text-gray-600 hover:text-gray-800 transition-colors">
                News
              </Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="flex items-center">
              <span className="text-gray-800 font-semibold line-clamp-1">{article?.title}</span>
            </li>
          </ol>
        </nav>

        <div className="bg-gray-100 rounded-lg p-6 shadow-md">
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
        </div>
      </ContentWrapper>
    </div>
  );
};

export default ArticlePage;