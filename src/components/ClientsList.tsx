
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const clients = [
  {
    id: 1,
    name: 'Acme Corporation',
    email: 'billing@acme.com',
    outstandingAmount: '$1,250.00',
    status: 'active',
    initials: 'AC',
  },
  {
    id: 2,
    name: 'Globex Industries',
    email: 'accounts@globex.com',
    outstandingAmount: '$3,800.50',
    status: 'active',
    initials: 'GI',
  },
  {
    id: 3,
    name: 'Wayne Enterprises',
    email: 'finance@wayne.com',
    outstandingAmount: '$0.00',
    status: 'inactive',
    initials: 'WE',
  },
];

const ClientsList = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-white flex justify-between items-center">
        <CardTitle className="text-lg font-medium">Clients</CardTitle>
        <Button size="sm" className="bg-theme-blue hover:bg-blue-700">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Client</th>
                <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Email</th>
                <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Outstanding</th>
                <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback className="bg-theme-teal text-white text-xs">
                          {client.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{client.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{client.email}</td>
                  <td className="py-3 px-4 text-sm font-medium">{client.outstandingAmount}</td>
                  <td className="py-3 px-4">
                    <Badge 
                      variant="outline"
                      className={client.status === 'active' 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-800' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-800'
                      }
                    >
                      {client.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientsList;
