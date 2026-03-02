import { useState, useCallback } from 'react';
import { Report } from '@/types';
import { reportApi } from '@/lib/api';
import { mockReports } from '@/lib/mock-data';

export function useReport() {
  const [reports, setReports] = useState<Report[]>(Object.values(mockReports));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getReports = useCallback(async () => {
    setIsLoading(true);
    try {
      // Using mock data for now
      setReports(Object.values(mockReports));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch reports'));
      setReports([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadReport = useCallback(async (file: File) => {
    setIsLoading(true);
    try {
      // Using mock response for now
      const newReport: Report = {
        id: `report-${Date.now()}`,
        userId: 'user-1',
        fileName: file.name,
        uploadedAt: new Date().toISOString(),
        stabilityScore: Math.floor(Math.random() * 20) + 75,
        reportType: 'free',
        data: mockReports['report-1']?.data || { summary: { totalSessions: 0, crashCount: 0, averageSessionLength: 0, lastCrashDate: null }, stability: { score: 0, trend: [], status: 'poor' as const } },
      };
      setReports(prev => [newReport, ...prev]);
      setError(null);
      return newReport;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to upload report'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteReport = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      setReports(prev => prev.filter(r => r.id !== id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete report'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    reports,
    isLoading,
    error,
    getReports,
    uploadReport,
    deleteReport,
  };
}
