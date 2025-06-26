
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Eye, Edit, Printer } from 'lucide-react';
import Layout from '@/components/Layout';

interface BonLivraison {
  id: string;
  numero: string;
  commande: string;
  client: string;
  date: string;
  transporteur: string;
  statut: 'prepare' | 'expedie' | 'livre' | 'retourne';
}

const mockBonsLivraison: BonLivraison[] = [
  {
    id: '1',
    numero: 'BL-2024-001',
    commande: 'CMD-2024-001',
    client: 'Acme Corporation',
    date: '2024-01-20',
    transporteur: 'DHL Express',
    statut: 'expedie'
  },
  {
    id: '2',
    numero: 'BL-2024-002',
    commande: 'CMD-2024-002',
    client: 'Globex Industries',
    date: '2024-01-22',
    transporteur: 'Chronopost',
    statut: 'prepare'
  },
  {
    id: '3',
    numero: 'BL-2024-003',
    commande: 'CMD-2024-003',
    client: 'Wayne Enterprises',
    date: '2024-01-25',
    transporteur: 'UPS Standard',
    statut: 'livre'
  }
];

const BonsLivraisonPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [bonsLivraison] = useState<BonLivraison[]>(mockBonsLivraison);

  const filteredBons = bonsLivraison.filter(bon => {
    const matchesSearch = bon.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bon.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bon.statut === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'prepare':
        return 'bg-blue-100 text-blue-800';
      case 'expedie':
        return 'bg-yellow-100 text-yellow-800';
      case 'livre':
        return 'bg-green-100 text-green-800';
      case 'retourne':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'prepare':
        return 'Préparé';
      case 'expedie':
        return 'Expédié';
      case 'livre':
        return 'Livré';
      case 'retourne':
        return 'Retourné';
      default:
        return status;
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Bons de Livraison</h1>
          <Button className="bg-theme-blue hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Bon de Livraison
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gestion des Livraisons</CardTitle>
            <div className="flex gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher par numéro ou client..."
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
                  <SelectItem value="prepare">Préparé</SelectItem>
                  <SelectItem value="expedie">Expédié</SelectItem>
                  <SelectItem value="livre">Livré</SelectItem>
                  <SelectItem value="retourne">Retourné</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numéro BL</TableHead>
                  <TableHead>Commande</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Transporteur</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBons.map((bon) => (
                  <TableRow key={bon.id}>
                    <TableCell className="font-medium">{bon.numero}</TableCell>
                    <TableCell>{bon.commande}</TableCell>
                    <TableCell>{bon.client}</TableCell>
                    <TableCell>{new Date(bon.date).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>{bon.transporteur}</TableCell>
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
                          <Printer className="h-4 w-4" />
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

export default BonsLivraisonPage;
