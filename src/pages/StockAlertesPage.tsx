
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, Package } from 'lucide-react';
import Layout from '@/components/Layout';

interface AlerteStock {
  id: string;
  produit: string;
  code: string;
  stockActuel: number;
  stockMin: number;
  niveau: 'critique' | 'faible';
}

const mockAlertes: AlerteStock[] = [
  {
    id: '1',
    produit: 'Souris Logitech',
    code: 'SOU-001',
    stockActuel: 3,
    stockMin: 10,
    niveau: 'critique'
  },
  {
    id: '2',
    produit: 'Clavier Mécanique',
    code: 'CLA-001',
    stockActuel: 8,
    stockMin: 15,
    niveau: 'faible'
  }
];

const StockAlertesPage = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Alertes de Stock</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Alertes Critiques</p>
                  <p className="text-2xl font-bold text-red-600">
                    {mockAlertes.filter(a => a.niveau === 'critique').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Stock Faible</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {mockAlertes.filter(a => a.niveau === 'faible').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Produits en Alerte</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Stock Actuel</TableHead>
                  <TableHead>Stock Minimum</TableHead>
                  <TableHead>Niveau d'Alerte</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAlertes.map((alerte) => (
                  <TableRow key={alerte.id}>
                    <TableCell className="font-medium">{alerte.produit}</TableCell>
                    <TableCell>{alerte.code}</TableCell>
                    <TableCell>{alerte.stockActuel}</TableCell>
                    <TableCell>{alerte.stockMin}</TableCell>
                    <TableCell>
                      <Badge 
                        className={alerte.niveau === 'critique' ? 
                          'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'} 
                        variant="outline"
                      >
                        {alerte.niveau === 'critique' ? 'Critique' : 'Faible'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Commander
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StockAlertesPage;
