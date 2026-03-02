'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types';

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Validation Error',
        description: 'Passwords do not match.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: 'Validation Error',
        description: 'Password must be at least 8 characters long.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Mock registration
      await new Promise(resolve => setTimeout(resolve, 500));

      const newUser: User = {
        id: `user-${Date.now()}`,
        email: formData.email,
        name: formData.name,
        role: 'free',
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', 'mock-jwt-token');

      toast({
        title: 'Success',
        description: 'Account created successfully. Redirecting to dashboard...',
      });

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred during registration. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-white mb-2">iPhone Analytics</h1>
          <p className="text-[#A0A0A0]">Create Your Account</p>
        </div>

        {/* Register Card */}
        <Card className="border-[#2C2C2E] bg-[#1C1C1E]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-white text-base font-semibold">Create Account</CardTitle>
            <CardDescription className="text-[#8E8E93]">Sign up to get started with analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#A0A0A0]">Full Name</label>
                <Input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-[#2C2C2E] border-[#3A3A3C] text-white placeholder:text-[#8E8E93]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#A0A0A0]">Email</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-[#2C2C2E] border-[#3A3A3C] text-white placeholder:text-[#8E8E93]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#A0A0A0]">Password</label>
                <Input
                  type="password"
                  name="password"
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-[#2C2C2E] border-[#3A3A3C] text-white placeholder:text-[#8E8E93]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#A0A0A0]">Confirm Password</label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="bg-[#2C2C2E] border-[#3A3A3C] text-white placeholder:text-[#8E8E93]"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#0A84FF] hover:bg-[#409CFF] text-white font-semibold"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Sign In Link */}
        <div className="mt-4 text-center text-sm text-[#8E8E93]">
          Already have an account?{' '}
          <Link href="/login" className="text-[#0A84FF] hover:text-[#409CFF] font-medium">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
