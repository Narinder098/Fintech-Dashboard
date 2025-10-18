import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, PieChart, Shield, Zap, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-emerald-500 rounded-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">FinanceTracker</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
            Take Control of Your
            <span className="block text-emerald-600">Financial Future</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Track expenses, manage investments, and visualize your financial data with powerful analytics.
            Everything you need in one place.
          </p>
          <div className="flex items-center justify-center space-x-4 pt-4">
            <Link href="/register">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-20">
          <Card className="border-2 hover:border-emerald-200 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
              <CardTitle>Smart Tracking</CardTitle>
              <CardDescription>
                Automatically categorize and track all your income and expenses across multiple accounts
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-emerald-200 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Visual Analytics</CardTitle>
              <CardDescription>
                Beautiful charts and reports help you understand your spending patterns and make better decisions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-emerald-200 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Bank-Level Security</CardTitle>
              <CardDescription>
                Your data is encrypted and protected with enterprise-grade security measures
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-32 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-slate-900">
              Everything You Need to Manage Your Money
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Zap className="h-6 w-6 text-emerald-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900">Real-Time Insights</h3>
                  <p className="text-slate-600">Get instant updates on your financial health with live dashboards</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="h-6 w-6 text-emerald-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900">Investment Tracking</h3>
                  <p className="text-slate-600">Monitor your stock and crypto portfolios with live price updates</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <PieChart className="h-6 w-6 text-emerald-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900">Advanced Reports</h3>
                  <p className="text-slate-600">Generate detailed financial reports with customizable date ranges</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 h-96 flex items-center justify-center">
            <div className="text-center text-slate-400">
              Dashboard Preview
            </div>
          </div>
        </div>

        <div className="mt-32 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-slate-600 mb-8">
            Join thousands of users who are already taking control of their finances
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-12">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 mt-32">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-emerald-500 rounded-lg">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-slate-900">FinanceTracker</span>
              </div>
              <p className="text-slate-600 text-sm">
                Your complete personal finance management solution
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 mt-8 pt-8 text-center text-sm text-slate-600">
            © 2025 FinanceTracker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
