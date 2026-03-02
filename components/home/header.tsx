'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Smartphone, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '/plans' },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-[#2C2C2E]" style={{ height: '52px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="p-1.5 bg-[#0A84FF] rounded-md">
              <Smartphone className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white text-sm">iPhone Health</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-normal text-[#A0A0A0] hover:text-white transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-sm text-slate-600">
                    {user.name}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  {user.role === 'premium' && (
                    <DropdownMenuItem onClick={() => router.push('/dashboard/billing')}>
                      Billing
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="border border-[#3A3A3C] text-[#A0A0A0] hover:text-white hover:bg-[rgba(255,255,255,0.05)] font-normal text-sm rounded-lg px-4 py-1.5"
                  onClick={() => router.push('/login')}
                >
                  Login
                </Button>
                <Button
                  className="bg-[#0A84FF] hover:bg-[#409CFF] text-white font-semibold text-sm rounded-lg px-4 py-1.5 transition-colors duration-150"
                  onClick={() => router.push('/register')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-gray-900 border-l border-gray-800">
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-gray-300 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-gray-800 pt-4 flex flex-col gap-2">
                  {user ? (
                    <>
                      <Button
                        variant="outline"
                        className="w-full border border-gray-700 text-gray-300 hover:bg-gray-800 font-medium"
                        onClick={() => {
                          router.push('/dashboard');
                          setIsOpen(false);
                        }}
                      >
                        Dashboard
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border border-gray-700 text-gray-300 hover:bg-gray-800 font-medium"
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="w-full border border-gray-700 text-gray-300 hover:bg-gray-800 font-medium"
                        onClick={() => {
                          router.push('/login');
                          setIsOpen(false);
                        }}
                      >
                        Login
                      </Button>
                      <Button
                        className="w-full bg-white hover:bg-gray-100 text-black font-medium"
                        onClick={() => {
                          router.push('/register');
                          setIsOpen(false);
                        }}
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
