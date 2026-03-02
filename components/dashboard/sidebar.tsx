'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Upload,
  History,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  CreditCard,
} from 'lucide-react';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/upload', label: 'Upload Report', icon: Upload },
    ...(user?.role === 'premium' || user?.role === 'admin'
      ? [
          { href: '/dashboard/history', label: 'History', icon: History },
          { href: '/dashboard/stats', label: 'Statistics', icon: BarChart3 },
        ]
      : []),
    ...(user?.role === 'premium'
      ? [{ href: '/dashboard/billing', label: 'Billing', icon: CreditCard }]
      : []),
    ...(user?.role === 'admin'
      ? [
          { href: '/dashboard/admin', label: 'Admin Panel', icon: Shield },
          { href: '/dashboard/admin/payments', label: 'Payments', icon: CreditCard },
        ]
      : []),
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-[#2C2C2E] text-white border border-[#3A3A3C] transition-colors duration-150"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-black border-r border-[#2C2C2E] p-6 transform transition-transform duration-300 ease-in-out md:translate-x-0 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="mb-8 pt-6 md:pt-0">
          <h1 className="text-lg font-semibold text-white">iPhone Analytics</h1>
          <p className="text-xs text-[#8E8E93] mt-1">Pro Viewer</p>
        </div>

        {/* User Info */}
        <div className="mb-8 p-3 bg-[#1C1C1E] rounded-lg border border-[#2C2C2E]">
          <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
          <p className="text-xs text-[#8E8E93] truncate">{user?.email}</p>
          <div className="mt-2 inline-block">
            <span className="text-xs px-2 py-1 bg-[#0A84FF]/20 text-[#0A84FF] rounded-md capitalize font-semibold">
              {user?.role}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 mb-8 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors duration-150 text-left text-sm font-normal ${
                    active
                      ? 'bg-[#0A84FF] text-white'
                      : 'text-[#A0A0A0] hover:bg-[#1C1C1E] hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <Button
          onClick={() => {
            logout();
            setIsOpen(false);
          }}
          variant="outline"
          className="w-full border-[#3A3A3C] text-[#A0A0A0] hover:bg-[#2C2C2E] hover:text-white rounded-lg font-normal transition-colors duration-150"
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </Button>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </>
  );
}
