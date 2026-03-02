'use client';

import { Report } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart
} from 'recharts';

export function PremiumReportSections({ report }: { report: Report }) {
  const batteryData = report.data.battery?.chargePatterns.map(p => ({
    ...p,
    chargeTime: Math.round(p.chargeTime),
  })) || [];

  const crashTrendData = report.data.crashes?.crashTrend || [];

  const thermalData = report.data.thermalEvents?.thermalHistory.map(t => ({
    time: new Date(t.timestamp).toLocaleTimeString(),
    temperature: Math.round(t.temperature * 10) / 10,
  })) || [];

  const networkData = report.data.network?.bandwidthUsage.map(b => ({
    date: b.date,
    download: Math.round(b.downloaded / 1024),
    upload: Math.round(b.uploaded / 1024),
  })) || [];

  const memoryData = report.data.memory?.memoryHistory.map(m => ({
    time: new Date(m.timestamp).toLocaleTimeString(),
    used: m.used,
    available: m.available,
  })) || [];

  const performanceData = report.data.performance?.performanceTrend.map(p => ({
    time: new Date(p.timestamp).toLocaleTimeString(),
    cpu: p.cpu,
    gpu: p.gpu,
  })) || [];

  const diskColors = [
    '#3b82f6', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6'
  ];

  const diskData = report.data.disk ? [
    { name: 'System', value: report.data.disk.systemUsage },
    { name: 'Apps', value: report.data.disk.appUsage },
    { name: 'Media', value: report.data.disk.mediaUsage },
  ] : [];

  return (
    <div className="space-y-6">
      {/* Battery Health */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white text-base font-semibold">Battery Health</CardTitle>
          <CardDescription className="text-[#8E8E93]">
            Battery health: {report.data.battery?.averageHealth}% | 
            Degradation: {report.data.battery?.degradation}%
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Charge Patterns */}
            <div>
              <h4 className="text-sm font-semibold text-[#A0A0A0] mb-4">Charging Patterns</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={batteryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2E" />
                    <XAxis dataKey="date" stroke="#8E8E93" />
                    <YAxis stroke="#8E8E93" />
                    <Tooltip contentStyle={{ backgroundColor: '#2C2C2E', border: '1px solid #3A3A3C' }} />
                    <Bar dataKey="chargeTime" fill="#0A84FF" name="Charge Time (min)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Temperature History */}
            <div>
              <h4 className="text-sm font-semibold text-[#A0A0A0] mb-4">Temperature History</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={report.data.battery?.temperatureHistory.map(t => ({
                    time: new Date(t.timestamp).toLocaleTimeString(),
                    temp: Math.round(t.temperature * 10) / 10,
                  })) || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2E" />
                    <XAxis dataKey="time" stroke="#8E8E93" />
                    <YAxis stroke="#8E8E93" />
                    <Tooltip contentStyle={{ backgroundColor: '#2C2C2E', border: '1px solid #3A3A3C' }} />
                    <Area type="monotone" dataKey="temp" fill="#FFD60A" stroke="#FFD60A" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crashes Analysis */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white text-base font-semibold">Crashes Analysis</CardTitle>
          <CardDescription className="text-[#8E8E93]">
            Total crashes: {report.data.crashes?.totalCrashes || 0}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Crash Trend */}
            <div>
              <h4 className="text-sm font-semibold text-[#A0A0A0] mb-4">Crash Trend</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={crashTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2E" />
                    <XAxis dataKey="date" stroke="#8E8E93" />
                    <YAxis stroke="#8E8E93" />
                    <Tooltip contentStyle={{ backgroundColor: '#2C2C2E', border: '1px solid #3A3A3C' }} />
                    <Line type="monotone" dataKey="crashes" stroke="#FF453A" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Crashing Apps */}
            <div>
              <h4 className="text-sm font-semibold text-[#A0A0A0] mb-4">Top Crashing Apps</h4>
              <div className="space-y-3">
                {report.data.crashes?.topCrashingApps.slice(0, 5).map((app, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-[#2C2C2E]/30 rounded border border-[#2C2C2E]">
                    <div>
                      <p className="text-sm font-medium text-white">{app.appName}</p>
                      <p className="text-xs text-[#8E8E93]">{app.bundleId}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#FF453A]">{app.crashCount}</p>
                      <p className="text-xs text-[#8E8E93]">crashes</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Thermal Events */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white text-base font-semibold">Thermal Events</CardTitle>
          <CardDescription className="text-[#8E8E93]">
            Avg: {report.data.thermalEvents?.averageTemperature}°C | 
            Max: {report.data.thermalEvents?.maxTemperature}°C |
            Throttling: {report.data.thermalEvents?.throttlingEvents}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={thermalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2E" />
                <XAxis dataKey="time" stroke="#8E8E93" />
                <YAxis stroke="#8E8E93" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#2C2C2E', border: '1px solid #3A3A3C' }}
                  formatter={(value) => `${value}°C`}
                />
                <Area
                  type="monotone"
                  dataKey="temperature"
                  fill="#FFD60A"
                  stroke="#FFD60A"
                  name="Temperature"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Network Analysis */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white text-base font-semibold">Network Analysis</CardTitle>
          <CardDescription className="text-[#8E8E93]">
            Avg Latency: {report.data.network?.averageLatency}ms | 
            Packet Loss: {report.data.network?.packetLoss}%
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Bandwidth Usage */}
            <div>
              <h4 className="text-sm font-semibold text-[#A0A0A0] mb-4">Bandwidth Usage (MB)</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={networkData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2E" />
                    <XAxis dataKey="date" stroke="#8E8E93" />
                    <YAxis stroke="#8E8E93" />
                    <Tooltip contentStyle={{ backgroundColor: '#2C2C2E', border: '1px solid #3A3A3C' }} />
                    <Legend />
                    <Bar dataKey="download" fill="#0A84FF" name="Downloaded" />
                    <Bar dataKey="upload" fill="#30D158" name="Uploaded" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Connection Info */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-3 bg-[#2C2C2E]/30 rounded border border-[#2C2C2E]">
                <p className="text-xs text-[#8E8E93]">WiFi Connections</p>
                <p className="text-lg font-bold text-white">{report.data.connectivity?.wifiConnections}</p>
              </div>
              <div className="p-3 bg-[#2C2C2E]/30 rounded border border-[#2C2C2E]">
                <p className="text-xs text-[#8E8E93]">Cellular</p>
                <p className="text-lg font-bold text-white">{report.data.connectivity?.cellularConnections}</p>
              </div>
              <div className="p-3 bg-[#2C2C2E]/30 rounded border border-[#2C2C2E]">
                <p className="text-xs text-[#8E8E93]">Connection Switches</p>
                <p className="text-lg font-bold text-white">{report.data.network?.connectionSwitches}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Memory & Performance */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white text-base font-semibold">Memory & Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Memory Usage */}
            <div>
              <h4 className="text-sm font-semibold text-[#A0A0A0] mb-4">Memory Usage (%)</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={memoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2E" />
                    <XAxis dataKey="time" stroke="#8E8E93" />
                    <YAxis stroke="#8E8E93" domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: '#2C2C2E', border: '1px solid #3A3A3C' }} />
                    <Area type="monotone" dataKey="used" fill="#0A84FF" stroke="#0A84FF" name="Used" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* CPU & GPU Usage */}
            <div>
              <h4 className="text-sm font-semibold text-[#A0A0A0] mb-4">CPU & GPU Usage (%)</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2E" />
                    <XAxis dataKey="time" stroke="#8E8E93" />
                    <YAxis stroke="#8E8E93" domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: '#2C2C2E', border: '1px solid #3A3A3C' }} />
                    <Legend />
                    <Line type="monotone" dataKey="cpu" stroke="#0A84FF" strokeWidth={2} name="CPU" />
                    <Line type="monotone" dataKey="gpu" stroke="#FFD60A" strokeWidth={2} name="GPU" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="p-3 bg-[#2C2C2E]/30 rounded border border-[#2C2C2E]">
              <p className="text-xs text-[#8E8E93]">Avg Usage</p>
              <p className="text-lg font-bold text-white">{report.data.memory?.averageUsage}%</p>
            </div>
            <div className="p-3 bg-[#2C2C2E]/30 rounded border border-[#2C2C2E]">
              <p className="text-xs text-[#8E8E93]">Peak Usage</p>
              <p className="text-lg font-bold text-white">{report.data.memory?.peakUsage}%</p>
            </div>
            <div className="p-3 bg-[#2C2C2E]/30 rounded border border-[#2C2C2E]">
              <p className="text-xs text-[#8E8E93]">Avg CPU</p>
              <p className="text-lg font-bold text-white">{report.data.performance?.avgCpuUsage}%</p>
            </div>
            <div className="p-3 bg-[#2C2C2E]/30 rounded border border-[#2C2C2E]">
              <p className="text-xs text-[#8E8E93]">Avg GPU</p>
              <p className="text-lg font-bold text-white">{report.data.performance?.avgGpuUsage}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Storage & Connectivity */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white text-base font-semibold">Storage & Connectivity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Storage Distribution */}
            <div>
              <h4 className="text-sm font-semibold text-[#A0A0A0] mb-4">Storage Distribution (GB)</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={diskData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, value }) => `${name}: ${value}GB`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {diskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={diskColors[index % diskColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#2C2C2E', border: '1px solid #3A3A3C' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bluetooth & Location */}
            <div>
              <h4 className="text-sm font-semibold text-[#A0A0A0] mb-4">Connectivity Details</h4>
              <div className="space-y-3">
                {report.data.connectivity?.bluetoothDevices.map((device, idx) => (
                  <div key={idx} className="p-3 bg-[#2C2C2E]/30 rounded border border-[#2C2C2E]">
                    <p className="font-medium text-white">{device.name}</p>
                    <p className="text-xs text-[#8E8E93]">
                      Connected {device.connectionCount} times | Last: {new Date(device.lastConnected).toLocaleDateString()}
                    </p>
                  </div>
                ))}
                <div className="p-3 bg-[#2C2C2E]/30 rounded border border-[#2C2C2E]">
                  <p className="font-medium text-white">GPS</p>
                  <p className="text-xs text-[#8E8E93]">
                    {report.data.gps?.totalSessions} sessions | {report.data.gps?.averageAccuracy}m accuracy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Usage */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white text-base font-semibold">App Usage</CardTitle>
          <CardDescription className="text-[#8E8E93]">
            Total app sessions: {report.data.appUsage?.totalAppSessions}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {report.data.appUsage?.mostUsedApps.map((app, idx) => (
              <div key={idx} className="p-4 bg-[#2C2C2E]/30 rounded border border-[#2C2C2E]">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-white">{app.appName}</p>
                  <p className="text-sm text-[#A0A0A0]">{app.usageTime}h usage</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-[#2C2C2E] rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#0A84FF] h-full"
                      style={{
                        width: `${Math.min((app.usageTime / (report.data.appUsage?.mostUsedApps[0].usageTime || 1)) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-[#8E8E93]">{app.sessionCount} sessions</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sensors & GPS */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white text-base font-semibold">Sensors & GPS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="p-3 bg-[#2C2C2E]/30 rounded border border-[#2C2C2E]">
                <p className="text-xs text-[#8E8E93]">Accelerometer Readings</p>
                <p className="text-lg font-bold text-white">{report.data.sensors?.accelerometerReadings}</p>
              </div>
              <div className="p-3 bg-[#2C2C2E]/30 rounded border border-[#2C2C2E]">
                <p className="text-xs text-[#8E8E93]">Gyroscope Readings</p>
                <p className="text-lg font-bold text-white">{report.data.sensors?.gyroscopeReadings}</p>
              </div>
              <div className="p-3 bg-[#2C2C2E]/30 rounded border border-[#2C2C2E]">
                <p className="text-xs text-[#8E8E93]">Compass Readings</p>
                <p className="text-lg font-bold text-white">{report.data.sensors?.compassReadings}</p>
              </div>
            </div>
            <div>
              <div className="p-3 bg-[#2C2C2E]/30 rounded border border-[#2C2C2E] mb-3">
                <p className="text-xs text-[#8E8E93]">Sensor Accuracy</p>
                <p className="text-lg font-bold text-white">{report.data.sensors?.sensorAccuracy}%</p>
              </div>
              <div className="p-3 bg-[#2C2C2E]/30 rounded border border-[#2C2C2E]">
                <p className="text-xs text-[#8E8E93]">Location Changes</p>
                <p className="text-lg font-bold text-white">{report.data.connectivity?.locationChanges}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
