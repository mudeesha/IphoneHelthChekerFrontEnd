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
        className={`relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group ${
          isDragging
            ? 'bg-gradient-to-br from-[#0A84FF]/30 to-[#0A84FF]/10 border border-[#0A84FF]/50 shadow-2xl'
            : 'bg-gradient-to-br from-[#2C2C2E]/30 to-[#1C1C1E]/50 border border-[#2C2C2E] hover:border-[#0A84FF]/40 hover:shadow-2xl'
        }`}
        style={{
          boxShadow: isDragging 
            ? '0 0 30px rgba(10, 132, 255, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)' 
            : 'inset 0 1px 0 rgba(255,255,255,0.05)',
          transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#000000]/20 pointer-events-none" />
        
        <div className="px-12 md:px-16 py-20 md:py-24 text-center relative z-10">
          {!uploadedFile ? (
            <>
              <div className="mb-8 flex justify-center">
                <div className={`p-5 rounded-2xl transition-all duration-300 ${
                  isDragging 
                    ? 'bg-[#0A84FF]/30 border border-[#0A84FF]/50 scale-110' 
                    : 'bg-gradient-to-br from-[#2C2C2E] to-[#1C1C1E] border border-[#3A3A3C] group-hover:border-[#0A84FF]/40 group-hover:scale-105'
                }`}>
                  <Upload className={`w-12 h-12 transition-all duration-300 ${
                    isDragging 
                      ? 'text-[#0A84FF]' 
                      : 'text-[#A0A0A0] group-hover:text-[#0A84FF]'
                  }`} strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-3xl font-semibold text-white mb-3 transition-colors duration-300 group-hover:text-[#0A84FF]" style={{ lineHeight: 1.2 }}>
                Upload your analytics
              </h3>
              <p className="text-[#8E8E93] mb-8 text-lg group-hover:text-[#A0A0A0] transition-colors duration-300" style={{ lineHeight: 1.5 }}>
                .ips, .json, or .txt files
              </p>
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-gradient-to-r from-[#0A84FF] to-[#0A84FF]/80 hover:from-[#409CFF] hover:to-[#409CFF]/80 text-white px-8 py-3 rounded-xl font-semibold inline-flex items-center justify-center text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#0A84FF]/30 hover:scale-105 active:scale-95"
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
                <div className="p-5 bg-gradient-to-br from-[#2C2C2E] to-[#1C1C1E] border border-[#3A3A3C] rounded-2xl">
                  <File className="w-12 h-12 text-[#0A84FF]" strokeWidth={1.5} />
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
                  className="border border-[#3A3A3C] text-[#A0A0A0] hover:text-[#0A84FF] hover:border-[#0A84FF]/40 hover:bg-[rgba(10,132,255,0.05)] px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 active:scale-95"
                  onClick={() => setUploadedFile(null)}
                >
                  Change
                </Button>
                <Button
                  className="bg-gradient-to-r from-[#0A84FF] to-[#0A84FF]/80 hover:from-[#409CFF] hover:to-[#409CFF]/80 text-white px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#0A84FF]/30 hover:scale-105 active:scale-95"
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
