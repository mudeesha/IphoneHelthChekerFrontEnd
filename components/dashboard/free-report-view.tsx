'use client';

import { Report } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export function FreeReportView({ report }: { report: Report }) {
  const stabilityData = report.data.stability.trend.map((score, index) => ({
    day: `Day ${index + 1}`,
    score,
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-[#30D158]';
      case 'good':
        return 'text-[#0A84FF]';
      case 'fair':
        return 'text-[#FFD60A]';
      case 'poor':
        return 'text-[#FF453A]';
      default:
        return 'text-[#A0A0A0]';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-[#30D158]/10 border-[#30D158]/30';
      case 'good':
        return 'bg-[#0A84FF]/10 border-[#0A84FF]/30';
      case 'fair':
        return 'bg-[#FFD60A]/10 border-[#FFD60A]/30';
      case 'poor':
        return 'bg-[#FF453A]/10 border-[#FF453A]/30';
      default:
        return 'bg-[#A0A0A0]/10 border-[#A0A0A0]/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stability Overview */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white text-base font-semibold">Stability Overview</CardTitle>
          <CardDescription className="text-[#8E8E93]">Device stability score trend over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className={`p-4 rounded-lg border ${getStatusBgColor(report.data.stability.status)}`}>
              <p className="text-[#A0A0A0] text-sm mb-1">Current Status</p>
              <p className={`text-2xl font-semibold capitalize ${getStatusColor(report.data.stability.status)}`}>
                {report.data.stability.status}
              </p>
            </div>
            <div className="p-4 rounded-lg border border-[#2C2C2E] bg-[#1C1C1E]">
              <p className="text-[#A0A0A0] text-sm mb-1">Overall Score</p>
              <p className="text-2xl font-semibold text-white">{report.data.stability.score}%</p>
            </div>
            <div className="p-4 rounded-lg border border-[#2C2C2E] bg-[#1C1C1E]">
              <p className="text-[#A0A0A0] text-sm mb-1">Total Sessions</p>
              <p className="text-2xl font-semibold text-white">{report.data.summary.totalSessions}</p>
            </div>
          </div>

          {/* Trend Chart */}
          <div className="h-80 -mx-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stabilityData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2E" />
                <XAxis dataKey="day" stroke="#8E8E93" />
                <YAxis stroke="#8E8E93" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#2C2C2E',
                    border: '1px solid #3A3A3C',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#A0A0A0' }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#0A84FF"
                  dot={{ fill: '#0A84FF', r: 4 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white text-base font-semibold">Summary Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border border-[#2C2C2E] rounded-lg bg-[#1C1C1E]">
              <p className="text-[#A0A0A0] text-sm mb-2">Total Crashes</p>
              <p className="text-3xl font-semibold text-white">{report.data.summary.crashCount}</p>
              <p className="text-xs text-[#8E8E93] mt-1">
                {report.data.summary.lastCrashDate
                  ? `Last crash: ${new Date(report.data.summary.lastCrashDate).toLocaleDateString()}`
                  : 'No crashes recorded'}
              </p>
            </div>
            <div className="p-4 border border-[#2C2C2E] rounded-lg bg-[#1C1C1E]">
              <p className="text-[#A0A0A0] text-sm mb-2">Avg Session Duration</p>
              <p className="text-3xl font-semibold text-white">{report.data.summary.averageSessionLength}m</p>
              <p className="text-xs text-[#8E8E93] mt-1">Average minutes per session</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white text-base font-semibold">Key Insights</CardTitle>
          <CardDescription className="text-[#8E8E93]">Important findings from your analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3 p-3 bg-[#0A84FF]/10 border border-[#0A84FF]/30 rounded-lg">
              <span className="text-[#0A84FF] font-bold flex-shrink-0">•</span>
              <p className="text-[#A0A0A0]">
                Device stability is {report.data.stability.status}. 
                {report.data.stability.score >= 90
                  ? ' Your device is performing excellently.'
                  : report.data.stability.score >= 70
                  ? ' Consider monitoring performance metrics.'
                  : ' You may want to investigate stability issues.'}
              </p>
            </div>
            <div className="flex gap-3 p-3 bg-[#A0A0A0]/10 border border-[#A0A0A0]/30 rounded-lg">
              <span className="text-[#A0A0A0] font-bold flex-shrink-0">•</span>
              <p className="text-[#A0A0A0]">
                {report.data.summary.crashCount === 0
                  ? 'No crashes detected during the analysis period.'
                  : `${report.data.summary.crashCount} crash${report.data.summary.crashCount !== 1 ? 'es' : ''} detected.`}
              </p>
            </div>
            <div className="flex gap-3 p-3 bg-[#A0A0A0]/10 border border-[#A0A0A0]/30 rounded-lg">
              <span className="text-[#A0A0A0] font-bold flex-shrink-0">•</span>
              <p className="text-[#A0A0A0]">
                Average session duration of {report.data.summary.averageSessionLength} minutes indicates{' '}
                {report.data.summary.averageSessionLength > 30
                  ? 'heavy usage patterns.'
                  : 'moderate usage patterns.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
