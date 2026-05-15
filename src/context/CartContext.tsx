"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, MenuItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addItem: (menuItem: MenuItem, quantity?: number, size?: string, extras?: string[]) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  deliveryFee: number;
  orderTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('belle-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('belle-cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = (menuItem: MenuItem, quantity = 1, size?: string, extras?: string[]) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => 
          item.menuItem.id === menuItem.id && 
          item.size === size && 
          JSON.stringify(item.extras) === JSON.stringify(extras)
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      }

      return [...prevItems, { menuItem, quantity, size, extras }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.menuItem.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.menuItem.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartTotal = items.reduce((total, item) => {
    let itemPrice = item.menuItem.price;
    
    if (item.size && item.menuItem.sizes) {
      const sizePrice = item.menuItem.sizes.find(s => s.name === item.size)?.price;
      if (sizePrice) itemPrice = sizePrice;
    }

    if (item.extras && item.menuItem.extras) {
      item.extras.forEach(extraName => {
        const extraPrice = item.menuItem.extras?.find(e => e.name === extraName)?.price;
        if (extraPrice) itemPrice += extraPrice;
      });
    }

    return total + itemPrice * item.quantity;
  }, 0);

  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  const deliveryFee = cartTotal > 10000 ? 0 : 500;
  const orderTotal = cartTotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        deliveryFee,
        orderTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
