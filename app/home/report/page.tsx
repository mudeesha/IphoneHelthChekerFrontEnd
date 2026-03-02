'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FreeReportView } from '@/components/dashboard/free-report-view';
import { PremiumReportView } from '@/components/home/premium-report-view';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface FreeReportData {
  deviceName: string;
  iosVersion: string;
  reportDate: string;
  stabilityScore: number;
  totalMemoryWarnings: number;
  totalCrashes: number;
  totalThermalWarnings: number;
  totalRestarts: number;
  recentAppCrashes: Array<{
    appName: string;
    exceptionType: string;
    crashCount: number;
  }>;
  appCrashSummary: Record<string, number>;
}

interface PremiumReportData {
  deviceName: string;
  iosVersion: string;
  reportDate: string;
  stabilityScore: number;
  totalMemoryWarnings: number;
  totalCrashes: number;
  totalThermalWarnings: number;
  totalRestarts: number;
  memoryEvents?: Array<any>;
  crashEvents?: Array<any>;
  thermalEvents?: Array<any>;
  appCrashes?: Array<any>;
  appCrashSummary: Record<string, number>;
  restartEvents?: Array<any>;
  batteryHealth?: any;
  partsHistory?: any;
  chargingAnalytics?: any;
  networkAnalytics?: any;
  usageAnalytics?: any;
  trendAnalysis?: any;
  recommendations?: Array<any>;
}

type ReportData = FreeReportData | PremiumReportData;

