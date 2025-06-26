
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle, Tag, Edit, Trash } from 'lucide-react';
import { Famille } from '@/types';
import { useToast } from '@/hooks/use-toast';

// Données fictives pour les familles - maintenant avec état gérable
const initialFamilles: Famille[] = [
  { id: '1', code: 'FAM001', name: 'Électronique', description: 'Produits électroniques et accessoires' },
  { id: '2', code: 'FAM002', name: 'Informatique', description: 'Matériel informatique et périphériques' },
  { id: '3', code: 'FAM003', name: 'Mobilier', description: 'Mobilier de bureau et accessoires' },
  { id: '4', code: 'FAM004', name: 'Fournitures', description: 'Fournitures de bureau diverses' },
];

const FamillesList = () => {
  const [familles, setFamilles] = useState<Famille[]>(initialFamilles);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingFamille, setEditingFamille] = useState<Famille | null>(null);
  const [nouvelleFamille, setNouvelleFamille] = useState({
    code: '',
    name: '',
    description: ''
  });
  const { toast } = useToast();

  const handleAjouterFamille = () => {
    if (!nouvelleFamille.code || !nouvelleFamille.name) {
      toast({
        title: "Erreur",
        description: "Le code et le nom sont requis",
        variant: "destructive"
      });
      return;
    }

    const newFamille: Famille = {
      id: Date.now().toString(),
      code: nouvelleFamille.code,
      name: nouvelleFamille.name,
      description: nouvelleFamille.description
    };

    setFamilles([...familles, newFamille]);
    setIsDialogOpen(false);
    setNouvelleFamille({ code: '', name: '', description: '' });
    
    toast({
      title: "Succès",
      description: "Famille ajoutée avec succès"
    });
  };

  const handleModifierFamille = (famille: Famille) => {
    setEditingFamille(famille);
    setIsEditDialogOpen(true);
  };

  const handleSauvegarderModification = () => {
    if (!editingFamille) return;

    setFamilles(familles.map(f => 
      f.id === editingFamille.id ? editingFamille : f
    ));
    setIsEditDialogOpen(false);
    setEditingFamille(null);
    
    toast({
      title: "Succès",
      description: "Famille modifiée avec succès"
    });
  };

  const handleSupprimerFamille = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette famille ?')) {
      setFamilles(familles.filter(f => f.id !== id));
      toast({
        title: "Succès",
        description: "Famille supprimée avec succès"
      });
    }
  };

  return (
    <Card>
      <CardHeader className="bg-white flex justify-between items-center">
        <div className="flex items-center">
          <Tag className="h-5 w-5 mr-2 text-primary" />
          <CardTitle className="text-lg font-medium">Familles de produits</CardTitle>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <PlusCircle className="h-4 w-4 mr-2" />
              Ajouter une famille
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvelle Famille de Produits</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="code">Code Famille</Label>
                <Input 
                  id="code" 
                  placeholder="FAM005"
                  value={nouvelleFamille.code}
                  onChange={(e) => setNouvelleFamille({...nouvelleFamille, code: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="name">Nom de la Famille</Label>
                <Input 
                  id="name" 
                  placeholder="Ex: Accessoires"
                  value={nouvelleFamille.name}
                  onChange={(e) => setNouvelleFamille({...nouvelleFamille, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description" 
                  placeholder="Description de la famille de produits"
                  value={nouvelleFamille.description}
                  onChange={(e) => setNouvelleFamille({...nouvelleFamille, description: e.target.value})}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAjouterFamille}>
                  Ajouter
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Dialog de modification */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier la Famille de Produits</DialogTitle>
            </DialogHeader>
            {editingFamille && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-code">Code Famille</Label>
                  <Input 
                    id="edit-code" 
                    value={editingFamille.code}
                    onChange={(e) => setEditingFamille({...editingFamille, code: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-name">Nom de la Famille</Label>
                  <Input 
                    id="edit-name" 
                    value={editingFamille.name}
                    onChange={(e) => setEditingFamille({...editingFamille, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Input 
                    id="edit-description" 
                    value={editingFamille.description || ''}
                    onChange={(e) => setEditingFamille({...editingFamille, description: e.target.value})}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleSauvegarderModification}>
                    Sauvegarder
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {familles.map((famille) => (
              <TableRow key={famille.id}>
                <TableCell className="font-medium">{famille.code}</TableCell>
                <TableCell>{famille.name}</TableCell>
                <TableCell>{famille.description}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleModifierFamille(famille)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleSupprimerFamille(famille.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FamillesList;
