'use client';

import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Lock, Zap } from 'lucide-react';

export default function SettingsPage() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-semibold text-white mb-2 tracking-tight" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>Settings</h1>
        <p className="text-[#A0A0A0] text-base">Manage your account and subscription</p>
      </div>

      {/* Account Settings */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white text-base font-semibold">Account Information</CardTitle>
          <CardDescription className="text-[#8E8E93]">Your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-[#8E8E93]">Name</label>
            <p className="text-white font-medium">{user?.name}</p>
          </div>
          <div>
            <label className="text-sm text-[#8E8E93]">Email</label>
            <p className="text-white font-medium">{user?.email}</p>
          </div>
          <div>
            <label className="text-sm text-[#8E8E93]">Account Created</label>
            <p className="text-white font-medium">
              {new Date(user?.createdAt || '').toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Status */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 text-base font-semibold">
            <Lock size={20} />
            Subscription Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Current Plan */}
            <div className="p-6 border border-[#2C2C2E] rounded-lg bg-[#1C1C1E]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white capitalize">
                  {user?.role === 'free' ? 'Free Plan' : 'Premium Plan'}
                </h3>
                <Badge className={
                  user?.role === 'free'
                    ? 'bg-[#2C2C2E] text-[#A0A0A0]'
                    : 'bg-[#0A84FF] text-white'
                }>
                  {user?.role === 'free' ? 'Free' : 'Premium'}
                </Badge>
              </div>

              <p className="text-[#A0A0A0] text-sm mb-4">
                {user?.role === 'free'
                  ? 'You are currently on the Free plan with limited analytics.'
                  : 'You have full access to all premium features including detailed analytics, history tracking, and statistics.'}
              </p>

              {user?.role === 'free' && (
                <div className="bg-[#0A84FF]/10 border border-[#0A84FF]/30 rounded p-4 mb-4">
                  <h4 className="font-semibold text-[#0A84FF] mb-2">Free Plan Includes:</h4>
                  <ul className="text-sm text-[#A0A0A0] space-y-1">
                    <li>• Basic stability score visualization</li>
                    <li>• Summary statistics</li>
                    <li>• Crash count tracking</li>
                    <li>• Session duration analysis</li>
                  </ul>
                </div>
              )}

              {user?.role === 'premium' && (
                <div className="bg-[#0A84FF]/10 border border-[#0A84FF]/30 rounded p-4 mb-4">
                  <h4 className="font-semibold text-[#0A84FF] mb-2">Premium Features:</h4>
                  <ul className="text-sm text-[#A0A0A0] space-y-1">
                    <li>• Complete analytics with 11+ detailed sections</li>
                    <li>• Battery health and thermal analysis</li>
                    <li>• Network and connectivity insights</li>
                    <li>• Performance metrics and memory analysis</li>
                    <li>• App usage tracking and history</li>
                    <li>• Sensor and GPS data analysis</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Upgrade Button */}
            {user?.role === 'free' && (
              <div className="p-6 bg-[#1C1C1E] border border-[#2C2C2E] rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">
                  <Zap size={20} className="inline mr-2 text-[#0A84FF]" />
                  Upgrade to Premium
                </h3>
                <p className="text-[#A0A0A0] text-sm mb-4">
                  Unlock advanced analytics with detailed insights into battery health, thermal events, network performance, and much more.
                </p>
                <div className="text-3xl font-semibold text-white mb-4">
                  $9.99<span className="text-lg text-[#8E8E93]">/month</span>
                </div>
                <Button className="w-full bg-[#0A84FF] hover:bg-[#409CFF] text-white rounded-lg font-semibold transition-colors duration-150 mb-3">
                  Upgrade Now
                </Button>
                <p className="text-xs text-[#8E8E93]">7-day free trial. Cancel anytime.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white text-base font-semibold">Privacy & Security</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-[#2C2C2E] rounded-lg bg-[#1C1C1E]">
              <h4 className="font-semibold text-white mb-2">Data Privacy</h4>
              <p className="text-sm text-[#A0A0A0]">
                Your analytics data is encrypted and stored securely. We never share your data with third parties.
              </p>
            </div>
            <div className="p-4 border border-[#2C2C2E] rounded-lg bg-[#1C1C1E]">
              <h4 className="font-semibold text-white mb-2">Delete Account</h4>
              <p className="text-sm text-[#A0A0A0] mb-3">
                Permanently delete your account and all associated data.
              </p>
              <Button variant="destructive" className="w-full rounded-lg font-semibold">
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Management */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white text-base font-semibold">Session</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[#A0A0A0] text-sm mb-4">
            Sign out from this device or all devices.
          </p>
          <div className="flex gap-3">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex-1 border-[#3A3A3C] text-[#A0A0A0] hover:bg-[#2C2C2E] rounded-lg font-normal transition-colors duration-150"
            >
              Sign Out
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-[#3A3A3C] text-[#A0A0A0] hover:bg-[#2C2C2E] rounded-lg font-normal transition-colors duration-150"
            >
              Sign Out All Devices
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
