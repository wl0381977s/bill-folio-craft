
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus } from 'lucide-react';
import Layout from '@/components/Layout';

interface Commande {
  id: string;
  numero: string;
  fournisseur: string;
  date: string;
  livraison: string;
  montant: number;
  statut: 'en_cours' | 'livree' | 'annulee';
}

const mockCommandes: Commande[] = [
  {
    id: '1',
    numero: 'CMD-2024-001',
    fournisseur: 'Fournisseur Alpha',
    date: '2024-01-15',
    livraison: '2024-02-01',
    montant: 5000,
    statut: 'en_cours'
  },
  {
    id: '2',
    numero: 'CMD-2024-002',
    fournisseur: 'Fournisseur Beta',
    date: '2024-01-20',
    livraison: '2024-02-05',
    montant: 3500,
    statut: 'livree'
  }
];

const AchatsCommandesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [commandes] = useState<Commande[]>(mockCommandes);

  const filteredCommandes = commandes.filter(commande =>
    commande.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    commande.fournisseur.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'livree':
        return 'bg-green-100 text-green-800';
      case 'en_cours':
        return 'bg-yellow-100 text-yellow-800';
      case 'annulee':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Commandes Fournisseurs</h1>
          <Button className="bg-theme-blue hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle Commande
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des Commandes</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher..."
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
                  <TableHead>Numéro</TableHead>
                  <TableHead>Fournisseur</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Livraison prévue</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCommandes.map((commande) => (
                  <TableRow key={commande.id}>
                    <TableCell className="font-medium">{commande.numero}</TableCell>
                    <TableCell>{commande.fournisseur}</TableCell>
                    <TableCell>{new Date(commande.date).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>{new Date(commande.livraison).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>{commande.montant.toLocaleString('fr-FR')} DA</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(commande.statut)} variant="outline">
                        {commande.statut === 'en_cours' ? 'En cours' : 
                         commande.statut === 'livree' ? 'Livrée' : 'Annulée'}
                      </Badge>
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

export default AchatsCommandesPage;
