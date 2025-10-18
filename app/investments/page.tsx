'use client';

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/protected-route';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase, Holding } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Plus, TrendingUp, Edit, Trash2 } from 'lucide-react';

export default function InvestmentsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    symbol: '',
    name: '',
    type: 'stock' as 'stock' | 'crypto' | 'etf',
    quantity: '',
    average_price: '',
  });

  useEffect(() => {
    if (user) {
      loadHoldings();
    }
  }, [user]);

  const loadHoldings = async () => {
    try {
      const { data, error } = await supabase
        .from('holdings')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHoldings(data || []);
    } catch (error) {
      console.error('Error loading holdings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.symbol || !formData.name || !formData.quantity || !formData.average_price) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      const holdingData = {
        user_id: user!.id,
        symbol: formData.symbol.toUpperCase(),
        name: formData.name,
        type: formData.type,
        quantity: parseFloat(formData.quantity),
        average_price: parseFloat(formData.average_price),
        currency: 'USD',
      };

      if (editingId) {
        const { error } = await supabase
          .from('holdings')
          .update(holdingData)
          .eq('id', editingId);

        if (error) throw error;
        toast({ title: 'Holding updated successfully' });
      } else {
        const { error } = await supabase.from('holdings').insert([holdingData]);

        if (error) throw error;
        toast({ title: 'Holding added successfully' });
      }

      setDialogOpen(false);
      resetForm();
      loadHoldings();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (holding: Holding) => {
    setEditingId(holding.id);
    setFormData({
      symbol: holding.symbol,
      name: holding.name,
      type: holding.type,
      quantity: holding.quantity.toString(),
      average_price: holding.average_price.toString(),
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this holding?')) return;

    try {
      const { error } = await supabase.from('holdings').delete().eq('id', id);

      if (error) throw error;
      toast({ title: 'Holding deleted successfully' });
      loadHoldings();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      symbol: '',
      name: '',
      type: 'stock',
      quantity: '',
      average_price: '',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const totalValue = holdings.reduce(
    (sum, holding) => sum + Number(holding.quantity) * Number(holding.average_price),
    0
  );

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Investments</h1>
              <p className="text-slate-600 mt-1">Track your investment portfolio</p>
            </div>
            <Dialog
              open={dialogOpen}
              onOpenChange={(open) => {
                setDialogOpen(open);
                if (!open) resetForm();
              }}
            >
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Holding
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingId ? 'Edit Holding' : 'Add New Holding'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingId ? 'Update holding details' : 'Enter holding details'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Symbol</Label>
                    <Input
                      placeholder="e.g., AAPL, BTC"
                      value={formData.symbol}
                      onChange={(e) =>
                        setFormData({ ...formData, symbol: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      placeholder="e.g., Apple Inc., Bitcoin"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: any) =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stock">Stock</SelectItem>
                        <SelectItem value="crypto">Cryptocurrency</SelectItem>
                        <SelectItem value="etf">ETF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Average Price</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.average_price}
                      onChange={(e) =>
                        setFormData({ ...formData, average_price: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    >
                      {editingId ? 'Update' : 'Add'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio Value</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-emerald-600">
                {formatCurrency(totalValue)}
              </p>
              <p className="text-sm text-slate-600 mt-1">
                {holdings.length} {holdings.length === 1 ? 'holding' : 'holdings'}
              </p>
            </CardContent>
          </Card>

          {loading ? (
            <div className="text-center py-8 text-slate-600">Loading...</div>
          ) : holdings.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-slate-600">
                No holdings yet. Add your first investment to get started!
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {holdings.map((holding) => {
                const currentValue =
                  Number(holding.quantity) * Number(holding.average_price);
                return (
                  <Card key={holding.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{holding.symbol}</CardTitle>
                          <p className="text-xs text-slate-600">{holding.name}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-slate-600">Current Value</p>
                          <p className="text-2xl font-bold text-slate-900">
                            {formatCurrency(currentValue)}
                          </p>
                        </div>
                        <div className="flex justify-between text-sm">
                          <div>
                            <p className="text-slate-600">Quantity</p>
                            <p className="font-medium">{holding.quantity}</p>
                          </div>
                          <div>
                            <p className="text-slate-600">Avg Price</p>
                            <p className="font-medium">
                              {formatCurrency(Number(holding.average_price))}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(holding)}
                            className="flex-1"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(holding.id)}
                            className="flex-1 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
