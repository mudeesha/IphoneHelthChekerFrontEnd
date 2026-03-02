'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AlertCircle, CheckCircle2, TrendingDown } from 'lucide-react';

interface PremiumReportData {
  deviceName: string;
  iosVersion: string;
  reportDate: string;
  stabilityScore: number;
  totalMemoryWarnings: number;
  totalCrashes: number;
  totalThermalWarnings: number;
  totalRestarts: number;
  memoryEvents?: Array<{
    timestamp: string;
    processName: string;
    memorySize: number;
    reason: string;
    priority: number;
  }>;
  crashEvents?: Array<{
    timestamp: string;
    panicString: string;
    panicReason?: string;
    bundleId?: string;
    status?: string;
    crashCount: number;
  }>;
  thermalEvents?: Array<{
    timestamp: string;
    thermalLevel: number;
    thermalState: string;
  }>;
  appCrashes?: Array<{
    timestamp: string;
    appName: string;
    exceptionType: string;
    exceptionReason?: string;
  }>;
  appCrashSummary: Record<string, number>;
  restartEvents?: Array<any>;
  batteryHealth?: {
    cycleCount: number;
    designCapacity: number;
    currentCapacity: number;
    realHealthPercent: number;
    settingsHealthPercent: number;
    healthStatus: string;
    weekManufactured: number;
    approximateManufactureDate: string;
    temperatureHistory: Array<{
      timeRange: string;
      avgTemp: number;
      maxTemp: number;
    }>;
    fastChargingSupported: boolean;
    fastChargingSessions: number;
    recentChargeCycles?: Array<any>;
  };
  partsHistory?: {
    components: Record<string, any>;
    totalReplacedParts: number;
    hasNonGenuine: boolean;
    hasUsedParts: boolean;
    overallAssessment: string;
    warnings: string[];
  };
  chargingAnalytics?: {
    totalChargingSessions: number;
    fastChargingSessions: number;
    wirelessChargingSessions: number;
    avgChargeCurrent: number;
    peakChargeCurrent: number;
    avgChargeVoltage: number;
    peakChargeVoltage: number;
    recentSessions?: Array<any>;
  };
  networkAnalytics?: {
    primaryCarrier: string;
    secondaryCarrier: string;
    totalSignalChanges: number;
    totalTowerChanges: number;
    signalHistory: Array<any>;
    wifiDisconnections: number;
    bluetoothDisconnections: number;
    issues: Array<any>;
    estimatedDataUsageMB: number;
  };
  usageAnalytics?: {
    totalScreenTimeMinutes: number;
    avgScreenTimePerDay: number;
    totalWakeups: number;
    keyboardTotalWords: number;
    keyboardAutocorrects: number;
    autocorrectRate: number;
    mostActiveHour?: string;
  };
  trendAnalysis?: {
    overallTrend: string;
    componentTrends: {
      memory: number;
      thermal: number;
      crashes: number;
    };
    summary: string;
    recommendation: string;
    insights: string[];
  };
  recommendations?: Array<{
    category: string;
    priority: string;
    title: string;
    description: string;
    action: string;
  }>;
}

