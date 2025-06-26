
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DollarSign, TrendingUp, AlertCircle, Plus } from 'lucide-react';
import Layout from '@/components/Layout';

interface Budget {
  id: string;
  nom: string;
  montantPrevu: number;
  montantUtilise: number;
  periode: string;
  statut: 'actif' | 'depassé' | 'termine';
}

const mockBudgets: Budget[] = [
  {
    id: '1',
    nom: 'Budget Informatique',
    montantPrevu: 10000,
    montantUtilise: 7520.75,
    periode: 'Janvier 2024',
    statut: 'actif'
  },
  {
    id: '2',
    nom: 'Budget Mobilier',
    montantPrevu: 5000,
    montantUtilise: 5200,
    periode: 'Janvier 2024',
    statut: 'depassé'
  }
];

const BudgetPage = () => {
  const [budgets] = useState<Budget[]>(mockBudgets);

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'actif':
        return 'bg-green-100 text-green-800';
      case 'depassé':
        return 'bg-red-100 text-red-800';
      case 'termine':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestion du Budget</h1>
          <Button className="bg-theme-blue hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Budget
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Budget Total</p>
                  <p className="text-2xl font-bold">15 000 DA</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Utilisé</p>
                  <p className="text-2xl font-bold">12 720 DA</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Restant</p>
                  <p className="text-2xl font-bold">2 280 DA</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Budgets par Catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgets.map((budget) => (
                <div key={budget.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{budget.nom}</h3>
                    <Badge className={getStatusColor(budget.statut)} variant="outline">
                      {budget.statut === 'actif' ? 'Actif' : 
                       budget.statut === 'depassé' ? 'Dépassé' : 'Terminé'}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Période: {budget.periode}</span>
                    <span>{budget.montantUtilise.toLocaleString('fr-FR')} / {budget.montantPrevu.toLocaleString('fr-FR')} DA</span>
                  </div>
                  <Progress 
                    value={(budget.montantUtilise / budget.montantPrevu) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default BudgetPage;
