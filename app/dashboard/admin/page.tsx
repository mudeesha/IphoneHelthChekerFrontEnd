'use client';

import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockUsers, mockSubscriptions, mockPayments } from '@/lib/mock-data';
import { Users, CreditCard, TrendingUp, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UserEditState {
  id: string;
  name: string;
  role: 'user' | 'admin' | 'premium';
}

export default function AdminPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [viewUserDialog, setViewUserDialog] = useState<string | null>(null);
  const [editUserDialog, setEditUserDialog] = useState<UserEditState | null>(null);
  const [deleteUserDialog, setDeleteUserDialog] = useState<string | null>(null);
  const [editingUsers, setEditingUsers] = useState<Record<string, UserEditState>>({});

  if (user?.role !== 'admin') {
    return (
      <div className="space-y-4">
        <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <AlertCircle size={20} />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#A0A0A0]">
              You do not have permission to access the admin dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const users = Object.values(mockUsers);
  const premiumUsers = users.filter(u => u.role === 'premium').length;
  const totalRevenue = mockPayments.reduce((sum, p) => sum + p.amount, 0);

  const viewingUser = viewUserDialog ? users.find(u => u.id === viewUserDialog) : null;
  const deletingUser = deleteUserDialog ? users.find(u => u.id === deleteUserDialog) : null;

  const handleEditUser = (userId: string) => {
    const u = users.find(usr => usr.id === userId);
    if (u) {
      setEditUserDialog({
        id: u.id,
        name: u.name,
        role: u.role as 'user' | 'admin' | 'premium',
      });
    }
  };

  const handleSaveEdit = () => {
    if (editUserDialog) {
      toast({
        title: 'Success',
        description: `User ${editUserDialog.name} updated successfully`,
      });
      setEditUserDialog(null);
    }
  };

  const handleDeleteUser = () => {
    if (deleteUserDialog) {
      toast({
        title: 'User Deleted',
        description: 'The user has been removed from the system',
      });
      setDeleteUserDialog(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-[#A0A0A0]">Manage users, subscriptions, and platform health</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#A0A0A0] text-sm font-medium flex items-center justify-between">
              <span>Total Users</span>
              <Users className="text-blue-400" size={18} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{users.length}</div>
            <p className="text-xs text-[#8E8E93] mt-1">Registered accounts</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#A0A0A0] text-sm font-medium flex items-center justify-between">
              <span>Premium Users</span>
              <TrendingUp className="text-purple-400" size={18} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{premiumUsers}</div>
            <p className="text-xs text-[#8E8E93] mt-1">Active subscriptions</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#A0A0A0] text-sm font-medium flex items-center justify-between">
              <span>Total Revenue</span>
              <CreditCard className="text-green-400" size={18} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-[#8E8E93] mt-1">All time</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#A0A0A0] text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              {((premiumUsers / users.length) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-[#8E8E93] mt-1">Free to premium</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Management */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white">Users</CardTitle>
          <CardDescription className="text-[#8E8E93]">Manage user accounts and subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2C2C2E]">
                  <th className="text-left py-3 px-4 font-semibold text-[#A0A0A0]">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#A0A0A0]">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#A0A0A0]">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#A0A0A0]">Joined</th>
                  <th className="text-right py-3 px-4 font-semibold text-[#A0A0A0]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-[#2C2C2E]/50 hover:bg-[#2C2C2E]/30">
                    <td className="py-3 px-4 font-semibold text-white">{u.name}</td>
                    <td className="py-3 px-4 text-[#A0A0A0]">{u.email}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        u.role === 'premium'
                          ? 'bg-purple-600 text-white'
                          : u.role === 'admin'
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-700 text-slate-300'
                      }>
                        {u.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-[#8E8E93]">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 px-3 text-xs border-[#3A3A3C] text-[#A0A0A0] hover:bg-[#2C2C2E]"
                          onClick={() => setViewUserDialog(u.id)}
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="h-8 px-3 text-xs bg-[#0A84FF] hover:bg-[#409CFF]"
                          onClick={() => handleEditUser(u.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="h-8 px-3 text-xs bg-red-600 hover:bg-red-700"
                          onClick={() => setDeleteUserDialog(u.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Subscriptions */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white">Subscriptions</CardTitle>
          <CardDescription className="text-[#8E8E93]">Active and inactive subscription plans</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2C2C2E]">
                  <th className="text-left py-3 px-4 font-semibold text-[#A0A0A0]">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#A0A0A0]">Plan</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#A0A0A0]">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#A0A0A0]">Start Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#A0A0A0]">End Date</th>
                </tr>
              </thead>
              <tbody>
                {mockSubscriptions.map((sub) => {
                  const subUser = users.find(u => u.id === sub.userId);
                  return (
                    <tr key={sub.id} className="border-b border-[#2C2C2E]/50 hover:bg-[#2C2C2E]/30">
                      <td className="py-3 px-4 text-[#A0A0A0]">{subUser?.name}</td>
                      <td className="py-3 px-4">
                        <Badge className={
                          sub.tier === 'premium'
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-700 text-slate-300'
                        }>
                          {sub.tier}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={
                          sub.status === 'active'
                            ? 'bg-green-600 text-white'
                            : sub.status === 'cancelled'
                            ? 'bg-red-600 text-white'
                            : 'bg-yellow-600 text-white'
                        }>
                          {sub.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-[#8E8E93]">
                        {new Date(sub.startDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-[#8E8E93]">
                        {new Date(sub.endDate).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payments */}
      <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
        <CardHeader>
          <CardTitle className="text-white">Recent Payments</CardTitle>
          <CardDescription className="text-[#8E8E93]">Transaction history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2C2C2E]">
                  <th className="text-left py-3 px-4 font-semibold text-[#A0A0A0]">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#A0A0A0]">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#A0A0A0]">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#A0A0A0]">Date</th>
                </tr>
              </thead>
              <tbody>
                {mockPayments.map((payment) => {
                  const paymentUser = users.find(u => u.id === payment.userId);
                  return (
                    <tr key={payment.id} className="border-b border-[#2C2C2E]/50 hover:bg-[#2C2C2E]/30">
                      <td className="py-3 px-4 text-[#A0A0A0]">{paymentUser?.name}</td>
                      <td className="py-3 px-4 font-semibold text-white">
                        ${payment.amount.toFixed(2)} {payment.currency}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={
                          payment.status === 'completed'
                            ? 'bg-green-600 text-white'
                            : payment.status === 'pending'
                            ? 'bg-yellow-600 text-white'
                            : 'bg-red-600 text-white'
                        }>
                          {payment.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-[#8E8E93]">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* View User Dialog */}
      <Dialog open={!!viewUserDialog} onOpenChange={(open) => !open && setViewUserDialog(null)}>
        <DialogContent className="bg-[#1C1C1E] border-[#2C2C2E] text-white">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>View user information</DialogDescription>
          </DialogHeader>
          {viewingUser && (
            <div className="space-y-4">
              <div>
                <Label className="text-[#A0A0A0]">Name</Label>
                <p className="mt-1 text-white font-medium">{viewingUser.name}</p>
              </div>
              <div>
                <Label className="text-[#A0A0A0]">Email</Label>
                <p className="mt-1 text-white font-medium">{viewingUser.email}</p>
              </div>
              <div>
                <Label className="text-[#A0A0A0]">Role</Label>
                <p className="mt-1">
                  <Badge className={
                    viewingUser.role === 'premium'
                      ? 'bg-purple-600 text-white'
                      : viewingUser.role === 'admin'
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-700 text-slate-300'
                  }>
                    {viewingUser.role}
                  </Badge>
                </p>
              </div>
              <div>
                <Label className="text-[#A0A0A0]">Joined</Label>
                <p className="mt-1 text-white font-medium">{new Date(viewingUser.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <Label className="text-[#A0A0A0]">Subscription Status</Label>
                <p className="mt-1 text-white font-medium">{viewingUser.role === 'premium' ? 'Active' : 'Free Tier'}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              className="border-[#3A3A3C] text-[#A0A0A0] hover:bg-[#2C2C2E]"
              onClick={() => setViewUserDialog(null)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={!!editUserDialog} onOpenChange={(open) => !open && setEditUserDialog(null)}>
        <DialogContent className="bg-[#1C1C1E] border-[#2C2C2E] text-white">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information</DialogDescription>
          </DialogHeader>
          {editUserDialog && (
            <div className="space-y-4">
              <div>
                <Label className="text-[#A0A0A0]">Name</Label>
                <Input
                  value={editUserDialog.name}
                  onChange={(e) => setEditUserDialog({ ...editUserDialog, name: e.target.value })}
                  className="mt-1 bg-[#2C2C2E] border-[#3A3A3C] text-white"
                />
              </div>
              <div>
                <Label className="text-[#A0A0A0]">Role</Label>
                <Select
                  value={editUserDialog.role}
                  onValueChange={(value) => setEditUserDialog({ ...editUserDialog, role: value as 'user' | 'admin' | 'premium' })}
                >
                  <SelectTrigger className="mt-1 bg-[#2C2C2E] border-[#3A3A3C] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2C2C2E] border-[#3A3A3C]">
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              className="border-[#3A3A3C] text-[#A0A0A0] hover:bg-[#2C2C2E]"
              onClick={() => setEditUserDialog(null)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#0A84FF] hover:bg-[#409CFF]"
              onClick={handleSaveEdit}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={!!deleteUserDialog} onOpenChange={(open) => !open && setDeleteUserDialog(null)}>
        <DialogContent className="bg-[#1C1C1E] border-[#2C2C2E] text-white">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>This action cannot be undone</DialogDescription>
          </DialogHeader>
          {deletingUser && (
            <div>
              <p className="text-[#A0A0A0]">
                Are you sure you want to delete <span className="font-semibold text-white">{deletingUser.name}</span>? This will permanently remove all their data and reports.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              className="border-[#3A3A3C] text-[#A0A0A0] hover:bg-[#2C2C2E]"
              onClick={() => setDeleteUserDialog(null)}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteUser}
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
