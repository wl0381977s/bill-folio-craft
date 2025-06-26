
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import Layout from '@/components/Layout';

interface LigneFacture {
  id: string;
  produit: string;
  quantite: number;
  prixUnitaire: number;
  total: number;
}

const NouvelleFaturePage = () => {
  const [lignes, setLignes] = useState<LigneFacture[]>([
    { id: '1', produit: '', quantite: 1, prixUnitaire: 0, total: 0 }
  ]);

  const ajouterLigne = () => {
    const nouvelleLigne: LigneFacture = {
      id: Date.now().toString(),
      produit: '',
      quantite: 1,
      prixUnitaire: 0,
      total: 0
    };
    setLignes([...lignes, nouvelleLigne]);
  };

  const supprimerLigne = (id: string) => {
    setLignes(lignes.filter(ligne => ligne.id !== id));
  };

  const calculerSousTotal = () => {
    return lignes.reduce((total, ligne) => total + ligne.total, 0);
  };

  const calculerTVA = () => {
    return calculerSousTotal() * 0.19; // TVA 19%
  };

  const calculerTotal = () => {
    return calculerSousTotal() + calculerTVA();
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Nouvelle Facture</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informations Client</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="client">Client</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client1">Acme Corporation</SelectItem>
                    <SelectItem value="client2">Wayne Enterprises</SelectItem>
                    <SelectItem value="client3">Globex Industries</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="numeroFacture">Numéro de Facture</Label>
                <Input id="numeroFacture" placeholder="FAC-2024-001" />
              </div>
              <div>
                <Label htmlFor="dateEmission">Date d'Émission</Label>
                <Input id="dateEmission" type="date" />
              </div>
              <div>
                <Label htmlFor="dateEcheance">Date d'Échéance</Label>
                <Input id="dateEcheance" type="date" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Articles Facturés</CardTitle>
              <Button onClick={ajouterLigne} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un article
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lignes.map((ligne, index) => (
                <div key={ligne.id} className="grid grid-cols-12 gap-4 items-end">
                  <div className="col-span-4">
                    <Label>Produit/Service</Label>
                    <Input placeholder="Description du produit/service" />
                  </div>
                  <div className="col-span-2">
                    <Label>Quantité</Label>
                    <Input type="number" min="1" defaultValue="1" />
                  </div>
                  <div className="col-span-2">
                    <Label>Prix Unitaire (DA)</Label>
                    <Input type="number" step="0.01" placeholder="0.00" />
                  </div>
                  <div className="col-span-2">
                    <Label>Total (DA)</Label>
                    <Input readOnly value="0.00" />
                  </div>
                  <div className="col-span-2">
                    {lignes.length > 1 && (
                      <Button 
                        onClick={() => supprimerLigne(ligne.id)}
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-end">
                <div className="w-80 space-y-2">
                  <div className="flex justify-between">
                    <span>Sous-total:</span>
                    <span>{calculerSousTotal().toLocaleString('fr-FR')} DA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TVA (19%):</span>
                    <span>{calculerTVA().toLocaleString('fr-FR')} DA</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>{calculerTotal().toLocaleString('fr-FR')} DA</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Informations Complémentaires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Notes ou conditions particulières..." />
              </div>
              <div>
                <Label htmlFor="conditions">Conditions de Paiement</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner les conditions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comptant">Comptant</SelectItem>
                    <SelectItem value="30j">Paiement à 30 jours</SelectItem>
                    <SelectItem value="60j">Paiement à 60 jours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end mt-6 space-x-4">
          <Button variant="outline">Annuler</Button>
          <Button variant="outline">Enregistrer en Brouillon</Button>
          <Button className="bg-theme-blue hover:bg-blue-700">
            Créer la Facture
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NouvelleFaturePage;
