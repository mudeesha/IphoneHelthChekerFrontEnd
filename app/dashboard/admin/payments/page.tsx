'use client';

import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { mockPayments, mockUsers } from '@/lib/mock-data';
import { AlertCircle, Download, Download as DownloadIcon } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function AdminPaymentsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');
  const [detailsDialogId, setDetailsDialogId] = useState<string | null>(null);

  if (user?.role !== 'admin') {
    return (
      <div className="space-y-4">
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <AlertCircle size={20} />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300">
              You do not have permission to access the admin payments dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const users = Object.values(mockUsers);
  const filteredPayments = mockPayments.filter(payment => {
    const paymentUser = users.find(u => u.id === payment.userId);
    const matchesSearch =
      paymentUser?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paymentUser?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = mockPayments.reduce((sum, p) => sum + p.amount, 0);
  const completedPayments = mockPayments.filter(p => p.status === 'completed').length;
  const pendingPayments = mockPayments.filter(p => p.status === 'pending').length;

  const detailsPayment = detailsDialogId ? mockPayments.find(p => p.id === detailsDialogId) : null;
  const detailsUser = detailsPayment ? users.find(u => u.id === detailsPayment.userId) : null;

  const handleExportCSV = () => {
    const headers = ['Invoice ID', 'User', 'Email', 'Amount', 'Currency', 'Status', 'Date'];
    const rows = filteredPayments.map(payment => {
      const paymentUser = users.find(u => u.id === payment.userId);
      return [
        `INV-${payment.id.substring(0, 8).toUpperCase()}`,
        paymentUser?.name || 'Unknown',
        paymentUser?.email || 'Unknown',
        payment.amount.toFixed(2),
        payment.currency,
        payment.status,
        new Date(payment.createdAt).toLocaleDateString(),
      ];
    });

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `payments-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: 'Export Successful',
      description: 'Payment data has been exported as CSV',
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Payment Management</h1>
        <p className="text-slate-400">Track and manage all platform payments</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-200 text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-slate-400 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-200 text-sm font-medium">Completed Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">{completedPayments}</div>
            <p className="text-xs text-slate-400 mt-1">Successful transactions</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-200 text-sm font-medium">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">{pendingPayments}</div>
            <p className="text-xs text-slate-400 mt-1">Awaiting completion</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-200 text-sm font-medium">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">{mockPayments.length}</div>
            <p className="text-xs text-slate-400 mt-1">All payments</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by user name, email, or invoice ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'completed', 'pending', 'failed'] as const).map(status => (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className={
                    statusFilter === status
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'border-slate-600 text-slate-300 hover:bg-slate-800'
                  }
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
            <Button
              onClick={handleExportCSV}
              className="bg-slate-700 hover:bg-slate-600 text-slate-200"
            >
              <DownloadIcon size={16} className="mr-2" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">All Payments</CardTitle>
          <CardDescription>Showing {filteredPayments.length} of {mockPayments.length} transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 font-semibold text-slate-300">Invoice</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-300">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-300">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-300">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-300">Currency</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-300">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-300">Date</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 px-4 text-center text-slate-400">
                      No payments found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment) => {
                    const paymentUser = users.find(u => u.id === payment.userId);
                    return (
                      <tr key={payment.id} className="border-b border-slate-700/50 hover:bg-slate-800/30">
                        <td className="py-3 px-4 font-mono text-slate-300">
                          INV-{payment.id.substring(0, 8).toUpperCase()}
                        </td>
                        <td className="py-3 px-4 font-semibold text-white">{paymentUser?.name}</td>
                        <td className="py-3 px-4 text-slate-400">{paymentUser?.email}</td>
                        <td className="py-3 px-4 font-semibold text-white">
                          ${payment.amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-slate-400">{payment.currency}</td>
                        <td className="py-3 px-4">
                          <Badge className={
                            payment.status === 'completed'
                              ? 'bg-green-600 text-white'
                              : payment.status === 'pending'
                              ? 'bg-yellow-600 text-white'
                              : 'bg-red-600 text-white'
                          }>
                            {payment.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-slate-400">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 px-3 text-xs border-slate-600 text-slate-300 hover:bg-slate-700"
                            onClick={() => setDetailsDialogId(payment.id)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Details Dialog */}
      <Dialog open={!!detailsDialogId} onOpenChange={(open) => !open && setDetailsDialogId(null)}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>Invoice and transaction information</DialogDescription>
          </DialogHeader>
          {detailsPayment && detailsUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400">Invoice ID</p>
                  <p className="text-sm font-mono font-semibold text-white mt-1">
                    INV-{detailsPayment.id.substring(0, 8).toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Status</p>
                  <Badge className={
                    detailsPayment.status === 'completed'
                      ? 'bg-green-600 text-white mt-1'
                      : detailsPayment.status === 'pending'
                      ? 'bg-yellow-600 text-white mt-1'
                      : 'bg-red-600 text-white mt-1'
                  } style={{ marginTop: '4px' }}>
                    {detailsPayment.status}
                  </Badge>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-4 space-y-4">
                <div>
                  <p className="text-xs text-slate-400">Customer</p>
                  <p className="text-sm font-semibold text-white mt-1">{detailsUser.name}</p>
                  <p className="text-sm text-slate-400">{detailsUser.email}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-400">Amount</p>
                    <p className="text-lg font-bold text-white mt-1">
                      ${detailsPayment.amount.toFixed(2)} {detailsPayment.currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Date</p>
                    <p className="text-sm font-semibold text-white mt-1">
                      {new Date(detailsPayment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Payment Method</p>
                  <p className="text-sm text-white mt-1">Credit Card ending in 4242</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
              onClick={() => setDetailsDialogId(null)}
            >
              Close
            </Button>
            <Button
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 gap-2"
            >
              <Download size={16} />
              Download Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
