'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth-context';
import { mockUsers } from '@/lib/mock-data';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock authentication with demo users
      let authenticatedUser = null;
      if (email === 'free@example.com' && password === 'password') {
        authenticatedUser = mockUsers['free-user'];
      } else if (email === 'premium@example.com' && password === 'password') {
        authenticatedUser = mockUsers['premium-user'];
      } else if (email === 'admin@example.com' && password === 'password') {
        authenticatedUser = mockUsers['admin-user'];
      } else {
        toast({
          title: 'Login Failed',
          description: 'Invalid email or password. Try free@example.com or premium@example.com with password "password"',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Store user and token
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      localStorage.setItem('token', 'mock-jwt-token');

      toast({
        title: 'Success',
        description: 'You have been logged in successfully.',
      });

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred during login. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-white mb-2">iPhone Analytics</h1>
          <p className="text-[#A0A0A0]">Professional Device Analytics Viewer</p>
        </div>

        {/* Login Card */}
        <Card className="border-[#2C2C2E] bg-[#1C1C1E]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-white text-base font-semibold">Sign In</CardTitle>
            <CardDescription className="text-[#8E8E93]">Enter your credentials to access your analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#A0A0A0]">Email</label>
                <Input
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-[#2C2C2E] border-[#3A3A3C] text-white placeholder:text-[#8E8E93]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#A0A0A0]">Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-[#2C2C2E] border-[#3A3A3C] text-white placeholder:text-[#8E8E93]"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#0A84FF] hover:bg-[#409CFF] text-white rounded-lg font-semibold transition-colors duration-150"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo credentials info */}
            <div className="mt-6 p-3 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
              <p className="text-xs font-semibold text-[#A0A0A0] mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-xs text-[#8E8E93]">
                <p><span className="font-mono text-[#A0A0A0]">free@example.com</span> / password</p>
                <p><span className="font-mono text-[#A0A0A0]">premium@example.com</span> / password</p>
                <p><span className="font-mono text-[#A0A0A0]">admin@example.com</span> / password</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sign Up Link */}
        <div className="mt-4 text-center text-sm text-[#A0A0A0]">
          Don't have an account?{' '}
          <Link href="/register" className="text-[#0A84FF] hover:text-[#409CFF] font-medium transition-colors duration-150">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
