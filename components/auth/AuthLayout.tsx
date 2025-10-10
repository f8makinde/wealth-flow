'use client';
import Image from 'next/image';
import logo from "@/images/logo.svg"
import dashboard from "@/images/dashboard.png"
interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen
     flex">
      {/* Left Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-md w-full space-y-8 text-center">
          {/* Logo */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Image src={logo} alt="logo" />
            
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            <p className="mt-2 text-gray-600">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>

      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#225BA4]"></div>
        

        <div className="relative flex flex-col items-center justify-center p-12 text-white">
          <div className="max-w-3xl mb-8">
            <h1 className="text-4xl font-bold mb-4">
              The Simplest way to manage your finances
            </h1>
            <p className="text-xl text-blue-100">
              Enter your details to access your account
            </p>
          </div>

          <div className="relative w-full max-w-2xl">
            
              <div className="relative w-full bg-white rounded-xl overflow-hidden shadow-lg h-[549px]">
                <Image
                  src={dashboard}
                  alt="WealthFlow Dashboard Preview"
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                
                />

                <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
   
  );
}