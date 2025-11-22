export interface Artwork {
  _id?: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  dimensions: {
    height: number;
    width: number;
    depth?: number;
  };
  technique: string;
  status: 'available' | 'reserved' | 'sold';
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewsItem {
  _id?: string;
  title: string;
  content: string;
  image?: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reservation {
  _id?: string;
  artworkId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

export interface User {
  _id?: string;
  email: string;
  password: string;
  role: 'admin';
}
