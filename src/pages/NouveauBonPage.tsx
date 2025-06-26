
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import Layout from '@/components/Layout';

interface LigneBon {
  id: string;
  produit: string;
  quantite: number;
  prixUnitaire: number;
  total: number;
}

const NouveauBonPage = () => {
  const [typeBon, setTypeBon] = useState('achat');
  const [lignes, setLignes] = useState<LigneBon[]>([
    { id: '1', produit: '', quantite: 1, prixUnitaire: 0, total: 0 }
  ]);

  const ajouterLigne = () => {
    const nouvelleLigne: LigneBon = {
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

  const calculerTotal = () => {
    return lignes.reduce((total, ligne) => total + ligne.total, 0);
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Nouveau Bon {typeBon === 'achat' ? "d'Achat" : "de Réception"}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informations Générales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="type">Type de Bon</Label>
                <Select value={typeBon} onValueChange={setTypeBon}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="achat">Bon d'Achat</SelectItem>
                    <SelectItem value="reception">Bon de Réception</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="numero">Numéro</Label>
                <Input id="numero" placeholder="Auto-généré" disabled />
              </div>
              <div>
                <Label htmlFor="fournisseur">Fournisseur</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un fournisseur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fournisseur1">Fournisseur Alpha</SelectItem>
                    <SelectItem value="fournisseur2">Fournisseur Beta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Notes ou commentaires..." />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Articles</CardTitle>
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
                    <Label>Produit</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un produit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="produit1">Ordinateur portable</SelectItem>
                        <SelectItem value="produit2">Souris</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label>Quantité</Label>
                    <Input type="number" min="1" defaultValue="1" />
                  </div>
                  <div className="col-span-2">
                    <Label>Prix Unitaire</Label>
                    <Input type="number" step="0.01" placeholder="0.00" />
                  </div>
                  <div className="col-span-2">
                    <Label>Total</Label>
                    <Input readOnly value="0.00 DA" />
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
                <div className="text-right">
                  <p className="text-lg font-bold">
                    Total: {calculerTotal().toLocaleString('fr-FR')} DA
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end mt-6 space-x-4">
          <Button variant="outline">Annuler</Button>
          <Button className="bg-theme-blue hover:bg-blue-700">
            Créer le Bon
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NouveauBonPage;