export default function HomeReportPage() {
  const router = useRouter();
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [uploadDate, setUploadDate] = useState<string>('');

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
        setFileName(reportMetadata.fileName);
        setUploadDate(reportMetadata.uploadedAt);

        // Simulating API call to get report - in real scenario this would fetch from backend
        // For now, we'll use mock data to demonstrate both free and premium responses
        const mockReportResponse = await fetchMockReport(reportMetadata.fileName);
        
        if (mockReportResponse) {
          setReportData(mockReportResponse.data);
          setIsPremium(mockReportResponse.isPremium);
          setError(null);
        }
        
        // Clear the pending report data
        localStorage.removeItem('pendingReport');
      } catch (err) {
        console.error('Error processing report:', err);
        setError('Failed to process your report. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    processReport();
  }, []);

  const fetchMockReport = async (fileName: string): Promise<{ data: ReportData; isPremium: boolean } | null> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, alternating between free and premium reports
    // In production, this would be determined by user subscription status
    const usePremium = Math.random() > 0.5;

    if (usePremium) {
      // Premium report response
      return {
        isPremium: true,
        data: {
          deviceName: 'iPhone LL 128GB',
          iosVersion: 'iPhone OS 18.7.1 (22H31)',
          reportDate: new Date().toISOString(),
          stabilityScore: 95,
          totalMemoryWarnings: 4,
          totalCrashes: 1,
          totalThermalWarnings: 10,
          totalRestarts: 0,
          appCrashSummary: {
            'System Services': 14,
            'Safari': 42,
            'Chatly.io': 4,
          },
          memoryEvents: [
            {
              timestamp: new Date().toISOString(),
              processName: 'contactsdonationagent',
              memorySize: 40,
              reason: 'per-process-limit',
              priority: 0,
            },
          ],
          thermalEvents: [
            {
              timestamp: new Date().toISOString(),
              thermalLevel: 42,
              thermalState: 'Serious',
            },
          ],
          batteryHealth: {
            cycleCount: 387,
            designCapacity: 3349,
            currentCapacity: 2887,
            realHealthPercent: 86,
            settingsHealthPercent: 90,
            healthStatus: 'Good',
            weekManufactured: 318,
            approximateManufactureDate: 'Week 318, 2025',
            temperatureHistory: [
              {
                timeRange: 'Last 24 hours',
                avgTemp: 31.16,
                maxTemp: 45,
              },
            ],
            fastChargingSupported: true,
            fastChargingSessions: 8,
          },
          chargingAnalytics: {
            totalChargingSessions: 96,
            fastChargingSessions: 8,
            wirelessChargingSessions: 8,
            avgChargeCurrent: 193.125,
            peakChargeCurrent: 3000.0,
            avgChargeVoltage: 708.33,
            peakChargeVoltage: 9000.0,
          },
          networkAnalytics: {
            primaryCarrier: 'HUTCH LK',
            secondaryCarrier: '',
            totalSignalChanges: 0,
            totalTowerChanges: 4,
            signalHistory: [],
            wifiDisconnections: 0,
            bluetoothDisconnections: 0,
            issues: [],
            estimatedDataUsageMB: 0.0,
          },
          usageAnalytics: {
            totalScreenTimeMinutes: 663,
            avgScreenTimePerDay: 0.0,
            totalWakeups: 10,
            keyboardTotalWords: 46,
            keyboardAutocorrects: 0,
            autocorrectRate: 0.0,
            mostActiveHour: null,
          },
          trendAnalysis: {
            overallTrend: 'Stable',
            componentTrends: {
              memory: 0,
              thermal: -1,
              crashes: 0,
            },
            summary: 'Device is stable.',
            recommendation: 'No immediate action needed.',
            insights: ['Device often runs hot.'],
          },
          recommendations: [
            {
              category: 'Temperature',
              priority: 'Medium',
              title: 'Overheating Events',
              description: 'Your device has experienced multiple overheating events.',
              action: 'Avoid using resource-intensive apps while charging and keep device out of direct sunlight.',
            },
          ],
        },
      };
    } else {
      // Free report response
      return {
        isPremium: false,
        data: {
          deviceName: 'iPhone LL 128GB',
          iosVersion: 'iPhone OS 18.7.1 (22H31)',
          reportDate: new Date().toISOString(),
          stabilityScore: 60,
          totalMemoryWarnings: 4,
          totalCrashes: 1,
          totalThermalWarnings: 10,
          totalRestarts: 0,
          recentAppCrashes: [
            { appName: 'Safari', exceptionType: 'Process Issue: text-LID', crashCount: 42 },
            { appName: 'System Services', exceptionType: 'Bug Type: 211', crashCount: 14 },
            { appName: 'Chatly.io', exceptionType: 'Process Issue: text-LID', crashCount: 4 },
          ],
          appCrashSummary: { Safari: 42, 'System Services': 14, 'Chatly.io': 4 },
        } as FreeReportData,
      };
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#000000]">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-8">
          <Link href="/">
            <Button variant="outline" className="border-[#3A3A3C] text-[#A0A0A0] rounded-lg font-normal transition-colors duration-150 mb-6">
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
      </main>
    );
  }

  if (error || !reportData) {
    return (
      <main className="min-h-screen bg-[#000000]">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-8">
          <Link href="/">
            <Button variant="outline" className="border-[#3A3A3C] text-[#A0A0A0] rounded-lg font-normal transition-colors duration-150 mb-6">
              <ArrowLeft size={18} className="mr-2" />
              Back to Home
            </Button>
          </Link>
          <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
            <CardContent className="pt-6">
              <p className="text-[#A0A0A0] mb-4">{error || 'Report not found.'}</p>
              <Link href="/">
                <Button className="bg-[#0A84FF] hover:bg-[#409CFF] text-white rounded-lg font-semibold transition-colors duration-150">
                  Upload Another File
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#000000]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" size="sm" className="border-[#3A3A3C] text-[#A0A0A0] mb-4 rounded-lg font-normal transition-colors duration-150">
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-start justify-between gap-6 mb-6">
            <div>
              <h1 className="text-4xl font-semibold text-white mb-2 tracking-tight" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Device Report
              </h1>
              <p className="text-[#A0A0A0] text-base">
                {fileName} • Uploaded {new Date(uploadDate).toLocaleDateString()}
              </p>
              {isPremium && (
                <div className="mt-2 px-3 py-1 bg-[#0A84FF]/20 border border-[#0A84FF]/30 rounded-full inline-block">
                  <p className="text-[#0A84FF] text-xs font-semibold">Premium Report</p>
                </div>
              )}
            </div>
            <div className="text-right">
              <p className="text-[#8E8E93] text-sm mb-2">Stability Score</p>
              <div className={`text-5xl font-bold ${
                reportData.stabilityScore >= 90 ? 'text-[#30D158]' :
                reportData.stabilityScore >= 70 ? 'text-[#FFD60A]' :
                'text-[#FF453A]'
              }`}>
                {reportData.stabilityScore}
                <span className="text-lg">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Report Content */}
        {isPremium ? (
          <PremiumReportView data={reportData as PremiumReportData} />
        ) : (
          <div className="space-y-6">
            {/* Free Report Summary */}
            <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                    <p className="text-[#A0A0A0] text-sm mb-2">Memory Warnings</p>
                    <p className="text-2xl font-semibold text-white">{reportData.totalMemoryWarnings}</p>
                  </div>
                  <div className="p-4 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                    <p className="text-[#A0A0A0] text-sm mb-2">Total Crashes</p>
                    <p className="text-2xl font-semibold text-white">{reportData.totalCrashes}</p>
                  </div>
                  <div className="p-4 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                    <p className="text-[#A0A0A0] text-sm mb-2">Thermal Warnings</p>
                    <p className="text-2xl font-semibold text-white">{reportData.totalThermalWarnings}</p>
                  </div>
                  <div className="p-4 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                    <p className="text-[#A0A0A0] text-sm mb-2">Restarts</p>
                    <p className="text-2xl font-semibold text-white">{reportData.totalRestarts}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Device Info */}
            <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[#A0A0A0] text-sm mb-1">Device</p>
                    <p className="text-white font-semibold">{reportData.deviceName}</p>
                  </div>
                  <div>
                    <p className="text-[#A0A0A0] text-sm mb-1">iOS Version</p>
                    <p className="text-white font-semibold">{reportData.iosVersion}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* App Crashes */}
            {('recentAppCrashes' in reportData) && reportData.recentAppCrashes && reportData.recentAppCrashes.length > 0 && (
              <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
                <CardContent className="pt-6">
                  <h3 className="text-white font-semibold mb-4">Recent App Crashes</h3>
                  <div className="space-y-2">
                    {reportData.recentAppCrashes.map((crash, idx) => (
                      <div key={idx} className="p-3 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">{crash.appName}</p>
                            <p className="text-[#8E8E93] text-xs">{crash.exceptionType}</p>
                          </div>
                          <p className="text-[#FF453A] font-semibold">{crash.crashCount} crash{crash.crashCount !== 1 ? 'es' : ''}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Upgrade Prompt */}
            <Card className="bg-gradient-to-br from-[#0A84FF]/20 to-[#0A84FF]/10 border-[#0A84FF]/30">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-white font-semibold text-lg mb-2">Get Premium Insights</h3>
                  <p className="text-[#A0A0A0] text-sm mb-4">
                    Upgrade to see detailed battery health, thermal analysis, network diagnostics, and personalized recommendations.
                  </p>
                  <Link href="/plans">
                    <Button className="bg-[#0A84FF] hover:bg-[#409CFF] text-white rounded-lg font-semibold">
                      View Premium Plans
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Action Buttons */}
        <Card className="bg-[#1C1C1E] border-[#2C2C2E] mt-8">
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
    </main>
  );
}
