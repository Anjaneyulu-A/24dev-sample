import { UUID } from "crypto";

export interface Product {
  id: string; 
  name: string;
  price: string;
  image: string;
  rating: number;
  productLink: string;
  colSpan?: number;
  price_numeric?: number;
  category?: { id: string, name: string }; // Add the category object
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt?: string;
  body_content: string;
  image?: string[];
  created_at: string;
  category: { id: string, name: string }; // Correctly define category as an object
  newsLink?: string[];
  colSpan?: number;
  slug?: string; //
}

export interface NewsCategory {
  id: string;
  name: string;
}


export type BannerContent = 
  | { type: 'image-poster'; imageUrl: string; }
  | { type: 'card'; title: string; subtitle: string; offer: string; imageUrl: string; }
  | { type: 'quote-card'; quote: string; author: string; };




export interface Banner {
  id: string;
  link: string;
  image: string;
  bg_color: string;
}