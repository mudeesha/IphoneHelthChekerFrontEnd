'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockHistory } from '@/lib/mock-data';
import { Upload, Eye, Download, Share2 } from 'lucide-react';

export default function HistoryPage() {
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'upload':
        return <Upload size={16} />;
      case 'view':
        return <Eye size={16} />;
      case 'export':
        return <Download size={16} />;
      case 'share':
        return <Share2 size={16} />;
      default:
        return null;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'upload':
        return 'bg-[#0A84FF]/10 border-[#0A84FF]/30 text-[#0A84FF]';
      case 'view':
        return 'bg-[#30D158]/10 border-[#30D158]/30 text-[#30D158]';
      case 'export':
        return 'bg-[#FFD60A]/10 border-[#FFD60A]/30 text-[#FFD60A]';
      case 'share':
        return 'bg-[#FF453A]/10 border-[#FF453A]/30 text-[#FF453A]';
      default:
        return 'bg-[#A0A0A0]/10 border-[#A0A0A0]/30 text-[#A0A0A0]';
    }
  };

  const groupedHistory = mockHistory.reduce((acc, item) => {
    const date = new Date(item.timestamp).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {} as Record<string, typeof mockHistory>);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-semibold text-white mb-2 tracking-tight" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>Activity History</h1>
        <p className="text-[#A0A0A0] text-base">Track all your analytics activities and interactions</p>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {Object.entries(groupedHistory)
          .reverse()
          .map(([date, items]) => (
            <div key={date}>
              <h3 className="text-sm font-semibold text-[#A0A0A0] mb-3 flex items-center gap-2">
                <span className="flex-1">{date}</span>
                <span className="text-xs text-[#8E8E93]">{items.length} activities</span>
              </h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <Card key={item.id} className="bg-[#1C1C1E] border-[#2C2C2E] hover:border-[#3A3A3C] transition-colors duration-150">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg border ${getActionColor(item.action)}`}>
                          {getActionIcon(item.action)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="text-white font-semibold capitalize text-sm">{item.action}</h4>
                            <span className="text-xs text-[#8E8E93] whitespace-nowrap">
                              {new Date(item.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm text-[#A0A0A0]">{item.details}</p>
                          <p className="text-xs text-[#8E8E93] mt-1">Report: {item.reportId}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Empty State */}
      {Object.keys(groupedHistory).length === 0 && (
        <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="text-[#A0A0A0] text-sm">No activities recorded yet.</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
