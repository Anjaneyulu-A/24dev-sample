// src/components/UpcomingPage.tsx
import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import ContentWrapper from './ContentWrapper';
import Seo from './Seo';

const UpcomingPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // You can add your subscription logic here (e.g., API call)
      console.log('Subscribed with:', email);
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <>
      <Seo
        title="Upcoming Products & Releases | 24TechBuy"
        description="Be the first to know about upcoming product launches, tech reveals, and the latest gear on the horizon at 24TechBuy. Stay ahead with previews and release dates from your favorite brands."
      />
    <div className="min-h-screen bg-gray-900 text-white flex  pt-6">
      <ContentWrapper>
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-white leading-tight">
            A New Way to Buy Tech Is on the Horizon
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10">
            The future of tech shopping is about to be unveiled. We're meticulously crafting an experience that will change the way you discover, compare, and choose smart.
          </p>

          <div className="bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Mail size={48} className="text-red-500" />
            </div>
            
            <h3 className="text-3xl font-bold mb-4">Be the First to Know</h3>
            <p className="text-gray-400 mb-8">
              Join our exclusive early access list to get an invitation and special offers when we go live.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 py-3 px-4 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md"
                  >
                    Get Notified
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  No spam, just exclusive updates and the launch invitation.
                </p>
              </form>
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h4 className="text-2xl font-bold mb-2 text-green-400">You're In!</h4>
                <p className="text-lg text-gray-400">
                  Thanks for subscribing! We'll send you an invitation soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </ContentWrapper>
    </div>
    </>
  );
};

export default UpcomingPage;