
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck, FilePlus, FileText, UserPlus } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'invoice_created',
    title: 'Invoice #INV-2023-004 created',
    time: '2 hours ago',
    icon: FilePlus,
  },
  {
    id: 2,
    type: 'payment_received',
    title: 'Payment received for #INV-2023-001',
    time: '5 hours ago',
    icon: FileCheck,
  },
  {
    id: 3,
    type: 'client_added',
    title: 'New client "Acme Corp" added',
    time: '1 day ago',
    icon: UserPlus,
  },
  {
    id: 4,
    type: 'invoice_sent',
    title: 'Invoice #INV-2023-003 sent to client',
    time: '1 day ago',
    icon: FileText,
  },
];

const getIconColor = (type: string) => {
  switch(type) {
    case 'invoice_created': return 'bg-blue-100 text-blue-600';
    case 'payment_received': return 'bg-green-100 text-green-600';
    case 'client_added': return 'bg-purple-100 text-purple-600';
    case 'invoice_sent': return 'bg-amber-100 text-amber-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const RecentActivity = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-start">
              <div className={`p-2 rounded-full mr-3 ${getIconColor(activity.type)}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
