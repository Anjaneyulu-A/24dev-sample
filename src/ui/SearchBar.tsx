// src/ui/SearchBar.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // UPDATED: Navigate to internal search page with the query
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsDropdownOpen(false);
    } else {
      navigate('/');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="w-full relative">
      <div className="w-full flex items-center">
        <input
          type="text"
          placeholder="Search products, mobiles & more..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2.5 text-gray-800 bg-white border-none rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500 text-base"
          autoComplete="off"
        />
        <button 
          onClick={handleSearch}
          className="bg-red-600 text-white p-3 rounded-r-md hover:bg-red-700 transition-colors" 
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;