export function PremiumReportView({ data }: { data: PremiumReportData }) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-[#30D158]';
    if (score >= 70) return 'text-[#FFD60A]';
    return 'text-[#FF453A]';
  };

  const getThermalColor = (level: number) => {
    if (level >= 50) return 'text-[#FF453A]';
    if (level >= 30) return 'text-[#FFD60A]';
    return 'text-[#30D158]';
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-[#FF453A]';
      case 'medium':
        return 'bg-[#FFD60A]';
      default:
        return 'bg-[#30D158]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Device Info */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white text-base font-semibold">Device Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-[#A0A0A0] text-sm mb-1">Device</p>
              <p className="text-white font-semibold">{data.deviceName}</p>
            </div>
            <div>
              <p className="text-[#A0A0A0] text-sm mb-1">iOS Version</p>
              <p className="text-white font-semibold">{data.iosVersion}</p>
            </div>
            <div>
              <p className="text-[#A0A0A0] text-sm mb-1">Report Date</p>
              <p className="text-white font-semibold">{new Date(data.reportDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-[#A0A0A0] text-sm mb-1">Stability Score</p>
              <p className={`text-2xl font-semibold ${getScoreColor(data.stabilityScore)}`}>{data.stabilityScore}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white text-base font-semibold">Key Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
              <p className="text-[#A0A0A0] text-xs mb-2">Memory Warnings</p>
              <p className="text-2xl font-semibold text-white">{data.totalMemoryWarnings}</p>
            </div>
            <div className="p-3 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
              <p className="text-[#A0A0A0] text-xs mb-2">Total Crashes</p>
              <p className="text-2xl font-semibold text-white">{data.totalCrashes}</p>
            </div>
            <div className="p-3 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
              <p className="text-[#A0A0A0] text-xs mb-2">Thermal Warnings</p>
              <p className="text-2xl font-semibold text-white">{data.totalThermalWarnings}</p>
            </div>
            <div className="p-3 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
              <p className="text-[#A0A0A0] text-xs mb-2">Restarts</p>
              <p className="text-2xl font-semibold text-white">{data.totalRestarts}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Crashes Summary */}
      {Object.keys(data.appCrashSummary).length > 0 && (
        <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
          <CardHeader>
            <CardTitle className="text-white text-base font-semibold">Top Crashing Apps</CardTitle>
            <CardDescription className="text-[#8E8E93]">Apps with the most crashes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(data.appCrashSummary)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([app, count]) => (
                  <div key={app} className="flex items-center justify-between p-3 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                    <p className="text-white font-medium">{app}</p>
                    <Badge className="bg-[#FF453A]">{count} crash{count !== 1 ? 'es' : ''}</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Battery Health */}
      {data.batteryHealth && (
        <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
          <CardHeader>
            <CardTitle className="text-white text-base font-semibold">Battery Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                <p className="text-[#A0A0A0] text-sm mb-2">Health Status</p>
                <p className="text-white font-semibold text-lg">{data.batteryHealth.healthStatus}</p>
                <p className="text-[#8E8E93] text-xs mt-1">{data.batteryHealth.realHealthPercent}% capacity</p>
              </div>
              <div className="p-4 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                <p className="text-[#A0A0A0] text-sm mb-2">Cycle Count</p>
                <p className="text-white font-semibold text-lg">{data.batteryHealth.cycleCount}</p>
                <p className="text-[#8E8E93] text-xs mt-1">Design: {data.batteryHealth.designCapacity}mAh</p>
              </div>
              <div className="p-4 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                <p className="text-[#A0A0A0] text-sm mb-2">Manufacture Date</p>
                <p className="text-white font-semibold text-sm">{data.batteryHealth.approximateManufactureDate}</p>
              </div>
            </div>

            {/* Temperature History */}
            {data.batteryHealth.temperatureHistory && data.batteryHealth.temperatureHistory.length > 0 && (
              <div>
                <p className="text-white font-semibold text-sm mb-3">Temperature History</p>
                <div className="space-y-2">
                  {data.batteryHealth.temperatureHistory.map((temp, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-[#2C2C2E] rounded border border-[#3A3A3C]">
                      <span className="text-[#A0A0A0] text-sm">{temp.timeRange}</span>
                      <span className="text-white text-sm font-medium">
                        Avg: {temp.avgTemp.toFixed(1)}°C | Max: {temp.maxTemp}°C
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Thermal Events */}
      {data.thermalEvents && data.thermalEvents.length > 0 && (
        <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
          <CardHeader>
            <CardTitle className="text-white text-base font-semibold">Thermal Events</CardTitle>
            <CardDescription className="text-[#8E8E93]">Recent overheating incidents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {data.thermalEvents.slice(0, 10).map((event, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                  <div>
                    <p className="text-white text-sm font-medium">{event.thermalState}</p>
                    <p className="text-[#8E8E93] text-xs">{new Date(event.timestamp).toLocaleString()}</p>
                  </div>
                  <span className={`font-semibold ${getThermalColor(event.thermalLevel)}`}>
                    Level {event.thermalLevel}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charging Analytics */}
      {data.chargingAnalytics && (
        <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
          <CardHeader>
            <CardTitle className="text-white text-base font-semibold">Charging Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-3 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                <p className="text-[#A0A0A0] text-xs mb-2">Total Sessions</p>
                <p className="text-2xl font-semibold text-white">{data.chargingAnalytics.totalChargingSessions}</p>
              </div>
              <div className="p-3 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                <p className="text-[#A0A0A0] text-xs mb-2">Fast Charging</p>
                <p className="text-2xl font-semibold text-white">{data.chargingAnalytics.fastChargingSessions}</p>
              </div>
              <div className="p-3 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                <p className="text-[#A0A0A0] text-xs mb-2">Wireless Charging</p>
                <p className="text-2xl font-semibold text-white">{data.chargingAnalytics.wirelessChargingSessions}</p>
              </div>
              <div className="p-3 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                <p className="text-[#A0A0A0] text-xs mb-2">Avg Current</p>
                <p className="text-2xl font-semibold text-white">{data.chargingAnalytics.avgChargeCurrent.toFixed(0)}mA</p>
              </div>
              <div className="p-3 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                <p className="text-[#A0A0A0] text-xs mb-2">Peak Current</p>
                <p className="text-2xl font-semibold text-white">{data.chargingAnalytics.peakChargeCurrent.toFixed(0)}mA</p>
              </div>
              <div className="p-3 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                <p className="text-[#A0A0A0] text-xs mb-2">Avg Voltage</p>
                <p className="text-2xl font-semibold text-white">{data.chargingAnalytics.avgChargeVoltage.toFixed(0)}V</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Network Analytics */}
      {data.networkAnalytics && (
        <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
          <CardHeader>
            <CardTitle className="text-white text-base font-semibold">Network Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-3 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                <p className="text-[#A0A0A0] text-xs mb-2">Primary Carrier</p>
                <p className="text-white font-semibold text-sm">{data.networkAnalytics.primaryCarrier}</p>
              </div>
              <div className="p-3 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                <p className="text-[#A0A0A0] text-xs mb-2">Signal Changes</p>
                <p className="text-2xl font-semibold text-white">{data.networkAnalytics.totalSignalChanges}</p>
              </div>
              <div className="p-3 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                <p className="text-[#A0A0A0] text-xs mb-2">Tower Changes</p>
                <p className="text-2xl font-semibold text-white">{data.networkAnalytics.totalTowerChanges}</p>
              </div>
              <div className="p-3 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                <p className="text-[#A0A0A0] text-xs mb-2">WiFi Disconnections</p>
                <p className="text-2xl font-semibold text-white">{data.networkAnalytics.wifiDisconnections}</p>
              </div>
              <div className="p-3 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                <p className="text-[#A0A0A0] text-xs mb-2">Bluetooth Disconnections</p>
                <p className="text-2xl font-semibold text-white">{data.networkAnalytics.bluetoothDisconnections}</p>
              </div>
              <div className="p-3 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                <p className="text-[#A0A0A0] text-xs mb-2">Data Usage</p>
                <p className="text-2xl font-semibold text-white">{data.networkAnalytics.estimatedDataUsageMB.toFixed(1)}MB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Usage Analytics */}
      {data.usageAnalytics && (
        <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
          <CardHeader>
            <CardTitle className="text-white text-base font-semibold">Usage Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-3 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                <p className="text-[#A0A0A0] text-xs mb-2">Screen Time</p>
                <p className="text-2xl font-semibold text-white">{data.usageAnalytics.totalScreenTimeMinutes}m</p>
              </div>
              <div className="p-3 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                <p className="text-[#A0A0A0] text-xs mb-2">Wakeups</p>
                <p className="text-2xl font-semibold text-white">{data.usageAnalytics.totalWakeups}</p>
              </div>
              <div className="p-3 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                <p className="text-[#A0A0A0] text-xs mb-2">Keyboard Words</p>
                <p className="text-2xl font-semibold text-white">{data.usageAnalytics.keyboardTotalWords}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {data.recommendations && data.recommendations.length > 0 && (
        <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
          <CardHeader>
            <CardTitle className="text-white text-base font-semibold">Recommendations</CardTitle>
            <CardDescription className="text-[#8E8E93]">Actions to improve device health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.recommendations.map((rec, idx) => (
                <div key={idx} className="p-4 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                  <div className="flex items-start gap-3 mb-2">
                    <Badge className={`${getPriorityBadgeColor(rec.priority)} text-white`}>
                      {rec.priority}
                    </Badge>
                    <div>
                      <p className="text-white font-semibold">{rec.title}</p>
                      <p className="text-[#8E8E93] text-sm">{rec.category}</p>
                    </div>
                  </div>
                  <p className="text-[#A0A0A0] text-sm mb-2">{rec.description}</p>
                  <p className="text-[#0A84FF] text-sm">→ {rec.action}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trend Analysis */}
      {data.trendAnalysis && (
        <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
          <CardHeader>
            <CardTitle className="text-white text-base font-semibold">Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                <p className="text-white font-semibold mb-2">Overall Trend: {data.trendAnalysis.overallTrend}</p>
                <p className="text-[#A0A0A0] text-sm mb-3">{data.trendAnalysis.summary}</p>
                <p className="text-[#0A84FF] text-sm font-medium">Recommendation: {data.trendAnalysis.recommendation}</p>
              </div>

              {data.trendAnalysis.insights.length > 0 && (
                <div>
                  <p className="text-white font-semibold text-sm mb-2">Key Insights</p>
                  <div className="space-y-2">
                    {data.trendAnalysis.insights.map((insight, idx) => (
                      <div key={idx} className="flex gap-2 p-2 bg-[#2C2C2E] rounded border border-[#3A3A3C]">
                        <CheckCircle2 className="text-[#30D158] flex-shrink-0 mt-0.5" size={16} />
                        <p className="text-[#A0A0A0] text-sm">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
