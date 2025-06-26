
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Eye, Edit, CreditCard, AlertTriangle } from 'lucide-react';
import Layout from '@/components/Layout';

interface FactureFournisseur {
  id: string;
  numero: string;
  fournisseur: string;
  date: string;
  echeance: string;
  montant: number;
  montantPaye: number;
  statut: 'payee' | 'partielle' | 'en_attente' | 'en_retard';
  joursRetard?: number;
}

const mockFactures: FactureFournisseur[] = [
  {
    id: '1',
    numero: 'FF-2024-001',
    fournisseur: 'TechSupply Corp',
    date: '2024-01-10',
    echeance: '2024-02-10',
    montant: 5500,
    montantPaye: 5500,
    statut: 'payee'
  },
  {
    id: '2',
    numero: 'FF-2024-002',
    fournisseur: 'Office Solutions',
    date: '2024-01-15',
    echeance: '2024-02-15',
    montant: 2300,
    montantPaye: 1000,
    statut: 'partielle'
  },
  {
    id: '3',
    numero: 'FF-2024-003',
    fournisseur: 'Global Equipment',
    date: '2024-01-05',
    echeance: '2024-01-20',
    montant: 8900,
    montantPaye: 0,
    statut: 'en_retard',
    joursRetard: 15
  },
  {
    id: '4',
    numero: 'FF-2024-004',
    fournisseur: 'Material Plus',
    date: '2024-01-20',
    echeance: '2024-02-20',
    montant: 1200,
    montantPaye: 0,
    statut: 'en_attente'
  }
];

const FacturesFournisseursPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [factures] = useState<FactureFournisseur[]>(mockFactures);

  const filteredFactures = factures.filter(facture => {
    const matchesSearch = facture.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         facture.fournisseur.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || facture.statut === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const facturesPayees = factures.filter(f => f.statut === 'payee');
  const facturesAPayer = factures.filter(f => f.statut === 'en_attente' || f.statut === 'partielle');
  const facturesEnRetard = factures.filter(f => f.statut === 'en_retard');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'payee':
        return 'bg-green-100 text-green-800';
      case 'partielle':
        return 'bg-yellow-100 text-yellow-800';
      case 'en_attente':
        return 'bg-blue-100 text-blue-800';
      case 'en_retard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'payee':
        return 'Payée';
      case 'partielle':
        return 'Paiement partiel';
      case 'en_attente':
        return 'En attente';
      case 'en_retard':
        return 'En retard';
      default:
        return status;
    }
  };

  const totalAPayer = facturesAPayer.reduce((sum, f) => sum + (f.montant - f.montantPaye), 0);
  const totalEnRetard = facturesEnRetard.reduce((sum, f) => sum + (f.montant - f.montantPaye), 0);

  const FacturesTable = ({ facturesList }: { facturesList: FactureFournisseur[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Numéro</TableHead>
          <TableHead>Fournisseur</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Échéance</TableHead>
          <TableHead>Montant</TableHead>
          <TableHead>Montant Payé</TableHead>
          <TableHead>Reste à Payer</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {facturesList.map((facture) => (
          <TableRow key={facture.id}>
            <TableCell className="font-medium">{facture.numero}</TableCell>
            <TableCell>{facture.fournisseur}</TableCell>
            <TableCell>{new Date(facture.date).toLocaleDateString('fr-FR')}</TableCell>
            <TableCell>
              {new Date(facture.echeance).toLocaleDateString('fr-FR')}
              {facture.joursRetard && (
                <span className="ml-2 text-red-500 text-sm">
                  ({facture.joursRetard}j de retard)
                </span>
              )}
            </TableCell>
            <TableCell>{facture.montant.toLocaleString('fr-FR')} DA</TableCell>
            <TableCell>{facture.montantPaye.toLocaleString('fr-FR')} DA</TableCell>
            <TableCell className="font-medium">
              {(facture.montant - facture.montantPaye).toLocaleString('fr-FR')} DA
            </TableCell>
            <TableCell>
              <Badge className={getStatusColor(facture.statut)} variant="outline">
                {getStatusText(facture.statut)}
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
                  <CreditCard className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Factures Fournisseurs</h1>
          <Button className="bg-theme-blue hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle Facture Fournisseur
          </Button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total à Payer</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {totalAPayer.toLocaleString('fr-FR')} DA
                  </p>
                </div>
                <CreditCard className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">En Retard</p>
                  <p className="text-2xl font-bold text-red-600">
                    {totalEnRetard.toLocaleString('fr-FR')} DA
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Factures Payées</p>
                  <p className="text-2xl font-bold text-green-600">{facturesPayees.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Factures</p>
                  <p className="text-2xl font-bold">{factures.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gestion des Factures Fournisseurs</CardTitle>
            <div className="flex gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher par numéro ou fournisseur..."
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
                  <SelectItem value="payee">Payées</SelectItem>
                  <SelectItem value="en_attente">En attente</SelectItem>
                  <SelectItem value="partielle">Paiement partiel</SelectItem>
                  <SelectItem value="en_retard">En retard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">Toutes</TabsTrigger>
                <TabsTrigger value="payees">Payées ({facturesPayees.length})</TabsTrigger>
                <TabsTrigger value="a_payer">À Payer ({facturesAPayer.length})</TabsTrigger>
                <TabsTrigger value="en_retard">En Retard ({facturesEnRetard.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <FacturesTable facturesList={filteredFactures} />
              </TabsContent>
              
              <TabsContent value="payees">
                <FacturesTable facturesList={facturesPayees} />
              </TabsContent>
              
              <TabsContent value="a_payer">
                <FacturesTable facturesList={facturesAPayer} />
              </TabsContent>
              
              <TabsContent value="en_retard">
                <FacturesTable facturesList={facturesEnRetard} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default FacturesFournisseursPage;
