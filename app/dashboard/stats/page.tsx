'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';
import { useReport } from '@/hooks/use-report';
import { mockUserStats } from '@/lib/mock-data';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { TrendingUp, FileUp, Zap, Database } from 'lucide-react';

export default function StatsPage() {
  const { user } = useAuth();
  const { reports } = useReport();
  
  const userStats = mockUserStats[user?.id || ''] || {
    totalReportsAnalyzed: 0,
    averageStabilityScore: 0,
    reportsThisMonth: 0,
    storageUsed: 0,
    subscriptionStatus: 'Free',
  };

  // Data for stability distribution
  const stabilityDistribution = [
    { range: '90-100', count: reports.filter(r => r.stabilityScore >= 90).length, fill: '#10b981' },
    { range: '70-89', count: reports.filter(r => r.stabilityScore >= 70 && r.stabilityScore < 90).length, fill: '#f59e0b' },
    { range: '50-69', count: reports.filter(r => r.stabilityScore >= 50 && r.stabilityScore < 70).length, fill: '#f97316' },
    { range: '<50', count: reports.filter(r => r.stabilityScore < 50).length, fill: '#ef4444' },
  ].filter(d => d.count > 0);

  // Data for reports over time
  const reportsOverTime = [
    { month: 'Jan', reports: 2 },
    { month: 'Feb', reports: 4 },
    { month: 'Mar', reports: 3 },
    { month: 'Apr', reports: 6 },
    { month: 'May', reports: 5 },
    { month: 'Jun', reports: userStats.reportsThisMonth },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-semibold text-white mb-2 tracking-tight" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>Statistics</h1>
        <p className="text-[#A0A0A0] text-base">Overview of your analytics and usage patterns</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[#1C1C1E] border-[#2C2C2E] hover:border-[#3A3A3C] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-150">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#A0A0A0] text-sm font-normal flex items-center justify-between">
              <span>Total Reports</span>
              <FileUp className="text-[#0A84FF]" size={18} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-white">{userStats.totalReportsAnalyzed}</div>
            <p className="text-xs text-[#8E8E93] mt-1">All time analyzed</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1C1C1E] border-[#2C2C2E] hover:border-[#3A3A3C] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-150">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#A0A0A0] text-sm font-normal flex items-center justify-between">
              <span>Avg Score</span>
              <TrendingUp className="text-[#30D158]" size={18} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-white">{Math.round(userStats.averageStabilityScore)}%</div>
            <p className="text-xs text-[#8E8E93] mt-1">Average stability</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1C1C1E] border-[#2C2C2E] hover:border-[#3A3A3C] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-150">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#A0A0A0] text-sm font-normal flex items-center justify-between">
              <span>This Month</span>
              <Zap className="text-[#FFD60A]" size={18} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-white">{userStats.reportsThisMonth}</div>
            <p className="text-xs text-[#8E8E93] mt-1">Reports uploaded</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1C1C1E] border-[#2C2C2E] hover:border-[#3A3A3C] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-150">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#A0A0A0] text-sm font-normal flex items-center justify-between">
              <span>Storage</span>
              <Database className="text-[#0A84FF]" size={18} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-white">{userStats.storageUsed}MB</div>
            <p className="text-xs text-[#8E8E93] mt-1">Used of unlimited</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reports Trend */}
        <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
          <CardHeader>
            <CardTitle className="text-white text-base font-semibold">Reports Over Time</CardTitle>
            <CardDescription className="text-[#8E8E93]">Monthly report uploads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reportsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2E" />
                  <XAxis dataKey="month" stroke="#8E8E93" />
                  <YAxis stroke="#8E8E93" />
                  <Tooltip contentStyle={{ backgroundColor: '#2C2C2E', border: '1px solid #3A3A3C' }} />
                  <Bar dataKey="reports" fill="#0A84FF" name="Reports" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Stability Distribution */}
        {stabilityDistribution.length > 0 && (
          <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
            <CardHeader>
              <CardTitle className="text-white text-base font-semibold">Stability Distribution</CardTitle>
              <CardDescription className="text-[#8E8E93]">Reports by stability score range</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stabilityDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ range, count }) => `${range}: ${count}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {stabilityDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#2C2C2E', border: '1px solid #3A3A3C' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Usage Insights */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white text-base font-semibold">Usage Insights</CardTitle>
          <CardDescription className="text-[#8E8E93]">Your analytics usage patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#0A84FF]/10 border border-[#0A84FF]/30 rounded-lg">
              <h4 className="font-semibold text-[#0A84FF] mb-2">Most Active</h4>
              <p className="text-sm text-[#A0A0A0]">
                You're most active in uploading reports during business hours.
              </p>
            </div>
            <div className="p-4 bg-[#30D158]/10 border border-[#30D158]/30 rounded-lg">
              <h4 className="font-semibold text-[#30D158] mb-2">Device Health</h4>
              <p className="text-sm text-[#A0A0A0]">
                Average stability score of {Math.round(userStats.averageStabilityScore)}% indicates good device health.
              </p>
            </div>
            <div className="p-4 bg-[#FFD60A]/10 border border-[#FFD60A]/30 rounded-lg">
              <h4 className="font-semibold text-[#FFD60A] mb-2">Storage Usage</h4>
              <p className="text-sm text-[#A0A0A0]">
                You're using {userStats.storageUsed}MB of your storage allocation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white text-base font-semibold">Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-3 p-3 bg-[#2C2C2E]/30 rounded border border-[#2C2C2E]">
              <span className="text-[#0A84FF] font-bold flex-shrink-0">✓</span>
              <p className="text-[#A0A0A0] text-sm">
                Continue regular analytics uploads to maintain comprehensive device health tracking.
              </p>
            </div>
            <div className="flex gap-3 p-3 bg-[#2C2C2E]/30 rounded border border-[#2C2C2E]">
              <span className="text-[#0A84FF] font-bold flex-shrink-0">✓</span>
              <p className="text-[#A0A0A0] text-sm">
                Your device stability is excellent. Keep monitoring thermal events during heavy usage.
              </p>
            </div>
            <div className="flex gap-3 p-3 bg-[#2C2C2E]/30 rounded border border-[#2C2C2E]">
              <span className="text-[#0A84FF] font-bold flex-shrink-0">✓</span>
              <p className="text-[#A0A0A0] text-sm">
                Consider upgrading to Premium for advanced features and detailed analytics breakdowns.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
