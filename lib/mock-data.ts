import { User, Report, Subscription, Payment, AnalysisHistory, UserStats } from '@/types';

// Mock users
export const mockUsers: Record<string, User> = {
  'free-user': {
    id: 'user-1',
    email: 'free@example.com',
    name: 'Free User',
    role: 'free',
    createdAt: '2024-01-15T10:00:00Z',
  },
  'premium-user': {
    id: 'user-2',
    email: 'premium@example.com',
    name: 'Premium User',
    role: 'premium',
    createdAt: '2023-06-20T10:00:00Z',
  },
  'admin-user': {
    id: 'user-3',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2023-01-01T10:00:00Z',
  },
};

// Mock reports
export const mockReports: Record<string, Report> = {
  'report-1': {
    id: 'report-1',
    userId: 'user-1',
    fileName: 'iPhone-Analytics-2024-02-15.json',
    uploadedAt: '2024-02-15T14:30:00Z',
    stabilityScore: 87,
    reportType: 'free',
    data: {
      summary: {
        totalSessions: 245,
        crashCount: 3,
        averageSessionLength: 23.5,
        lastCrashDate: '2024-02-12T09:15:00Z',
      },
      stability: {
        score: 87,
        trend: [85, 86, 87, 86, 87, 88, 87],
        status: 'good',
      },
    },
  },
  'report-2': {
    id: 'report-2',
    userId: 'user-2',
    fileName: 'iPhone-Analytics-2024-02-20.json',
    uploadedAt: '2024-02-20T10:15:00Z',
    stabilityScore: 94,
    reportType: 'premium',
    data: {
      summary: {
        totalSessions: 512,
        crashCount: 1,
        averageSessionLength: 28.3,
        lastCrashDate: '2024-02-05T11:20:00Z',
      },
      stability: {
        score: 94,
        trend: [92, 93, 94, 93, 94, 94, 94],
        status: 'excellent',
      },
      battery: {
        averageHealth: 89,
        degradation: 11,
        chargePatterns: [
          { date: '2024-02-20', chargeTime: 45, dischargeDuration: 720 },
          { date: '2024-02-19', chargeTime: 48, dischargeDuration: 710 },
          { date: '2024-02-18', chargeTime: 42, dischargeDuration: 730 },
        ],
        temperatureHistory: [
          { timestamp: '2024-02-20T08:00:00Z', temperature: 35, condition: 'normal' },
          { timestamp: '2024-02-20T12:00:00Z', temperature: 38, condition: 'normal' },
          { timestamp: '2024-02-20T18:00:00Z', temperature: 32, condition: 'normal' },
        ],
      },
      crashes: {
        totalCrashes: 1,
        topCrashingApps: [
          { appName: 'Safari', bundleId: 'com.apple.mobilesafari', crashCount: 1, lastCrashDate: '2024-02-05' },
        ],
        crashTrend: [
          { date: '2024-02-13', crashes: 0 },
          { date: '2024-02-14', crashes: 1 },
          { date: '2024-02-15', crashes: 0 },
          { date: '2024-02-16', crashes: 0 },
          { date: '2024-02-17', crashes: 0 },
          { date: '2024-02-18', crashes: 0 },
          { date: '2024-02-19', crashes: 0 },
          { date: '2024-02-20', crashes: 0 },
        ],
        commonReasons: ['Memory pressure', 'Unexpected termination'],
      },
      thermalEvents: {
        averageTemperature: 35.2,
        maxTemperature: 42,
        throttlingEvents: 0,
        thermalHistory: [
          { timestamp: '2024-02-20T08:00:00Z', temperature: 34, throttlingLevel: 0 },
          { timestamp: '2024-02-20T12:00:00Z', temperature: 38, throttlingLevel: 0 },
          { timestamp: '2024-02-20T16:00:00Z', temperature: 36, throttlingLevel: 0 },
          { timestamp: '2024-02-20T20:00:00Z', temperature: 32, throttlingLevel: 0 },
        ],
      },
      network: {
        averageLatency: 45,
        packetLoss: 0.2,
        signalStrength: [
          { timestamp: '2024-02-20T08:00:00Z', strength: -95, type: '4G' },
          { timestamp: '2024-02-20T14:00:00Z', strength: -88, type: '5G' },
          { timestamp: '2024-02-20T20:00:00Z', strength: -92, type: '4G' },
        ],
        connectionSwitches: 12,
        bandwidthUsage: [
          { date: '2024-02-20', uploaded: 125, downloaded: 580 },
          { date: '2024-02-19', uploaded: 98, downloaded: 520 },
          { date: '2024-02-18', uploaded: 145, downloaded: 610 },
        ],
      },
      memory: {
        averageUsage: 62,
        peakUsage: 78,
        swaps: 3,
        memoryHistory: [
          { timestamp: '2024-02-20T08:00:00Z', used: 58, available: 42 },
          { timestamp: '2024-02-20T12:00:00Z', used: 68, available: 32 },
          { timestamp: '2024-02-20T16:00:00Z', used: 65, available: 35 },
          { timestamp: '2024-02-20T20:00:00Z', used: 55, available: 45 },
        ],
      },
      disk: {
        totalStorage: 256,
        usedStorage: 198,
        systemUsage: 45,
        appUsage: 87,
        mediaUsage: 66,
      },
      performance: {
        avgCpuUsage: 28,
        avgGpuUsage: 32,
        renderFrameRateDrops: 2,
        performanceTrend: [
          { timestamp: '2024-02-20T08:00:00Z', cpu: 25, gpu: 30 },
          { timestamp: '2024-02-20T12:00:00Z', cpu: 32, gpu: 35 },
          { timestamp: '2024-02-20T16:00:00Z', cpu: 28, gpu: 32 },
          { timestamp: '2024-02-20T20:00:00Z', cpu: 24, gpu: 28 },
        ],
      },
      appUsage: {
        totalAppSessions: 512,
        mostUsedApps: [
          { appName: 'Safari', bundleId: 'com.apple.mobilesafari', usageTime: 245, sessionCount: 120 },
          { appName: 'Messages', bundleId: 'com.apple.MobileSMS', usageTime: 156, sessionCount: 85 },
          { appName: 'Photos', bundleId: 'com.apple.mobileslideshow', usageTime: 98, sessionCount: 42 },
        ],
        usageHistory: [
          { date: '2024-02-20', activeTime: 312 },
          { date: '2024-02-19', activeTime: 298 },
          { date: '2024-02-18', activeTime: 325 },
        ],
      },
      connectivity: {
        wifiConnections: 45,
        cellularConnections: 128,
        bluetoothDevices: [
          { name: 'AirPods Pro', connectionCount: 28, lastConnected: '2024-02-20T18:30:00Z' },
          { name: 'Apple Watch', connectionCount: 156, lastConnected: '2024-02-20T20:45:00Z' },
        ],
        locationChanges: 23,
      },
      sensors: {
        accelerometerReadings: 12548,
        gyroscopeReadings: 12512,
        compassReadings: 1234,
        sensorAccuracy: 97,
      },
      gps: {
        totalSessions: 28,
        averageAccuracy: 12.5,
        locationHistory: [
          { timestamp: '2024-02-20T08:15:00Z', latitude: 37.7749, longitude: -122.4194, accuracy: 15 },
          { timestamp: '2024-02-20T12:30:00Z', latitude: 37.7751, longitude: -122.4186, accuracy: 10 },
          { timestamp: '2024-02-20T18:45:00Z', latitude: 37.7748, longitude: -122.4192, accuracy: 12 },
        ],
      },
    },
  },
};

