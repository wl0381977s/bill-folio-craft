import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ClipboardList, DollarSign, FileText, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BonAchat = () => {
  const navigate = useNavigate();
  
  // Données fictives pour les bons d'achat
  const achats = [
    { id: 'BA-2023-001', fournisseur: 'Fournisseur A', date: '28 Avr 2025', montant: '2,450.00 €', statut: 'validé' },
    { id: 'BA-2023-002', fournisseur: 'Fournisseur B', date: '22 Avr 2025', montant: '1,870.50 €', statut: 'en attente' },
    { id: 'BA-2023-003', fournisseur: 'Fournisseur C', date: '15 Avr 2025', montant: '3,200.25 €', statut: 'validé' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Bons d'Achat</h2>
        <Button 
          className="flex items-center gap-2"
          onClick={() => navigate('/achats/nouveau-bon')}
        >
          <Plus size={16} />
          Nouveau Bon
        </Button>
      </div>
      
      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-lg font-medium">Liste des Bons d'Achat</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Réf. Bon</TableHead>
                <TableHead>Fournisseur</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {achats.map((achat) => (
                <TableRow key={achat.id}>
                  <TableCell className="font-medium">{achat.id}</TableCell>
                  <TableCell>{achat.fournisseur}</TableCell>
                  <TableCell>{achat.date}</TableCell>
                  <TableCell>{achat.montant}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        achat.statut === 'validé'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {achat.statut}
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
            <CardTitle className="text-lg">Statistiques Financières</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total commandes</span>
                <span className="font-medium">7,520.75 €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">En attente</span>
                <span className="font-medium">1,870.50 €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Budget mensuel</span>
                <span className="font-medium">10,000.00 €</span>
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
                <span className="font-medium">2,450.00 €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Fournisseur B</span>
                <span className="font-medium">1,870.50 €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Fournisseur C</span>
                <span className="font-medium">3,200.25 €</span>
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
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate('/achats/nouveau-bon')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Nouveau bon d'achat
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate('/budget')}
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Gérer le budget
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate('/achats/commandes')}
              >
                <ClipboardList className="mr-2 h-4 w-4" />
                Voir les commandes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BonAchat;
