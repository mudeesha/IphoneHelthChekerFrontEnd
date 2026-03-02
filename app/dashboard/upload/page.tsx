'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useReport } from '@/hooks/use-report';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, File, CheckCircle } from 'lucide-react';

export default function UploadPage() {
  const router = useRouter();
  const { uploadReport } = useReport();
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isValidFileType = (file: File): boolean => {
    const validExtensions = ['.ips', '.json', '.txt'];
    const fileName = file.name.toLowerCase();
    
    // Check for exact extensions or compound extensions like .ips.ca.synced
    return validExtensions.some(ext => fileName.endsWith(ext)) || 
           fileName.endsWith('.ips.ca.synced') || 
           fileName.endsWith('.ips.synced');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (isValidFileType(file)) {
        setUploadedFile(file);
      } else {
        toast({
          title: 'Invalid File Type',
          description: 'Please upload a .ips, .ips.synced, .ips.ca.synced, or .json file.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (isValidFileType(file)) {
        setUploadedFile(file);
      } else {
        toast({
          title: 'Invalid File Type',
          description: 'Please upload a .ips, .ips.synced, .ips.ca.synced, or .json file.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!uploadedFile) return;

    setIsLoading(true);
    try {
      const report = await uploadReport(uploadedFile);
      toast({
        title: 'Success',
        description: 'Report uploaded successfully.',
      });

      // Redirect to report view
      setTimeout(() => {
        router.push(`/dashboard/report/${report.id}`);
      }, 1000);
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description: 'Failed to upload the report. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-semibold text-white mb-2 tracking-tight" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>Upload Report</h1>
        <p className="text-[#A0A0A0] text-base">Upload your iPhone analytics JSON file to get started</p>
      </div>

      {/* Upload Card */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white text-base font-semibold">Choose File</CardTitle>
          <CardDescription className="text-[#8E8E93]">Upload a JSON file containing your iPhone analytics data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {!uploadedFile ? (
              <>
                {/* Drag and drop area */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-150 ${
                    isDragging
                      ? 'border-[#0A84FF] bg-[#0A84FF]/10'
                      : 'border-[#3A3A3C] hover:border-[#3A3A3C] bg-[#1C1C1E]'
                  }`}
                >
                  <Upload size={32} className="mx-auto mb-4 text-[#A0A0A0]" />
                  <h3 className="text-lg font-semibold text-white mb-1">Drag and drop your file</h3>
                  <p className="text-[#A0A0A0] mb-4 text-sm">or click to browse</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".ips,.json,.txt"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="border-[#3A3A3C] text-[#A0A0A0] hover:bg-[#2C2C2E] rounded-lg font-normal transition-colors duration-150"
                  >
                    Browse Files
                  </Button>
                </div>

                {/* File requirements */}
                <div className="bg-[#1C1C1E] border border-[#2C2C2E] rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-white mb-3">File Requirements</h4>
                  <ul className="space-y-2 text-sm text-[#A0A0A0]">
                    <li className="flex items-center gap-2">
                      <span className="text-[#0A84FF] font-bold">✓</span> .ips, .ips.synced, .ips.ca.synced, .json, or .txt format
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0A84FF] font-bold">✓</span> Valid iPhone analytics data
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0A84FF] font-bold">✓</span> Max file size: 50 MB
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                {/* Selected file */}
                <div className="bg-[#2C2C2E]/50 border border-[#3A3A3C] rounded-lg p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#0A84FF]/20 p-3 rounded-lg">
                      <File size={24} className="text-[#0A84FF]" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{uploadedFile.name}</p>
                      <p className="text-sm text-[#8E8E93]">
                        {(uploadedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <CheckCircle size={24} className="text-[#30D158]" />
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => setUploadedFile(null)}
                    variant="outline"
                    className="flex-1 border-[#3A3A3C] text-[#A0A0A0] hover:bg-[#2C2C2E] rounded-lg font-normal transition-colors duration-150"
                  >
                    Choose Another
                  </Button>
                  <Button
                    onClick={handleUpload}
                    disabled={isLoading}
                    className="flex-1 bg-[#0A84FF] hover:bg-[#409CFF] text-white rounded-lg font-semibold transition-colors duration-150"
                  >
                    {isLoading ? 'Uploading...' : 'Upload & Analyze'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white text-sm font-semibold">Sample Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[#A0A0A0] mb-4">
            Your uploaded reports will be analyzed to show:
          </p>
          <ul className="space-y-2 text-sm text-[#A0A0A0]">
            <li>• Device stability score and trends</li>
            <li>• Crash analysis and frequency</li>
            <li>• Performance metrics (CPU, GPU, Memory)</li>
            <li>• Battery health and usage patterns</li>
            <li>• Network connectivity insights</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
