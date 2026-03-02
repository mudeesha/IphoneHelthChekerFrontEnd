'use client';

import { useState, useRef } from 'react';
import { Upload, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export function UploadArea() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useAuth();

  const isValidFileType = (file: File): boolean => {
    const validExtensions = ['.ips', '.json', '.txt'];
    const fileName = file.name.toLowerCase();
    return (
      validExtensions.some((ext) => fileName.endsWith(ext)) ||
      fileName.endsWith('.ips.ca.synced') ||
      fileName.endsWith('.ips.synced')
    );
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (isValidFileType(file)) {
        setUploadedFile(file);
        toast({
          title: 'File selected',
          description: `${file.name} is ready to upload.`,
        });
      } else {
        toast({
          title: 'Invalid file type',
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
        toast({
          title: 'File selected',
          description: `${file.name} is ready to upload.`,
        });
      } else {
        toast({
          title: 'Invalid file type',
          description: 'Please upload a .ips, .ips.synced, .ips.ca.synced, or .json file.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!uploadedFile) return;

    if (!user) {
      localStorage.setItem('pendingFile', uploadedFile.name);
      toast({
        title: 'Please sign in',
        description: 'Create an account or log in to view your report.',
      });
      router.push('/register');
      return;
    }

    toast({
      title: 'Upload successful',
      description: 'Your report is being processed...',
    });
    
    // Store the file data for the report page
    localStorage.setItem('pendingReport', JSON.stringify({
      fileName: uploadedFile.name,
      uploadedAt: new Date().toISOString(),
    }));
    
    router.push('/home/report');
  };

  return (
    <section>
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-5xl md:text-6xl font-semibold text-white mb-4 tracking-tight" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          Upload Your Report
        </h2>
        <p className="text-base text-[#A0A0A0]" style={{ lineHeight: 1.5 }}>
          Drag and drop or click to select your analytics file
        </p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative rounded-lg overflow-hidden transition-all duration-150 cursor-pointer ${
          isDragging
            ? 'bg-[#2C2C2E] border border-[#3A3A3C]'
            : 'bg-[#1C1C1E] border border-[#2C2C2E] hover:border-[#3A3A3C]'
        }`}
        style={{
          boxShadow: isDragging ? '0 4px 20px rgba(0,0,0,0.4)' : '0 1px 3px rgba(0,0,0,0.2)',
        }}
      >
        <div className="px-12 md:px-16 py-20 md:py-24 text-center">
          {!uploadedFile ? (
            <>
              <div className="mb-8 flex justify-center">
                <div className="p-4 bg-[#2C2C2E] rounded-lg">
                  <Upload className="w-12 h-12 text-[#A0A0A0]" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-3xl font-semibold text-white mb-3" style={{ lineHeight: 1.2 }}>
                Upload your analytics
              </h3>
              <p className="text-[#8E8E93] mb-8 text-lg" style={{ lineHeight: 1.5 }}>
                .ips, .json, or .txt files
              </p>
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#0A84FF] hover:bg-[#409CFF] text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center justify-center text-lg transition-colors duration-150"
              >
                Choose File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".ips,.ips.synced,.ips.ca.synced,.json,.txt"
                onChange={handleFileSelect}
                className="hidden"
              />
            </>
          ) : (
            <>
              <div className="mb-8 flex justify-center">
                <div className="p-4 bg-[#2C2C2E] rounded-lg">
                  <File className="w-12 h-12 text-[#A0A0A0]" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                {uploadedFile.name}
              </h3>
              <p className="text-[#8E8E93] text-base mb-8" style={{ lineHeight: 1.5 }}>
                {(uploadedFile.size / 1024).toFixed(2)} KB
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  className="border border-[#3A3A3C] text-[#0A84FF] hover:bg-[rgba(255,255,255,0.05)] px-6 py-3 rounded-lg font-semibold text-lg transition-colors duration-150"
                  onClick={() => setUploadedFile(null)}
                >
                  Change
                </Button>
                <Button
                  className="bg-[#0A84FF] hover:bg-[#409CFF] text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors duration-150"
                  onClick={handleUpload}
                >
                  {user ? 'Analyze' : 'Sign In & Analyze'}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