// Mock subscriptions
export const mockSubscriptions: Subscription[] = [
  {
    id: 'sub-1',
    userId: 'user-1',
    tier: 'free',
    status: 'active',
    startDate: '2024-01-15T10:00:00Z',
    endDate: '2025-01-15T10:00:00Z',
  },
  {
    id: 'sub-2',
    userId: 'user-2',
    tier: 'premium',
    status: 'active',
    startDate: '2023-06-20T10:00:00Z',
    endDate: '2025-06-20T10:00:00Z',
  },
];

// Mock payments
export const mockPayments: Payment[] = [
  {
    id: 'pay-1',
    userId: 'user-2',
    subscriptionId: 'sub-2',
    amount: 9.99,
    currency: 'USD',
    status: 'completed',
    createdAt: '2024-02-20T10:00:00Z',
  },
  {
    id: 'pay-2',
    userId: 'user-2',
    subscriptionId: 'sub-2',
    amount: 9.99,
    currency: 'USD',
    status: 'completed',
    createdAt: '2024-01-20T10:00:00Z',
  },
];

// Mock analysis history
export const mockHistory: AnalysisHistory[] = [
  {
    id: 'hist-1',
    userId: 'user-2',
    reportId: 'report-2',
    timestamp: '2024-02-20T10:15:00Z',
    action: 'upload',
    details: 'Uploaded iPhone analytics report',
  },
  {
    id: 'hist-2',
    userId: 'user-2',
    reportId: 'report-2',
    timestamp: '2024-02-20T10:30:00Z',
    action: 'view',
    details: 'Viewed detailed analytics report',
  },
  {
    id: 'hist-3',
    userId: 'user-2',
    reportId: 'report-2',
    timestamp: '2024-02-20T11:00:00Z',
    action: 'export',
    details: 'Exported report as PDF',
  },
];

// Mock user stats
export const mockUserStats: Record<string, UserStats> = {
  'user-1': {
    totalReportsAnalyzed: 5,
    averageStabilityScore: 82.4,
    reportsThisMonth: 2,
    storageUsed: 125,
    subscriptionStatus: 'Free',
  },
  'user-2': {
    totalReportsAnalyzed: 28,
    averageStabilityScore: 91.2,
    reportsThisMonth: 6,
    storageUsed: 580,
    subscriptionStatus: 'Premium',
  },
};
