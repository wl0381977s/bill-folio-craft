
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Eye, Edit, Truck } from 'lucide-react';
import Layout from '@/components/Layout';

interface CommandeClient {
  id: string;
  numero: string;
  client: string;
  date: string;
  dateLivraison: string;
  montant: number;
  statut: 'en_attente' | 'confirmee' | 'en_preparation' | 'expediee' | 'livree' | 'annulee';
}

const mockCommandes: CommandeClient[] = [
  {
    id: '1',
    numero: 'CMD-2024-001',
    client: 'Acme Corporation',
    date: '2024-01-15',
    dateLivraison: '2024-01-20',
    montant: 2500,
    statut: 'confirmee'
  },
  {
    id: '2',
    numero: 'CMD-2024-002',
    client: 'Globex Industries',
    date: '2024-01-18',
    dateLivraison: '2024-01-22',
    montant: 1800,
    statut: 'en_preparation'
  },
  {
    id: '3',
    numero: 'CMD-2024-003',
    client: 'Wayne Enterprises',
    date: '2024-01-20',
    dateLivraison: '2024-01-25',
    montant: 3200,
    statut: 'expediee'
  }
];

const CommandesClientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [commandes] = useState<CommandeClient[]>(mockCommandes);

  const filteredCommandes = commandes.filter(commande => {
    const matchesSearch = commande.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commande.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || commande.statut === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmee':
        return 'bg-green-100 text-green-800';
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'en_preparation':
        return 'bg-blue-100 text-blue-800';
      case 'expediee':
        return 'bg-purple-100 text-purple-800';
      case 'livree':
        return 'bg-green-100 text-green-800';
      case 'annulee':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'en_attente':
        return 'En attente';
      case 'confirmee':
        return 'Confirmée';
      case 'en_preparation':
        return 'En préparation';
      case 'expediee':
        return 'Expédiée';
      case 'livree':
        return 'Livrée';
      case 'annulee':
        return 'Annulée';
      default:
        return status;
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Commandes Clients</h1>
          <Button className="bg-theme-blue hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle Commande
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gestion des Commandes</CardTitle>
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
                  <SelectItem value="en_attente">En attente</SelectItem>
                  <SelectItem value="confirmee">Confirmée</SelectItem>
                  <SelectItem value="en_preparation">En préparation</SelectItem>
                  <SelectItem value="expediee">Expédiée</SelectItem>
                  <SelectItem value="livree">Livrée</SelectItem>
                  <SelectItem value="annulee">Annulée</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numéro</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date Commande</TableHead>
                  <TableHead>Date Livraison</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCommandes.map((commande) => (
                  <TableRow key={commande.id}>
                    <TableCell className="font-medium">{commande.numero}</TableCell>
                    <TableCell>{commande.client}</TableCell>
                    <TableCell>{new Date(commande.date).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>{new Date(commande.dateLivraison).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>{commande.montant.toLocaleString('fr-FR')} DA</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(commande.statut)} variant="outline">
                        {getStatusText(commande.statut)}
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
                          <Truck className="h-4 w-4" />
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

export default CommandesClientsPage;
