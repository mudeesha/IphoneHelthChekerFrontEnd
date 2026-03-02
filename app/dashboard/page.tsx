'use client';

import { useAuth } from '@/lib/auth-context';
import { useReport } from '@/hooks/use-report';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileUp, TrendingUp, Lock, Star, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { reports } = useReport();
  const [stats, setStats] = useState({
    totalReports: 0,
    avgScore: 0,
    recentReport: null as any,
  });

  useEffect(() => {
    if (reports.length > 0) {
      const avgScore = Math.round(
        reports.reduce((sum, r) => sum + r.stabilityScore, 0) / reports.length
      );
      setStats({
        totalReports: reports.length,
        avgScore,
        recentReport: reports[0],
      });
    }
  }, [reports]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-semibold text-white mb-2 tracking-tight" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>Dashboard</h1>
        <p className="text-[#A0A0A0] text-base">Welcome back, {user?.name}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#1C1C1E] border-[#2C2C2E] hover:border-[#3A3A3C] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-150">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#A0A0A0] text-sm font-normal flex items-center justify-between">
              <span>Total Reports</span>
              <FileUp className="text-[#0A84FF]" size={18} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-white">{stats.totalReports}</div>
            <p className="text-xs text-[#8E8E93] mt-1">Reports analyzed</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1C1C1E] border-[#2C2C2E] hover:border-[#3A3A3C] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-150">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#A0A0A0] text-sm font-normal flex items-center justify-between">
              <span>Avg. Stability</span>
              <TrendingUp className="text-[#30D158]" size={18} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-white">{stats.avgScore}%</div>
            <p className="text-xs text-[#8E8E93] mt-1">Average score</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1C1C1E] border-[#2C2C2E] hover:border-[#3A3A3C] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-150">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#A0A0A0] text-sm font-normal flex items-center justify-between">
              <span>Subscription</span>
              <Lock className="text-[#0A84FF]" size={18} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-white capitalize">{user?.role}</div>
            <p className="text-xs text-[#8E8E93] mt-1">
              {user?.role === 'free'
                ? 'Limited analytics'
                : 'Full access'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Upgrade Card for Free Users */}
      {user?.role === 'free' && (
        <Card className="relative overflow-hidden bg-[#1C1C1E] border-[#2C2C2E]">
          <CardContent className="relative pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#2C2C2E] rounded-lg">
                  <Star className="text-[#0A84FF]" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Upgrade to Premium</h3>
                  <p className="text-[#A0A0A0] text-sm">
                    Unlock advanced analytics, unlimited reports, and detailed insights. Just $9.99/month or $99.99/year.
                  </p>
                </div>
              </div>
              <Button
                onClick={() => router.push('/plans')}
                className="bg-[#0A84FF] hover:bg-[#409CFF] text-white flex-shrink-0 rounded-lg font-semibold transition-colors duration-150"
              >
                Upgrade <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Report */}
      {stats.recentReport && (
        <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
          <CardHeader>
            <CardTitle className="text-white text-base font-semibold">Latest Report</CardTitle>
            <CardDescription className="text-[#8E8E93]">Your most recent analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-[#2C2C2E]/50 rounded-lg border border-[#3A3A3C]">
              <div className="flex-1">
                <h3 className="font-semibold text-white">{stats.recentReport.fileName}</h3>
                <p className="text-sm text-[#8E8E93] mt-1">
                  Uploaded {new Date(stats.recentReport.uploadedAt).toLocaleDateString()}
                </p>
                {user?.role !== 'free' && (
                  <p className="text-sm text-[#A0A0A0] mt-2">
                    <span className="font-semibold">Stability Score:</span>{' '}
                    <span className={
                      stats.recentReport.stabilityScore >= 90 ? 'text-[#30D158]' :
                      stats.recentReport.stabilityScore >= 70 ? 'text-[#FFD60A]' :
                      'text-[#FF453A]'
                    }>
                      {stats.recentReport.stabilityScore}%
                    </span>
                  </p>
                )}
              </div>
              <Link href={`/dashboard/report/${stats.recentReport.id}`}>
                <Button className="bg-[#0A84FF] hover:bg-[#409CFF] text-white rounded-lg font-semibold transition-colors duration-150">View Details</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white text-base font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/dashboard/upload">
              <Button variant="outline" className="w-full border-[#3A3A3C] text-[#A0A0A0] hover:bg-[#2C2C2E] hover:border-[#3A3A3C] transition-colors duration-150 rounded-lg font-normal">
                <FileUp size={18} className="mr-2" />
                Upload New Report
              </Button>
            </Link>
            {user?.role !== 'free' && (
              <>
                <Link href="/dashboard/history">
                  <Button variant="outline" className="w-full border-[#3A3A3C] text-[#A0A0A0] hover:bg-[#2C2C2E] hover:border-[#3A3A3C] transition-colors duration-150 rounded-lg font-normal">
                    View History
                  </Button>
                </Link>
              </>
            )}
            {user?.role === 'free' && (
              <Link href="/plans">
                <Button variant="outline" className="w-full border-[#3A3A3C] text-[#A0A0A0] hover:bg-[#2C2C2E] hover:border-[#3A3A3C] transition-colors duration-150 rounded-lg font-normal">
                  <Star size={18} className="mr-2" />
                  Upgrade to Premium
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
