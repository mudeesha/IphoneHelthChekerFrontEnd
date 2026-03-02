'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useReport } from '@/hooks/use-report';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FreeReportView } from '@/components/dashboard/free-report-view';
import { Report } from '@/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function HomeReportPage() {
  const router = useRouter();
  const { uploadReport } = useReport();
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processReport = async () => {
      try {
        // Get the pending report data from localStorage
        const pendingReportData = localStorage.getItem('pendingReport');
        
        if (!pendingReportData) {
          setError('No report data found. Please upload a file first.');
          setIsLoading(false);
          return;
        }

        const reportMetadata = JSON.parse(pendingReportData);
        
        // Create a mock File object from the metadata
        const mockFile = new File([], reportMetadata.fileName);
        
        // Upload the report using the hook
        const newReport = await uploadReport(mockFile);
        
        setReport(newReport);
        setError(null);
        
        // Clear the pending report data
        localStorage.removeItem('pendingReport');
      } catch (err) {
        setError('Failed to process your report. Please try again.');
        console.error('Error processing report:', err);
      } finally {
        setIsLoading(false);
      }
    };

    processReport();
  }, [uploadReport]);

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-4xl">
        <Link href="/">
          <Button variant="outline" className="border-[#3A3A3C] text-[#A0A0A0] rounded-lg font-normal transition-colors duration-150">
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </Button>
        </Link>
        <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
          <CardContent className="pt-6">
            <p className="text-[#A0A0A0] text-center">Processing your report...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="space-y-4 max-w-4xl">
        <Link href="/">
          <Button variant="outline" className="border-[#3A3A3C] text-[#A0A0A0] rounded-lg font-normal transition-colors duration-150">
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </Button>
        </Link>
        <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
          <CardContent className="pt-6">
            <p className="text-[#A0A0A0]">{error || 'Report not found.'}</p>
            <Link href="/" className="block mt-4">
              <Button className="bg-[#0A84FF] hover:bg-[#409CFF] text-white rounded-lg font-semibold transition-colors duration-150">
                Upload Another File
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/">
            <Button variant="outline" size="sm" className="border-[#3A3A3C] text-[#A0A0A0] mb-4 rounded-lg font-normal transition-colors duration-150">
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-4xl font-semibold text-white mb-2 tracking-tight" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {report.fileName}
          </h1>
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

      {/* Report Content */}
      <FreeReportView report={report} />

      {/* Action Buttons */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full border-[#3A3A3C] text-[#A0A0A0] hover:bg-[#2C2C2E] rounded-lg font-normal transition-colors duration-150">
                Upload Another File
              </Button>
            </Link>
            <Link href="/dashboard" className="flex-1">
              <Button className="w-full bg-[#0A84FF] hover:bg-[#409CFF] text-white rounded-lg font-semibold transition-colors duration-150">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
