'use client';

import { useAuth } from '@/lib/auth-context';
import { useReport } from '@/hooks/use-report';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockReports } from '@/lib/mock-data';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';
import { PremiumReportSections } from '@/components/dashboard/premium-report-sections';
import { FreeReportView } from '@/components/dashboard/free-report-view';

export default function ReportPage({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const report = mockReports[params.id];

  if (!report) {
    return (
      <div className="space-y-4">
        <Link href="/dashboard">
          <Button variant="outline" className="border-[#3A3A3C] text-[#A0A0A0] rounded-lg font-normal transition-colors duration-150">
            <ArrowLeft size={18} className="mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
          <CardContent className="pt-6">
            <p className="text-[#A0A0A0]">Report not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isPremium = user?.role === 'premium' || user?.role === 'admin';
  const canViewPremium = isPremium && report.reportType === 'premium';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="border-[#3A3A3C] text-[#A0A0A0] mb-4 rounded-lg font-normal transition-colors duration-150">
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-4xl font-semibold text-white mb-2 tracking-tight" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>{report.fileName}</h1>
          <p className="text-[#A0A0A0] text-base">
            Uploaded {new Date(report.uploadedAt).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[#8E8E93] text-sm mb-2">Stability Score</p>
          <div className={`text-4xl font-semibold ${
            report.stabilityScore >= 90 ? 'text-[#30D158]' :
            report.stabilityScore >= 70 ? 'text-[#FFD60A]' :
            'text-[#FF453A]'
          }`}>
            {report.stabilityScore}%
          </div>
        </div>
      </div>

      {/* Free Report - Always visible */}
      <FreeReportView report={report} />

      {/* Premium Report - Conditional */}
      {!isPremium && report.reportType === 'premium' ? (
        <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-base font-semibold">
              <Lock size={20} />
              Premium Analytics Locked
            </CardTitle>
            <CardDescription className="text-[#8E8E93]">
              Upgrade to Premium to view detailed analytics including battery health, crashes,
              thermal events, network analysis, and more.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/settings">
              <Button className="bg-[#0A84FF] hover:bg-[#409CFF] text-white rounded-lg font-semibold transition-colors duration-150">
                Upgrade to Premium
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : canViewPremium ? (
        <PremiumReportSections report={report} />
      ) : null}
    </div>
  );
}
