
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, ArrowRight, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { Transfert, Magasin } from '@/types';

// Données fictives pour les magasins
const magasins: Magasin[] = [
  { id: '1', code: 'MAG001', name: 'Magasin Central', address: '123 Rue Principale, Paris', manager: 'Jean Dupont', isActive: true },
  { id: '2', code: 'MAG002', name: 'Dépôt Nord', address: '45 Avenue du Nord, Lille', manager: 'Marie Martin', isActive: true },
  { id: '3', code: 'MAG003', name: 'Dépôt Sud', address: '78 Boulevard du Sud, Marseille', manager: 'Pierre Durand', isActive: true },
];

// Données fictives pour les transferts
const transferts: Transfert[] = [
  {
    id: 'TR001',
    date: new Date('2025-04-15'),
    fromMagasinId: '1',
    toMagasinId: '2',
    status: 'completed',
    items: [
      { produitId: 'P001', quantite: 10 },
      { produitId: 'P002', quantite: 5 }
    ]
  },
  {
    id: 'TR002',
    date: new Date('2025-04-20'),
    fromMagasinId: '1',
    toMagasinId: '3',
    status: 'pending',
    items: [
      { produitId: 'P003', quantite: 15 },
      { produitId: 'P004', quantite: 8 }
    ]
  },
  {
    id: 'TR003',
    date: new Date('2025-04-25'),
    fromMagasinId: '2',
    toMagasinId: '3',
    status: 'cancelled',
    items: [
      { produitId: 'P001', quantite: 12 }
    ]
  }
];

const getMagasinNameById = (id: string): string => {
  const magasin = magasins.find(m => m.id === id);
  return magasin ? magasin.name : '';
};

const getStatusBadge = (status: string) => {
  switch(status) {
    case 'completed':
      return <Badge className="bg-green-100 text-green-800">Terminé</Badge>;
    case 'pending':
      return <Badge className="bg-amber-100 text-amber-800">En cours</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-100 text-red-800">Annulé</Badge>;
    default:
      return <Badge>Inconnu</Badge>;
  }
};

const TransfertsStock = () => {
  return (
    <Card>
      <CardHeader className="bg-white flex justify-between items-center">
        <div className="flex items-center">
          <ArrowRight className="h-5 w-5 mr-2 text-primary" />
          <CardTitle className="text-lg font-medium">Transferts de stock</CardTitle>
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <PlusCircle className="h-4 w-4 mr-2" />
          Nouveau transfert
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Référence</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>De</TableHead>
              <TableHead>Vers</TableHead>
              <TableHead>Nb articles</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transferts.map((transfert) => (
              <TableRow key={transfert.id}>
                <TableCell className="font-medium">{transfert.id}</TableCell>
                <TableCell>{format(transfert.date, 'dd/MM/yyyy')}</TableCell>
                <TableCell>{getMagasinNameById(transfert.fromMagasinId)}</TableCell>
                <TableCell>{getMagasinNameById(transfert.toMagasinId)}</TableCell>
                <TableCell>{transfert.items.length}</TableCell>
                <TableCell>{getStatusBadge(transfert.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Eye size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransfertsStock;
