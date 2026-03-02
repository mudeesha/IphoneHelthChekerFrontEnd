'use client';

import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockPayments, mockSubscriptions, mockUsers } from '@/lib/mock-data';
import { Download, AlertCircle, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function BillingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  if (!user) {
    router.push('/login');
    return null;
  }

  const userPayments = mockPayments.filter(p => p.userId === user.id);
  const userSubscription = mockSubscriptions.find(s => s.userId === user.id);

  const handleDownloadInvoice = (paymentId: string) => {
    toast({
      title: 'Download Started',
      description: 'Your invoice has been downloaded.',
    });
  };

  const handleCancelSubscription = () => {
    toast({
      title: 'Subscription Cancelled',
      description: 'Your premium subscription has been cancelled. You will have access until the end of your billing period.',
      variant: 'destructive',
    });
  };

  // If user is free tier
  if (user.role !== 'premium') {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Billing</h1>
          <p className="text-[#A0A0A0]">Manage your subscription and payments</p>
        </div>

        <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertCircle className="text-yellow-400" size={20} />
              You are on the Free Plan
            </CardTitle>
            <CardDescription className="text-[#8E8E93]">No billing information on file</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-[#A0A0A0]">
              You are currently using our free tier. Upgrade to Premium to unlock advanced analytics and unlimited reports.
            </p>
            <Button
              onClick={() => router.push('/plans')}
              className="bg-[#0A84FF] hover:bg-[#409CFF] text-white"
            >
              View Premium Plans <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Billing</h1>
        <p className="text-[#A0A0A0]">Manage your subscription and payments</p>
      </div>

      {/* Current Subscription */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white">Current Subscription</CardTitle>
          <CardDescription className="text-[#8E8E93]">Your active plan and billing details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-[#A0A0A0]">Plan</p>
              <p className="text-lg font-semibold text-white mt-1">Premium Monthly</p>
              <Badge className="mt-2 bg-purple-600 text-white">Active</Badge>
            </div>
            <div>
              <p className="text-sm text-[#A0A0A0]">Amount</p>
              <p className="text-lg font-semibold text-white mt-1">$9.99/month</p>
            </div>
            <div>
              <p className="text-sm text-[#A0A0A0]">Billing Cycle</p>
              <p className="text-[#A0A0A0] mt-1">
                {userSubscription ? (
                  <>
                    {new Date(userSubscription.startDate).toLocaleDateString()} - {new Date(userSubscription.endDate).toLocaleDateString()}
                  </>
                ) : (
                  'N/A'
                )}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#A0A0A0]">Next Billing Date</p>
              <p className="text-[#A0A0A0] mt-1">
                {userSubscription ? new Date(userSubscription.endDate).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>

          <div className="border-t border-[#2C2C2E] pt-6 flex gap-3">
            <Button
              onClick={() => router.push('/plans')}
              variant="outline"
              className="border-[#3A3A3C] text-[#A0A0A0] hover:bg-[#2C2C2E]"
            >
              Change Plan
            </Button>
            <Button
              onClick={handleCancelSubscription}
              className="bg-red-600 hover:bg-red-700"
            >
              Cancel Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white">Payment History</CardTitle>
          <CardDescription className="text-[#8E8E93]">Your invoices and past transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {userPayments.length === 0 ? (
            <p className="text-[#A0A0A0]">No payments found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2C2C2E]">
                    <th className="text-left py-3 px-4 font-semibold text-[#A0A0A0]">Invoice</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#A0A0A0]">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#A0A0A0]">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#A0A0A0]">Status</th>
                    <th className="text-right py-3 px-4 font-semibold text-[#A0A0A0]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-[#2C2C2E]/50 hover:bg-[#2C2C2E]/30">
                      <td className="py-3 px-4 font-mono text-[#A0A0A0]">
                        INV-{payment.id.substring(0, 8).toUpperCase()}
                      </td>
                      <td className="py-3 px-4 text-[#8E8E93]">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 font-semibold text-white">
                        ${payment.amount.toFixed(2)} {payment.currency}
                      </td>
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
                      <td className="py-3 px-4 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 px-2 text-xs border-[#3A3A3C] text-[#A0A0A0] hover:bg-[#2C2C2E] gap-1"
                          onClick={() => handleDownloadInvoice(payment.id)}
                        >
                          <Download size={14} />
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Billing Information */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white">Billing Information</CardTitle>
          <CardDescription className="text-[#8E8E93]">Your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-[#A0A0A0]">Account Name</p>
            <p className="text-[#A0A0A0] mt-1">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-[#A0A0A0]">Email</p>
            <p className="text-[#A0A0A0] mt-1">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-[#A0A0A0]">Account Status</p>
            <p className="text-[#A0A0A0] mt-1">Active</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
