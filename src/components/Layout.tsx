'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Users, LayoutDashboard, FileText, Settings, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth');
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        router.push('/auth');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        <div className="w-64 bg-white shadow-lg">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center h-16 border-b">
              <Users className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold">CRM</span>
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/dashboard"
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span className="ml-3">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/candidates"
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <Users className="h-5 w-5" />
                    <span className="ml-3">Candidates</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/templates"
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <FileText className="h-5 w-5" />
                    <span className="ml-3">Templates</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <Settings className="h-5 w-5" />
                    <span className="ml-3">Settings</span>
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="p-4 border-t">
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-3">Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}