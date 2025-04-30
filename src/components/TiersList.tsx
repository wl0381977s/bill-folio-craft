
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Users } from 'lucide-react';
import { Tier, TierType } from '@/types';

// Données fictives pour les tiers
const tiers: Tier[] = [
  {
    id: '1',
    code: 'CL001',
    name: 'Acme Corporation',
    email: 'billing@acme.com',
    phone: '+33123456789',
    outstandingAmount: 1250.00,
    status: 'active',
    type: 'client',
    initials: 'AC',
    createdAt: new Date('2023-01-10')
  },
  {
    id: '2',
    code: 'CL002',
    name: 'Globex Industries',
    email: 'accounts@globex.com',
    phone: '+33123456790',
    outstandingAmount: 3800.50,
    status: 'active',
    type: 'client',
    initials: 'GI',
    createdAt: new Date('2023-02-15')
  },
  {
    id: '3',
    code: 'CL003',
    name: 'Wayne Enterprises',
    email: 'finance@wayne.com',
    phone: '+33123456791',
    outstandingAmount: 0,
    status: 'inactive',
    type: 'client',
    initials: 'WE',
    createdAt: new Date('2023-03-20')
  },
  {
    id: '4',
    code: 'FR001',
    name: 'Stark Industries',
    email: 'sales@stark.com',
    phone: '+33123456792',
    outstandingAmount: 2570.35,
    status: 'active',
    type: 'fournisseur',
    initials: 'SI',
    createdAt: new Date('2023-01-05')
  },
  {
    id: '5',
    code: 'FR002',
    name: 'LexCorp',
    email: 'procurement@lexcorp.com',
    phone: '+33123456793',
    outstandingAmount: 1230.00,
    status: 'active',
    type: 'fournisseur',
    initials: 'LC',
    createdAt: new Date('2023-02-10')
  }
];

const TiersList = () => {
  const [activeTab, setActiveTab] = useState<TierType>('client');
  const filteredTiers = tiers.filter(tier => tier.type === activeTab);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-white flex justify-between items-center">
        <div className="flex items-center">
          <Users className="h-5 w-5 mr-2 text-primary" />
          <CardTitle className="text-lg font-medium">Tiers</CardTitle>
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <PlusCircle className="h-4 w-4 mr-2" />
          Ajouter un tier
        </Button>
      </CardHeader>
      <Tabs defaultValue="client" className="w-full" onValueChange={(value) => setActiveTab(value as TierType)}>
        <div className="px-6 pt-2">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="client">Clients</TabsTrigger>
            <TabsTrigger value="fournisseur">Fournisseurs</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="client" className="m-0">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Code</th>
                    <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Client</th>
                    <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Email</th>
                    <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Téléphone</th>
                    <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Solde</th>
                    <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTiers.map((tier) => (
                    <tr key={tier.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">{tier.code}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                              {tier.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">{tier.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{tier.email}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{tier.phone}</td>
                      <td className="py-3 px-4 text-sm font-medium">{tier.outstandingAmount?.toFixed(2)} €</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant="outline"
                          className={tier.status === 'active' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-800' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-800'
                          }
                        >
                          {tier.status === 'active' ? 'Actif' : 'Inactif'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="fournisseur" className="m-0">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Code</th>
                    <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Fournisseur</th>
                    <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Email</th>
                    <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Téléphone</th>
                    <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Encours</th>
                    <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTiers.map((tier) => (
                    <tr key={tier.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">{tier.code}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                              {tier.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">{tier.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{tier.email}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{tier.phone}</td>
                      <td className="py-3 px-4 text-sm font-medium">{tier.outstandingAmount?.toFixed(2)} €</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant="outline"
                          className={tier.status === 'active' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-800' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-800'
                          }
                        >
                          {tier.status === 'active' ? 'Actif' : 'Inactif'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default TiersList;
