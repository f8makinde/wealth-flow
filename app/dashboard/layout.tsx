'use client';
import { useAuth } from '@/hooks/useAuth';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Bell, ChevronDown } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-dropdown]')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-100">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[28.8px] font-semibold text-gray-900 truncate xl:ml-0 lg:ml-6 ml-12">
                  <span className="hidden sm:inline">Welcome back </span>
                  <span className="sm:hidden">Hi </span>
                  {user.name}
                </h1>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
               
                <button className="relative p-2 text-gray-400 bg-[#AED6FE]/25 rounded-full transition-colors hover:bg-[#AED6FE]/40">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-[#AEB0B1]" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-[#4379EE] rounded-full"></span>
                </button>

                {/* Profile*/}
                <div className="relative" data-dropdown>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 sm:space-x-3 p-1.5 sm:p-2 rounded-[36px] hover:bg-gray-50 border border-[#DCDDDE] transition-colors"
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs sm:text-sm font-medium">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    
                    <div className="text-left hidden sm:block">
                      <div className="text-sm font-medium text-gray-900 max-w-24 lg:max-w-none truncate">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500 max-w-24 lg:max-w-none truncate">
                        {user.role}
                      </div>
                    </div>
                    
                    <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                  </button>

                  {/* Dropdow */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100 sm:hidden">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.role}</div>
                      </div>
                      
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        Profile Settings
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        Account Settings
                      </button>
                      <hr className="my-2 border-gray-100" />
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                        
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}