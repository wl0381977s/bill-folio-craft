
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, TrendingUp, TrendingDown, DollarSign, FileText } from 'lucide-react';
import Layout from '@/components/Layout';

interface EcritureComptable {
  id: string;
  date: string;
  numeroCompte: string;
  libelle: string;
  debit: number;
  credit: number;
  reference: string;
}

const mockEcritures: EcritureComptable[] = [
  {
    id: '1',
    date: '2024-01-15',
    numeroCompte: '411000',
    libelle: 'Vente facture FAC-2024-001',
    debit: 2500,
    credit: 0,
    reference: 'FAC-2024-001'
  },
  {
    id: '2',
    date: '2024-01-15',
    numeroCompte: '701000',
    libelle: 'Vente facture FAC-2024-001',
    debit: 0,
    credit: 2500,
    reference: 'FAC-2024-001'
  },
  {
    id: '3',
    date: '2024-01-16',
    numeroCompte: '401000',
    libelle: 'Achat facture FF-2024-001',
    debit: 0,
    credit: 1800,
    reference: 'FF-2024-001'
  },
  {
    id: '4',
    date: '2024-01-16',
    numeroCompte: '607000',
    libelle: 'Achat facture FF-2024-001',
    debit: 1800,
    credit: 0,
    reference: 'FF-2024-001'
  }
];

interface CompteComptable {
  numero: string;
  libelle: string;
  soldeDebiteur: number;
  soldeCrediteur: number;
}

const mockComptes: CompteComptable[] = [
  { numero: '411000', libelle: 'Clients', soldeDebiteur: 15000, soldeCrediteur: 0 },
  { numero: '401000', libelle: 'Fournisseurs', soldeDebiteur: 0, soldeCrediteur: 8500 },
  { numero: '512000', libelle: 'Banque', soldeDebiteur: 25000, soldeCrediteur: 0 },
  { numero: '530000', libelle: 'Caisse', soldeDebiteur: 3500, soldeCrediteur: 0 },
  { numero: '701000', libelle: 'Ventes', soldeDebiteur: 0, soldeCrediteur: 45000 },
  { numero: '607000', libelle: 'Achats', soldeDebiteur: 28000, soldeCrediteur: 0 },
];

const ComptabilitePage = () => {
  const [selectedPeriode, setSelectedPeriode] = useState('janvier');
  const [ecritures] = useState<EcritureComptable[]>(mockEcritures);
  const [comptes] = useState<CompteComptable[]>(mockComptes);

  const totalDebit = ecritures.reduce((sum, e) => sum + e.debit, 0);
  const totalCredit = ecritures.reduce((sum, e) => sum + e.credit, 0);

  const chiffreAffaires = comptes.find(c => c.numero === '701000')?.soldeCrediteur || 0;
  const totalAchats = comptes.find(c => c.numero === '607000')?.soldeDebiteur || 0;
  const resultat = chiffreAffaires - totalAchats;

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Comptabilité</h1>
          <div className="flex gap-2">
            <Select value={selectedPeriode} onValueChange={setSelectedPeriode}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sélectionner la période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="janvier">Janvier 2024</SelectItem>
                <SelectItem value="fevrier">Février 2024</SelectItem>
                <SelectItem value="mars">Mars 2024</SelectItem>
                <SelectItem value="trimestre1">1er Trimestre 2024</SelectItem>
                <SelectItem value="annee">Année 2024</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-theme-blue hover:bg-blue-700">
              <FileText className="h-4 w-4 mr-2" />
              Nouvelle Écriture
            </Button>
          </div>
        </div>

        {/* Indicateurs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Chiffre d'Affaires</p>
                  <p className="text-2xl font-bold text-green-600">
                    {chiffreAffaires.toLocaleString('fr-FR')} DA
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Achats</p>
                  <p className="text-2xl font-bold text-red-600">
                    {totalAchats.toLocaleString('fr-FR')} DA
                  </p>
                </div>
                <TrendingDown className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Résultat</p>
                  <p className={`text-2xl font-bold ${resultat >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {resultat.toLocaleString('fr-FR')} DA
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Trésorerie</p>
                  <p className="text-2xl font-bold text-blue-600">28 500 DA</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="ecritures" className="w-full">
          <TabsList>
            <TabsTrigger value="ecritures">Journal</TabsTrigger>
            <TabsTrigger value="comptes">Plan Comptable</TabsTrigger>
            <TabsTrigger value="balance">Balance</TabsTrigger>
            <TabsTrigger value="bilan">Bilan</TabsTrigger>
          </TabsList>

          <TabsContent value="ecritures">
            <Card>
              <CardHeader>
                <CardTitle>Journal des Écritures</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>N° Compte</TableHead>
                      <TableHead>Libellé</TableHead>
                      <TableHead>Référence</TableHead>
                      <TableHead className="text-right">Débit</TableHead>
                      <TableHead className="text-right">Crédit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ecritures.map((ecriture) => (
                      <TableRow key={ecriture.id}>
                        <TableCell>{new Date(ecriture.date).toLocaleDateString('fr-FR')}</TableCell>
                        <TableCell className="font-medium">{ecriture.numeroCompte}</TableCell>
                        <TableCell>{ecriture.libelle}</TableCell>
                        <TableCell>{ecriture.reference}</TableCell>
                        <TableCell className="text-right">
                          {ecriture.debit > 0 ? `${ecriture.debit.toLocaleString('fr-FR')} DA` : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          {ecriture.credit > 0 ? `${ecriture.credit.toLocaleString('fr-FR')} DA` : '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-gray-50 font-bold">
                      <TableCell colSpan={4}>TOTAUX</TableCell>
                      <TableCell className="text-right">{totalDebit.toLocaleString('fr-FR')} DA</TableCell>
                      <TableCell className="text-right">{totalCredit.toLocaleString('fr-FR')} DA</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comptes">
            <Card>
              <CardHeader>
                <CardTitle>Plan Comptable</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>N° Compte</TableHead>
                      <TableHead>Libellé</TableHead>
                      <TableHead className="text-right">Solde Débiteur</TableHead>
                      <TableHead className="text-right">Solde Créditeur</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comptes.map((compte) => (
                      <TableRow key={compte.numero}>
                        <TableCell className="font-medium">{compte.numero}</TableCell>
                        <TableCell>{compte.libelle}</TableCell>
                        <TableCell className="text-right">
                          {compte.soldeDebiteur > 0 ? `${compte.soldeDebiteur.toLocaleString('fr-FR')} DA` : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          {compte.soldeCrediteur > 0 ? `${compte.soldeCrediteur.toLocaleString('fr-FR')} DA` : '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="balance">
            <Card>
              <CardHeader>
                <CardTitle>Balance des Comptes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">
                  Balance comptable - Fonctionnalité en développement
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bilan">
            <Card>
              <CardHeader>
                <CardTitle>Bilan Comptable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">
                  Bilan comptable - Fonctionnalité en développement
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ComptabilitePage;
