// src/components/ContactPage.tsx
import React from 'react';
import ContentWrapper from './ContentWrapper';
import { Mail } from 'lucide-react';
import Seo from './Seo';

const ContactPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Contact Us - List Your Products | 24TechBuy"
        description="Interested in listing your products on 24TechBuy? Contact us to submit your listing request and get your brand featured on our platform."
      />
    <div className="min-h-screen bg-white py-16">
      <ContentWrapper>
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Want to Add Your Product to Our Site?</h1>
          <p className="text-lg text-gray-600 mb-12">
            If you're interested in listing your products or brand on our platform, please send us an email. Our team will review your submission and get back to you with the next steps.
          </p>
          
          <div className="bg-gray-100 rounded-lg p-8 shadow-md flex flex-col items-center space-y-4">
            <Mail size={48} className="text-red-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Submit Your Listing Request</h2>
            <p className="text-gray-600">
              Send your request to:
            </p>
            <a 
              href="mailto:partner@24techbuy.com" 
              className="text-lg font-bold text-red-600 hover:underline transition-colors"
            >
              affiliate@24techbuy.com
            </a>
          </div>
        </div>
      </ContentWrapper>
    </div>
    </>
  );
};

export default ContactPage;