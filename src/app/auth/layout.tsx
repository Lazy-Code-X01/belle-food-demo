// Auth pages get their own layout — no Navbar, Footer, BottomNav, or DeliveryStrip
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
