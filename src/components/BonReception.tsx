
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Package2, Plus } from 'lucide-react';

const BonReception = () => {
  // Données fictives pour les bons de réception
  const receptions = [
    { id: 'BR-2023-001', fournisseur: 'Fournisseur A', date: '28 Avr 2025', statut: 'validé', articles: 12 },
    { id: 'BR-2023-002', fournisseur: 'Fournisseur B', date: '22 Avr 2025', statut: 'en attente', articles: 8 },
    { id: 'BR-2023-003', fournisseur: 'Fournisseur C', date: '15 Avr 2025', statut: 'validé', articles: 5 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Bons de Réception</h2>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Nouveau Bon
        </Button>
      </div>
      
      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-lg font-medium">Liste des Bons de Réception</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Réf. Bon</TableHead>
                <TableHead>Fournisseur</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Articles</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receptions.map((reception) => (
                <TableRow key={reception.id}>
                  <TableCell className="font-medium">{reception.id}</TableCell>
                  <TableCell>{reception.fournisseur}</TableCell>
                  <TableCell>{reception.date}</TableCell>
                  <TableCell>{reception.articles}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        reception.statut === 'validé'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {reception.statut}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <FileText size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Statistiques Mensuelles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total reçu</span>
                <span className="font-medium">28 bons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">En attente</span>
                <span className="font-medium">3 bons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Articles reçus</span>
                <span className="font-medium">145 articles</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Fournisseurs Principaux</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Fournisseur A</span>
                <span className="font-medium">12 bons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Fournisseur B</span>
                <span className="font-medium">8 bons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Fournisseur C</span>
                <span className="font-medium">5 bons</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Actions Rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Nouveau bon de réception
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Package2 className="mr-2 h-4 w-4" />
                Voir les articles en attente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BonReception;
