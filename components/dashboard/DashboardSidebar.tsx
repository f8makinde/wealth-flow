'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from "@/images/logo.svg"
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import {
   BarChart3,
   CreditCard,
   TrendingUp,
   Settings,
   LogOut,
  PieChart,
  BarChart2,
  Search,
  Menu,
  X
} from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', icon: BarChart3, href: '/dashboard' },
  { name: 'Transactions', icon: CreditCard, href: '/dashboard/transactions' },
  { name: 'Budgeting', icon: PieChart, href: '/dashboard/budgeting' },
  { name: 'Investments', icon: TrendingUp, href: '/dashboard/investments' },
  { name: 'Analytics', icon: BarChart2, href: '/dashboard/analytics' },
];

interface DashboardSidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function DashboardSidebar({ isOpen = true, onToggle }: DashboardSidebarProps) {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    onToggle?.();
  };

  const handleNavItemClick = () => {
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* MobileButton */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* MobileOverlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

   
      <div className={`
        fixed lg:relative
        top-0 left-0 z-40
        w-64 h-full lg:h-auto
        bg-white border-r border-gray-100 
        flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${!isOpen && 'lg:w-16'}
      `}>

        <div className={`flex flex-col justify-center items-center px-6 py-5 gap-6 ${!isOpen && 'lg:px-2'}`}>
          <div className={`${!isOpen && 'lg:w-8 lg:h-8'}`}>
            <Image 
              src={logo} 
              alt="logo" 
              className={`${!isOpen && 'lg:w-8 lg:h-8'}`}
            />
          </div>
          
         
          {(isOpen || window.innerWidth < 1024) && (
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-3 w-full text-base text-[#737791] outline-none
                 bg-[#E8E8E9]/50 rounded-[18px]"
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4">
          <div className="space-y-1">
            {(isOpen || window.innerWidth < 1024) && (
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3 px-3">
                Main Menu
              </p>
            )}
            
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleNavItemClick}
                  className={`w-full flex items-center ${isOpen ? 'space-x-[21px] px-[16px]' : 'lg:justify-center lg:px-2'} py-[21px] rounded-[15px] outline-none cursor-pointer text-base transition-all group relative ${
                    isActive
                      ? 'bg-[#F6F9FF] text-[#0D0000] font-semibold'
                      : 'text-[#737791] hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  title={!isOpen ? item.name : ''}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#0D0000]' : 'text-[#737791]'}`} />
                  {(isOpen || window.innerWidth < 1024) && (
                    <span className="truncate">{item.name}</span>
                  )}
                  
               
                  {!isOpen && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 hidden lg:block">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className={`px-4 pb-6 space-y-1 ${!isOpen && 'lg:px-2'}`}>
          <button className={`w-full flex items-center ${isOpen ? 'space-x-2.5 px-3' : 'lg:justify-center lg:px-2'} py-2.5 text-[#737791] hover:bg-gray-50 hover:text-gray-900 rounded-lg text-sm font-regular transition-all cursor-pointer group relative`}>
            <Settings className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {(isOpen || window.innerWidth < 1024) && <span>Settings</span>}
            
            {!isOpen && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 hidden lg:block">
                Settings
              </div>
            )}
          </button>
          
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${isOpen ? 'space-x-2.5 px-3' : 'lg:justify-center lg:px-2'} py-2.5 text-[#737791] hover:bg-gray-50 hover:text-gray-900 rounded-lg text-sm font-regular transition-all group relative`}
          >
            <LogOut className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {(isOpen || window.innerWidth < 1024) && <span>Sign Out</span>}
            
            {/* Tooltip for collapsed state */}
            {!isOpen && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 hidden lg:block">
                Sign Out
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}