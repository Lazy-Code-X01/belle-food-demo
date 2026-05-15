import { MenuItem } from '@/types';

export const menuItems: MenuItem[] = [
  {
    id: 'jollof-rice',
    name: 'Jollof Rice',
    description: 'Party-style smoky jollof rice with your choice of protein',
    price: 3200,
    category: 'rice',
    image:
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop&auto=format&q=80',
    emoji: '🍛',
    tag: 'BEST SELLER',
    sizes: [
      { name: 'Small', price: 2500 },
      { name: 'Regular', price: 3200 },
      { name: 'Large', price: 4000 },
    ],
    extras: [
      { name: 'Extra Protein', price: 500 },
      { name: 'Extra Sauce', price: 200 },
    ],
  },
  {
    id: 'fried-rice',
    name: 'Fried Rice',
    description: 'Nigerian-style fried rice loaded with veggies and shrimp',
    price: 3000,
    category: 'rice',
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop&auto=format&q=80',
    emoji: '🍚',
  },
  {
    id: 'white-rice-stew',
    name: 'White Rice & Stew',
    description: 'Fluffy white rice with rich tomato beef stew',
    price: 2800,
    category: 'rice',
    image:
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&h=400&fit=crop&auto=format&q=80',
    emoji: '🫕',
  },
  {
    id: 'spaghetti-bolognese',
    name: 'Spaghetti Bolognese',
    description: 'Slow-cooked minced beef in rich tomato sauce over spaghetti',
    price: 3500,
    category: 'pasta',
    image:
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop&auto=format&q=80',
    emoji: '🍝',
    tag: 'FAN FAVE',
    sizes: [
      { name: 'Small', price: 2800 },
      { name: 'Regular', price: 3500 },
      { name: 'Large', price: 4200 },
    ],
  },
  {
    id: 'creamy-pasta',
    name: 'Creamy Pasta',
    description: 'Penne in a creamy white sauce with grilled chicken',
    price: 3800,
    category: 'pasta',
    image:
      'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&h=400&fit=crop&auto=format&q=80',
    emoji: '🍜',
  },
  {
    id: 'grilled-chicken',
    name: 'Grilled Chicken',
    description: 'Marinated and grilled to perfection, served with peppered sauce',
    price: 2500,
    category: 'proteins',
    image:
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=400&fit=crop&auto=format&q=80',
    emoji: '🍗',
    extras: [
      { name: 'Extra Sauce', price: 200 },
      { name: 'Side Salad', price: 500 },
    ],
  },
  {
    id: 'peppered-beef',
    name: 'Peppered Beef',
    description: 'Tender beef chunks in our signature Belle pepper sauce',
    price: 3000,
    category: 'proteins',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&auto=format&q=80',
    emoji: '🥩',
    tag: 'SPICY 🌶️',
  },
  {
    id: 'fried-fish',
    name: 'Fried Fish',
    description: 'Crispy fried tilapia with onion dipping sauce',
    price: 2800,
    category: 'proteins',
    image:
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&h=400&fit=crop&auto=format&q=80',
    emoji: '🐟',
  },
  {
    id: 'chapman',
    name: 'Chapman',
    description: 'Our house Chapman — sweet, tangy, and refreshing',
    price: 1200,
    category: 'drinks',
    image:
      'https://plus.unsplash.com/premium_photo-1677000666461-fbefa43c2c7f?w=600&h=400&fit=crop&auto=format&q=80',
    emoji: '🍹',
    tag: 'SIGNATURE',
  },
  {
    id: 'zobo',
    name: 'Zobo Drink',
    description: 'Chilled hibiscus drink made fresh daily',
    price: 800,
    category: 'drinks',
    image:
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=400&fit=crop&auto=format&q=80',
    emoji: '🥤',
  },
  {
    id: 'soft-drinks',
    name: 'Soft Drinks',
    description: 'Coke, Fanta, Sprite — chilled bottles',
    price: 500,
    category: 'drinks',
    image:
      'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=600&h=400&fit=crop&auto=format&q=80',
    emoji: '🧃',
  },
  {
    id: 'egusi-soup',
    name: 'Egusi Soup',
    description: 'Rich melon soup with assorted meat and stock fish',
    price: 4500,
    category: 'soups',
    image:
      'https://plus.unsplash.com/premium_photo-1669831178095-005ed789250a?w=600&h=400&fit=crop&auto=format&q=80',
    emoji: '🍲',
    tag: 'TRADITIONAL',
  },
  {
    id: 'pounded-yam',
    name: 'Pounded Yam',
    description: 'Smooth, soft pounded yam to go with any soup',
    price: 1500,
    category: 'swallow',
    image:
      'https://plus.unsplash.com/premium_photo-1696835870634-e6484e8ed4d7?w=600&h=400&fit=crop&auto=format&q=80',
    emoji: '🥣',
  },
  {
    id: 'meat-pie',
    name: 'Nigerian Meat Pie',
    description: 'Flaky pastry filled with minced meat, potatoes, and carrots',
    price: 1000,
    category: 'snacks',
    image:
      'https://plus.unsplash.com/premium_photo-1665669263531-cdcbe18e7fe4?w=600&h=400&fit=crop&auto=format&q=80',
    emoji: '🥟',
    tag: 'HOT',
  },
  {
    id: 'seafood-pasta',
    name: 'Seafood Pasta',
    description: 'Spicy pasta tossed with shrimp, calamari, and bell peppers',
    price: 5500,
    category: 'pasta',
    image:
      'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=400&fit=crop&auto=format&q=80',
    emoji: '🍤',
  },
  {
    id: 'asun',
    name: 'Spicy Asun',
    description: 'Smoked goat meat chopped and tossed in a spicy pepper mix',
    price: 3500,
    category: 'proteins',
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop&auto=format&q=80',
    emoji: '🐐',
    tag: 'SPICY 🌶️',
  },
  {
    id: 'combo-jollof-chicken',
    name: 'Jollof + Grilled Chicken',
    description: 'A full plate of smoky jollof rice paired with one piece of grilled chicken and a chilled drink',
    price: 5500,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=400&fit=crop&auto=format&q=80',
    emoji: '🍱',
    tag: 'BEST VALUE',
    sizes: [
      { name: 'Regular', price: 5500 },
      { name: 'Large', price: 6500 },
    ],
  },
  {
    id: 'combo-pasta-protein',
    name: 'Pasta + Protein Combo',
    description: 'Choose any pasta with your favourite protein — the ultimate Belle Food full meal',
    price: 6000,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop&auto=format&q=80',
    emoji: '🍝',
    tag: 'FAN FAVE',
    extras: [
      { name: 'Add Grilled Chicken', price: 500 },
      { name: 'Add Peppered Beef', price: 800 },
      { name: 'Add Fried Fish', price: 600 },
    ],
  },
  {
    id: 'combo-family',
    name: 'Family Feast Box',
    description: 'Large jollof rice + fried rice + 4 pieces of grilled chicken + 2 drinks. Feeds 3–4 people',
    price: 18000,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&auto=format&q=80',
    emoji: '🥡',
    tag: 'FAMILY SIZE',
  },
];

export const categories = [
  { id: 'all', label: 'All', emoji: '🍽️' },
  { id: 'rice', label: 'Rice Dishes', emoji: '🍛' },
  { id: 'pasta', label: 'Pasta', emoji: '🍝' },
  { id: 'proteins', label: 'Proteins', emoji: '🍗' },
  { id: 'drinks', label: 'Drinks', emoji: '🥤' },
  { id: 'soups', label: 'Soups', emoji: '🍲' },
  { id: 'swallow', label: 'Swallow', emoji: '🥣' },
  { id: 'snacks', label: 'Snacks', emoji: '🥟' },
  { id: 'combos', label: 'Combos', emoji: '🍱' },
] as const;
