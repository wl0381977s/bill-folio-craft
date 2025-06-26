
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Eye, Edit, Package } from 'lucide-react';
import Layout from '@/components/Layout';

interface BonSortie {
  id: string;
  numero: string;
  magasin: string;
  destination: string;
  date: string;
  motif: string;
  statut: 'brouillon' | 'valide' | 'effectue' | 'annule';
  valeurTotal: number;
}

const mockBonsSortie: BonSortie[] = [
  {
    id: '1',
    numero: 'BS-2024-001',
    magasin: 'Magasin Principal',
    destination: 'Magasin Annexe',
    date: '2024-01-15',
    motif: 'Transfert de stock',
    statut: 'effectue',
    valeurTotal: 1500
  },
  {
    id: '2',
    numero: 'BS-2024-002',
    magasin: 'Magasin Principal',
    destination: 'Client Direct',
    date: '2024-01-18',
    motif: 'Vente directe',
    statut: 'valide',
    valeurTotal: 850
  },
  {
    id: '3',
    numero: 'BS-2024-003',
    magasin: 'Magasin Annexe',
    destination: 'Retour Fournisseur',
    date: '2024-01-20',
    motif: 'Produit défectueux',
    statut: 'brouillon',
    valeurTotal: 320
  }
];

const BonsSortiePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [bonsSortie] = useState<BonSortie[]>(mockBonsSortie);

  const filteredBons = bonsSortie.filter(bon => {
    const matchesSearch = bon.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bon.magasin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bon.statut === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'brouillon':
        return 'bg-gray-100 text-gray-800';
      case 'valide':
        return 'bg-blue-100 text-blue-800';
      case 'effectue':
        return 'bg-green-100 text-green-800';
      case 'annule':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'brouillon':
        return 'Brouillon';
      case 'valide':
        return 'Validé';
      case 'effectue':
        return 'Effectué';
      case 'annule':
        return 'Annulé';
      default:
        return status;
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Bons de Sortie</h1>
          <Button className="bg-theme-blue hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Bon de Sortie
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gestion des Sorties de Stock</CardTitle>
            <div className="flex gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher par numéro ou magasin..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="brouillon">Brouillon</SelectItem>
                  <SelectItem value="valide">Validé</SelectItem>
                  <SelectItem value="effectue">Effectué</SelectItem>
                  <SelectItem value="annule">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numéro</TableHead>
                  <TableHead>Magasin</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Motif</TableHead>
                  <TableHead>Valeur Total</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBons.map((bon) => (
                  <TableRow key={bon.id}>
                    <TableCell className="font-medium">{bon.numero}</TableCell>
                    <TableCell>{bon.magasin}</TableCell>
                    <TableCell>{bon.destination}</TableCell>
                    <TableCell>{new Date(bon.date).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>{bon.motif}</TableCell>
                    <TableCell>{bon.valeurTotal.toLocaleString('fr-FR')} DA</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(bon.statut)} variant="outline">
                        {getStatusText(bon.statut)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Package className="h-4 w-4" />
                        </Button>
                      </div>
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

export default BonsSortiePage;
