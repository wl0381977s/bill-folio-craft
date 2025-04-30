
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const monthlyData = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 3000 },
  { name: 'Mar', amount: 5000 },
  { name: 'Apr', amount: 2780 },
  { name: 'May', amount: 1890 },
  { name: 'Jun', amount: 2390 },
  { name: 'Jul', amount: 3490 },
];

const weeklyData = [
  { name: 'Mon', amount: 1200 },
  { name: 'Tue', amount: 940 },
  { name: 'Wed', amount: 1290 },
  { name: 'Thu', amount: 980 },
  { name: 'Fri', amount: 1700 },
  { name: 'Sat', amount: 500 },
  { name: 'Sun', amount: 200 },
];

const ChartSection = () => {
  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Revenue Overview</CardTitle>
        <Tabs defaultValue="monthly" className="w-[200px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly"></TabsContent>
          <TabsContent value="weekly"></TabsContent>
        </Tabs>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart 
            data={monthlyData} 
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              fontSize={12}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Revenue']}
              contentStyle={{ 
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)' 
              }}
            />
            <Bar 
              dataKey="amount" 
              fill="#1E40AF" 
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ChartSection;
