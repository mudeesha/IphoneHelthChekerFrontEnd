// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'free' | 'premium' | 'admin';
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

// Report types
export interface Report {
  id: string;
  userId: string;
  fileName: string;
  uploadedAt: string;
  stabilityScore: number;
  reportType: 'free' | 'premium';
  data: ReportData;
}

export interface ReportData {
  summary: {
    totalSessions: number;
    crashCount: number;
    averageSessionLength: number;
    lastCrashDate: string | null;
  };
  stability: StabilityData;
  battery?: BatteryData;
  crashes?: CrashData;
  thermalEvents?: ThermalData;
  network?: NetworkData;
  memory?: MemoryData;
  disk?: DiskData;
  performance?: PerformanceData;
  appUsage?: AppUsageData;
  connectivity?: ConnectivityData;
  sensors?: SensorData;
  gps?: GPSData;
}

export interface StabilityData {
  score: number;
  trend: number[];
  status: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface BatteryData {
  averageHealth: number;
  degradation: number;
  chargePatterns: ChargingPattern[];
  temperatureHistory: TemperaturePoint[];
}

export interface ChargingPattern {
  date: string;
  chargeTime: number;
  dischargeDuration: number;
}

export interface TemperaturePoint {
  timestamp: string;
  temperature: number;
  condition: string;
}

export interface CrashData {
  totalCrashes: number;
  topCrashingApps: CrashApp[];
  crashTrend: CrashTrendPoint[];
  commonReasons: string[];
}

export interface CrashApp {
  appName: string;
  bundleId: string;
  crashCount: number;
  lastCrashDate: string;
}

export interface CrashTrendPoint {
  date: string;
  crashes: number;
}

export interface ThermalData {
  averageTemperature: number;
  maxTemperature: number;
  throttlingEvents: number;
  thermalHistory: ThermalEvent[];
}

export interface ThermalEvent {
  timestamp: string;
  temperature: number;
  throttlingLevel: number;
}

export interface NetworkData {
  averageLatency: number;
  packetLoss: number;
  signalStrength: SignalStrengthPoint[];
  connectionSwitches: number;
  bandwidthUsage: BandwidthData[];
}

export interface SignalStrengthPoint {
  timestamp: string;
  strength: number;
  type: string;
}

export interface BandwidthData {
  date: string;
  uploaded: number;
  downloaded: number;
}

export interface MemoryData {
  averageUsage: number;
  peakUsage: number;
  swaps: number;
  memoryHistory: MemoryPoint[];
}

export interface MemoryPoint {
  timestamp: string;
  used: number;
  available: number;
}

export interface DiskData {
  totalStorage: number;
  usedStorage: number;
  systemUsage: number;
  appUsage: number;
  mediaUsage: number;
}

export interface PerformanceData {
  avgCpuUsage: number;
  avgGpuUsage: number;
  renderFrameRateDrops: number;
  performanceTrend: PerformancePoint[];
}

export interface PerformancePoint {
  timestamp: string;
  cpu: number;
  gpu: number;
}

export interface AppUsageData {
  totalAppSessions: number;
  mostUsedApps: AppUsageItem[];
  usageHistory: UsageHistoryPoint[];
}

export interface AppUsageItem {
  appName: string;
  bundleId: string;
  usageTime: number;
  sessionCount: number;
}

export interface UsageHistoryPoint {
  date: string;
  activeTime: number;
}

export interface ConnectivityData {
  wifiConnections: number;
  cellularConnections: number;
  bluetoothDevices: BluetoothDevice[];
  locationChanges: number;
}

export interface BluetoothDevice {
  name: string;
  connectionCount: number;
  lastConnected: string;
}

export interface SensorData {
  accelerometerReadings: number;
  gyroscopeReadings: number;
  compassReadings: number;
  sensorAccuracy: number;
}

export interface GPSData {
  totalSessions: number;
  averageAccuracy: number;
  locationHistory: LocationPoint[];
}

export interface LocationPoint {
  timestamp: string;
  latitude: number;
  longitude: number;
  accuracy: number;
}

// Subscription types
export interface Subscription {
  id: string;
  userId: string;
  tier: 'free' | 'premium';
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  endDate: string;
}

export interface Payment {
  id: string;
  userId: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

// History types
export interface AnalysisHistory {
  id: string;
  userId: string;
  reportId: string;
  timestamp: string;
  action: 'upload' | 'view' | 'export' | 'share';
  details: string;
}

// Stats types
export interface UserStats {
  totalReportsAnalyzed: number;
  averageStabilityScore: number;
  reportsThisMonth: number;
  storageUsed: number;
  subscriptionStatus: string;
}

// API Error type
export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}
