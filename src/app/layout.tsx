import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { AppShell } from "@/components/layout/AppShell";
import { ToastProvider } from "@/components/ui/Toast";
import { ThemeProvider } from "@/components/ThemeProvider";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export const metadata: Metadata = {
  title: "Belle Food - Premium Food Delivery",
  description: "King Mitchy's Belle Food - Lagos's favourite restaurant, now online.",
  openGraph: {
    title: "Belle Food - Premium Food Delivery",
    description: "King Mitchy's Belle Food - Lagos's favourite restaurant, now online.",
    images: [
      {
        url: "https://res.cloudinary.com/dioiyb833/image/upload/v1778890148/cfafbb88-c664-4512-afb9-eaf7fe09d7bb.png",
        width: 1200,
        height: 630,
        alt: "Belle Food - Premium Food Delivery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Belle Food - Premium Food Delivery",
    description: "King Mitchy's Belle Food - Lagos's favourite restaurant, now online.",
    images: ["https://res.cloudinary.com/dioiyb833/image/upload/v1778890148/cfafbb88-c664-4512-afb9-eaf7fe09d7bb.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="bg-brand-black min-h-screen text-brand-white font-body flex flex-col antialiased transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastProvider>
            <AuthProvider>
            <CartProvider>
              <AppShell>{children}</AppShell>
            </CartProvider>
          </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
