"use client";

import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { DeliveryStrip } from './DeliveryStrip';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BottomNav } from './BottomNav';
import { Sidebar } from './Sidebar';
import { AppTopBar } from './AppTopBar';

const BARE_ROUTES = ['/auth'];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname   = usePathname();
  const { isLoggedIn } = useAuth();
  const bare = BARE_ROUTES.some(r => pathname.startsWith(r));

  // Auth pages — no chrome at all
  if (bare) return <>{children}</>;

  // Logged-in — app shell (sidebar + top bar on desktop, bottom nav on mobile)
  if (isLoggedIn) {
    return (
      <div className="flex h-screen overflow-hidden bg-brand-black">
        {/* Fixed sidebar — desktop only */}
        <Sidebar />

        {/* Main area */}
        <div className="flex-1 flex flex-col lg:ml-60 min-h-screen overflow-hidden">
          {/* Slim top bar — desktop only */}
          <AppTopBar />

          {/* Scrollable content */}
          <main className="flex-1 overflow-y-auto pb-16 lg:pb-0">
            {children}
          </main>

          {/* Bottom nav — mobile only */}
          <BottomNav />
        </div>
      </div>
    );
  }

  // Logged-out — classic website layout
  return (
    <>
      <DeliveryStrip />
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0 flex flex-col page-enter">
        {children}
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
