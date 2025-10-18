'use client';

import { ProtectedRoute } from '@/components/protected-route';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';
import { Check, Crown } from 'lucide-react';

const features = [
  'Unlimited transactions',
  'Advanced analytics and reports',
  'Export data to CSV/Excel',
  'Multi-account linking',
  'Investment portfolio tracking',
  'Customizable budgets and goals',
  'Priority customer support',
  'Mobile app access',
  'Real-time sync across devices',
  'Advanced security features',
];

export default function PremiumPage() {
  const { profile } = useAuth();

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
              <Crown className="h-8 w-8 text-yellow-600" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">Upgrade to Premium</h1>
            <p className="text-xl text-slate-600 mt-2">
              Unlock powerful features to take your financial management to the next level
            </p>
          </div>

          {profile?.premium ? (
            <Card className="border-2 border-yellow-500">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Crown className="h-5 w-5 text-yellow-600" />
                  <span>You&apos;re a Premium Member!</span>
                </CardTitle>
                <CardDescription>
                  Thank you for being a premium member. Enjoy all the exclusive features.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-sm text-slate-900">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6" variant="outline">
                  Manage Subscription
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Free</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">$0</span>
                      <span className="text-slate-600">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Up to 100 transactions/month</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Basic analytics</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm">1 account</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Basic support</span>
                      </li>
                    </ul>
                    <Button className="w-full mt-6" variant="outline" disabled>
                      Current Plan
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-yellow-500 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Crown className="h-5 w-5 text-yellow-600" />
                      <span>Premium</span>
                    </CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">$9.99</span>
                      <span className="text-slate-600">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {features.slice(0, 6).map((feature) => (
                        <li key={feature} className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                      <li className="text-sm text-slate-600">+ 4 more features</li>
                    </ul>
                    <Button className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600">
                      Upgrade Now
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>All Premium Features</CardTitle>
                  <CardDescription>
                    Everything you need for comprehensive financial management
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-sm text-slate-900">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="text-center text-sm text-slate-600">
                <p>Cancel anytime. No hidden fees.</p>
                <p className="mt-1">
                  Questions? Contact us at{' '}
                  <a href="mailto:support@financetracker.com" className="text-emerald-600">
                    support@financetracker.com
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
