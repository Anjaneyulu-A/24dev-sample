// src/components/ContentWrapper.tsx
import React, { ReactNode } from 'react';

interface ContentWrapperProps {
  children: ReactNode;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default ContentWrapper;