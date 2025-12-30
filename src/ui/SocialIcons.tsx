import React from 'react';
import { Instagram, Facebook, Twitter, Youtube, Linkedin } from 'lucide-react';

const SocialIcons: React.FC = () => (
  <div className="flex items-center space-x-3">
    <a href="https://www.facebook.com/profile.php?id=61579195647276" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
    <a href="https://x.com/24tech_buy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter"><Twitter className="h-5 w-5" /></a>
    <a href="https://www.instagram.com/24tech_buy/?next=%2F" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube"><Youtube className="h-5 w-5" /></a>
    <a href="https://www.linkedin.com/in/tech-buy-8a091a385/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
  </div>
);

export default SocialIcons;