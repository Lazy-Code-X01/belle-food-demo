import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background), 1)",
        foreground: "rgba(var(--foreground), 1)",
        brand: {
          black: 'rgba(var(--brand-black), <alpha-value>)',
          surface: 'rgba(var(--brand-surface), <alpha-value>)',
          card: 'rgba(var(--brand-card), <alpha-value>)',
          red: 'rgba(var(--brand-red), <alpha-value>)',
          'red-hover': 'rgba(var(--brand-red-hover), <alpha-value>)',
          'red-dark': 'rgba(var(--brand-red-dark), <alpha-value>)',
          gold: 'rgba(var(--brand-gold), <alpha-value>)',
          white: 'rgba(var(--brand-white), <alpha-value>)',
          muted: 'rgba(var(--brand-muted), <alpha-value>)',
          border: 'rgba(var(--brand-border), <alpha-value>)',
        }
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;
