'use client';

import { ProtectedRoute } from '@/components/protected-route';
import { Sidebar } from '@/components/dashboard/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-black">
        <Sidebar />
        <main className="flex-1 overflow-auto md:ml-64">
          <div className="p-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
