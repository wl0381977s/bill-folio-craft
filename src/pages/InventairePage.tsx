
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Package } from 'lucide-react';
import Layout from '@/components/Layout';

interface StockItem {
  id: string;
  produit: string;
  code: string;
  stockActuel: number;
  stockMin: number;
  stockMax: number;
  valeur: number;
}

const mockStock: StockItem[] = [
  {
    id: '1',
    produit: 'Ordinateur Portable HP',
    code: 'ORD-001',
    stockActuel: 15,
    stockMin: 5,
    stockMax: 50,
    valeur: 75000
  },
  {
    id: '2',
    produit: 'Souris Logitech',
    code: 'SOU-001',
    stockActuel: 3,
    stockMin: 10,
    stockMax: 100,
    valeur: 1200
  }
];

const InventairePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stock] = useState<StockItem[]>(mockStock);

  const filteredStock = stock.filter(item =>
    item.produit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (actuel: number, min: number) => {
    if (actuel <= min) {
      return { color: 'text-red-600', label: 'Stock faible' };
    }
    return { color: 'text-green-600', label: 'Stock normal' };
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Inventaire</h1>
          <Button className="bg-theme-blue hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Ajustement Stock
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-theme-blue" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Produits</p>
                  <p className="text-2xl font-bold">{stock.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Stock Faible</p>
                  <p className="text-2xl font-bold text-red-600">
                    {stock.filter(item => item.stockActuel <= item.stockMin).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Valeur Stock</p>
                  <p className="text-2xl font-bold">
                    {stock.reduce((sum, item) => sum + item.valeur, 0).toLocaleString('fr-FR')} DA
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>État des Stocks</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Stock Actuel</TableHead>
                  <TableHead>Stock Min</TableHead>
                  <TableHead>Stock Max</TableHead>
                  <TableHead>Valeur</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStock.map((item) => {
                  const status = getStockStatus(item.stockActuel, item.stockMin);
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.produit}</TableCell>
                      <TableCell>{item.code}</TableCell>
                      <TableCell>{item.stockActuel}</TableCell>
                      <TableCell>{item.stockMin}</TableCell>
                      <TableCell>{item.stockMax}</TableCell>
                      <TableCell>{item.valeur.toLocaleString('fr-FR')} DA</TableCell>
                      <TableCell className={status.color}>{status.label}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default InventairePage;
