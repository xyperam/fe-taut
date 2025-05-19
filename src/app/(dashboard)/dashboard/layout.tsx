'use client';
import Sidebar from '@/components/layout/sidebar';
import BottomNav from '@/components/layout/bottomNav';
import { useRouter } from 'next/navigation';
import React,{useEffect,useState} from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
        router.replace('/login');
    }else{
        setIsAuthenticated(true);
    }
    }
    , [router]);

    if(!isAuthenticated){
        return null;
    }

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