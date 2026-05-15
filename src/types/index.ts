export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'rice' | 'pasta' | 'proteins' | 'drinks' | 'soups' | 'swallow' | 'snacks' | 'combos';
  image: string; // placeholder emoji for now
  emoji: string;
  tag?: string; // "BEST SELLER", "FAN FAVE", "SPICY 🌶️", "SIGNATURE"
  sizes?: { name: string; price: number }[];
  extras?: { name: string; price: number }[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  size?: string;
  extras?: string[];
  note?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'received' | 'preparing' | 'delivering' | 'delivered';
  estimatedTime: string;
  createdAt: string;
}
