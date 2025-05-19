import Sidebar from '@/components/layout/sidebar';
import BottomNav from '@/components/layout/bottomNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}