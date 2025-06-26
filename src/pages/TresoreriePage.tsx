
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreditCard, Building2, Wallet, Plus, Eye, Edit } from 'lucide-react';
import Layout from '@/components/Layout';

interface CompteBancaire {
  id: string;
  banque: string;
  numeroCompte: string;
  iban: string;
  solde: number;
  devise: string;
  type: 'courant' | 'epargne' | 'credit';
}

interface Cheque {
  id: string;
  numero: string;
  beneficiaire: string;
  montant: number;
  date: string;
  statut: 'emis' | 'encaisse' | 'annule';
  banque: string;
}

interface Traite {
  id: string;
  numero: string;
  tireur: string;
  montant: number;
  dateEmission: string;
  dateEcheance: string;
  statut: 'emise' | 'acceptee' | 'payee' | 'protestee';
}

const mockComptesBancaires: CompteBancaire[] = [
  {
    id: '1',
    banque: 'BNP Paribas',
    numeroCompte: '12345678901',
    iban: 'FR76 1234 5678 9012 3456 7890 123',
    solde: 25000,
    devise: 'DA',
    type: 'courant'
  },
  {
    id: '2',
    banque: 'Crédit Agricole',
    numeroCompte: '98765432109',
    iban: 'FR76 9876 5432 1098 7654 3210 987',
    solde: 15000,
    devise: 'DA',
    type: 'courant'
  }
];

const mockCheques: Cheque[] = [
  {
    id: '1',
    numero: '0012345',
    beneficiaire: 'TechSupply Corp',
    montant: 5500,
    date: '2024-01-15',
    statut: 'emis',
    banque: 'BNP Paribas'
  },
  {
    id: '2',
    numero: '0012346',
    beneficiaire: 'Office Solutions',
    montant: 2300,
    date: '2024-01-18',
    statut: 'encaisse',
    banque: 'BNP Paribas'
  }
];

const mockTraites: Traite[] = [
  {
    id: '1',
    numero: 'TR-2024-001',
    tireur: 'Acme Corporation',
    montant: 8000,
    dateEmission: '2024-01-10',
    dateEcheance: '2024-02-10',
    statut: 'acceptee'
  },
  {
    id: '2',
    numero: 'TR-2024-002',
    tireur: 'Globex Industries',
    montant: 3500,
    dateEmission: '2024-01-15',
    dateEcheance: '2024-02-15',
    statut: 'emise'
  }
];

const TresoreriePage = () => {
  const [comptesBancaires] = useState<CompteBancaire[]>(mockComptesBancaires);
  const [cheques] = useState<Cheque[]>(mockCheques);
  const [traites] = useState<Traite[]>(mockTraites);

  const totalTresorerie = comptesBancaires.reduce((sum, compte) => sum + compte.solde, 0);
  const totalCheques = cheques.reduce((sum, cheque) => sum + cheque.montant, 0);
  const totalTraites = traites.reduce((sum, traite) => sum + traite.montant, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'emis':
      case 'emise':
        return 'bg-blue-100 text-blue-800';
      case 'encaisse':
      case 'acceptee':
        return 'bg-green-100 text-green-800';
      case 'payee':
        return 'bg-green-100 text-green-800';
      case 'annule':
      case 'protestee':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'emis':
        return 'Émis';
      case 'emise':
        return 'Émise';
      case 'encaisse':
        return 'Encaissé';
      case 'acceptee':
        return 'Acceptée';
      case 'payee':
        return 'Payée';
      case 'annule':
        return 'Annulé';
      case 'protestee':
        return 'Protestée';
      default:
        return status;
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestion de Trésorerie</h1>
          <Button className="bg-theme-blue hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Mouvement
          </Button>
        </div>

        {/* Indicateurs de trésorerie */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Trésorerie Totale</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {totalTresorerie.toLocaleString('fr-FR')} DA
                  </p>
                </div>
                <Wallet className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Chèques en Cours</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {totalCheques.toLocaleString('fr-FR')} DA
                  </p>
                </div>
                <CreditCard className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Traites en Cours</p>
                  <p className="text-2xl font-bold text-green-600">
                    {totalTraites.toLocaleString('fr-FR')} DA
                  </p>
                </div>
                <Building2 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Comptes Bancaires</p>
                  <p className="text-2xl font-bold">{comptesBancaires.length}</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="comptes" className="w-full">
          <TabsList>
            <TabsTrigger value="comptes">Comptes Bancaires</TabsTrigger>
            <TabsTrigger value="cheques">Chèques</TabsTrigger>
            <TabsTrigger value="traites">Traites</TabsTrigger>
            <TabsTrigger value="mouvements">Mouvements</TabsTrigger>
          </TabsList>

          <TabsContent value="comptes">
            <Card>
              <CardHeader>
                <CardTitle>Comptes Bancaires</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Banque</TableHead>
                      <TableHead>N° Compte</TableHead>
                      <TableHead>IBAN</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Solde</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comptesBancaires.map((compte) => (
                      <TableRow key={compte.id}>
                        <TableCell className="font-medium">{compte.banque}</TableCell>
                        <TableCell>{compte.numeroCompte}</TableCell>
                        <TableCell className="font-mono text-sm">{compte.iban}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {compte.type === 'courant' ? 'Courant' : compte.type === 'epargne' ? 'Épargne' : 'Crédit'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          {compte.solde.toLocaleString('fr-FR')} {compte.devise}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cheques">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Chèques</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>N° Chèque</TableHead>
                      <TableHead>Bénéficiaire</TableHead>
                      <TableHead>Banque</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Montant</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cheques.map((cheque) => (
                      <TableRow key={cheque.id}>
                        <TableCell className="font-medium">{cheque.numero}</TableCell>
                        <TableCell>{cheque.beneficiaire}</TableCell>
                        <TableCell>{cheque.banque}</TableCell>
                        <TableCell>{new Date(cheque.date).toLocaleDateString('fr-FR')}</TableCell>
                        <TableCell className="text-right">
                          {cheque.montant.toLocaleString('fr-FR')} DA
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(cheque.statut)} variant="outline">
                            {getStatusText(cheque.statut)}
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
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="traites">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Traites</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>N° Traite</TableHead>
                      <TableHead>Tireur</TableHead>
                      <TableHead>Date Émission</TableHead>
                      <TableHead>Date Échéance</TableHead>
                      <TableHead className="text-right">Montant</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {traites.map((traite) => (
                      <TableRow key={traite.id}>
                        <TableCell className="font-medium">{traite.numero}</TableCell>
                        <TableCell>{traite.tireur}</TableCell>
                        <TableCell>{new Date(traite.dateEmission).toLocaleDateString('fr-FR')}</TableCell>
                        <TableCell>{new Date(traite.dateEcheance).toLocaleDateString('fr-FR')}</TableCell>
                        <TableCell className="text-right">
                          {traite.montant.toLocaleString('fr-FR')} DA
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(traite.statut)} variant="outline">
                            {getStatusText(traite.statut)}
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
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mouvements">
            <Card>
              <CardHeader>
                <CardTitle>Mouvements de Trésorerie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">
                  Historique des mouvements - Fonctionnalité en développement
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TresoreriePage;
