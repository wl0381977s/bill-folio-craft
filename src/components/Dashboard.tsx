
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatCard from './StatCard';
import BillSummary from './BillSummary';
import RecentActivity from './RecentActivity';
import ChartSection from './ChartSection';
import ClientsList from './ClientsList';
import InvoiceForm from './InvoiceForm';
import { CreditCard, DollarSign, FileText, Package2 } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="Total Revenue" 
            value="$24,780.50" 
            description="Current Month"
            trend={{ value: "+12.5% from last month", positive: true }}
            icon={<DollarSign className="h-5 w-5" />}
          />
          <StatCard 
            title="Pending Invoices" 
            value="8" 
            description="Worth $12,450.80"
            trend={{ value: "-2 from last month", positive: true }}
            icon={<FileText className="h-5 w-5" />}
          />
          <StatCard 
            title="Active Clients" 
            value="14" 
            description="3 added this month"
            trend={{ value: "+3 from last month", positive: true }}
            icon={<Package2 className="h-5 w-5" />}
          />
          <StatCard 
            title="Avg. Payment Time" 
            value="3.5 days" 
            description="Target: 7 days"
            trend={{ value: "-0.8 days from last month", positive: true }}
            icon={<CreditCard className="h-5 w-5" />}
          />
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="invoices">Create Invoice</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <ChartSection />
              
              <div className="lg:col-span-1 space-y-6">
                <h3 className="text-lg font-medium">Recent Invoices</h3>
                <div className="space-y-4">
                  <BillSummary 
                    billNumber="INV-2023-004" 
                    clientName="Acme Corporation" 
                    amount="$1,250.00" 
                    date="Apr 28, 2025" 
                    status="pending"
                  />
                  <BillSummary 
                    billNumber="INV-2023-003" 
                    clientName="Wayne Enterprises" 
                    amount="$3,800.50" 
                    date="Apr 22, 2025" 
                    status="paid"
                  />
                  <BillSummary 
                    billNumber="INV-2023-002" 
                    clientName="Globex Industries" 
                    amount="$750.00" 
                    date="Apr 15, 2025" 
                    status="overdue"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <RecentActivity />
            </div>
          </TabsContent>
          
          <TabsContent value="invoices">
            <div className="mt-6">
              <InvoiceForm />
            </div>
          </TabsContent>
          
          <TabsContent value="clients">
            <div className="mt-6">
              <ClientsList />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
