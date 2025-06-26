
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle, Tag, Edit, Trash } from 'lucide-react';
import { SousFamille, Famille } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Données fictives pour les familles
const familles: Famille[] = [
  { id: '1', code: 'FAM001', name: 'Électronique', description: 'Produits électroniques et accessoires' },
  { id: '2', code: 'FAM002', name: 'Informatique', description: 'Matériel informatique et périphériques' },
  { id: '3', code: 'FAM003', name: 'Mobilier', description: 'Mobilier de bureau et accessoires' },
  { id: '4', code: 'FAM004', name: 'Fournitures', description: 'Fournitures de bureau diverses' },
];

// Données fictives pour les sous-familles - maintenant avec état gérable
const initialSousFamilles: SousFamille[] = [
  { id: '1', code: 'SFAM001', name: 'Smartphones', description: 'Téléphones mobiles', familleId: '1' },
  { id: '2', code: 'SFAM002', name: 'Tablettes', description: 'Tablettes tactiles', familleId: '1' },
  { id: '3', code: 'SFAM003', name: 'Ordinateurs', description: 'Ordinateurs portables et fixes', familleId: '2' },
  { id: '4', code: 'SFAM004', name: 'Imprimantes', description: 'Imprimantes et scanners', familleId: '2' },
  { id: '5', code: 'SFAM005', name: 'Chaises', description: 'Chaises de bureau', familleId: '3' },
  { id: '6', code: 'SFAM006', name: 'Papier', description: 'Fournitures papier', familleId: '4' },
];

const SousFamillesList = () => {
  const [sousFamilles, setSousFamilles] = useState<SousFamille[]>(initialSousFamilles);
  const [selectedFamille, setSelectedFamille] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSousFamille, setEditingSousFamille] = useState<SousFamille | null>(null);
  const [nouvelleSousFamille, setNouvelleSousFamille] = useState({
    code: '',
    name: '',
    description: '',
    familleId: ''
  });
  const { toast } = useToast();
  
  const filteredSousFamilles = selectedFamille === 'all' 
    ? sousFamilles 
    : sousFamilles.filter(sf => sf.familleId === selectedFamille);
  
  const getFamilleNameById = (id: string) => {
    const famille = familles.find(f => f.id === id);
    return famille ? famille.name : '';
  };

  const handleAjouterSousFamille = () => {
    if (!nouvelleSousFamille.code || !nouvelleSousFamille.name || !nouvelleSousFamille.familleId) {
      toast({
        title: "Erreur",
        description: "Le code, le nom et la famille sont requis",
        variant: "destructive"
      });
      return;
    }

    const newSousFamille: SousFamille = {
      id: Date.now().toString(),
      code: nouvelleSousFamille.code,
      name: nouvelleSousFamille.name,
      description: nouvelleSousFamille.description,
      familleId: nouvelleSousFamille.familleId
    };

    setSousFamilles([...sousFamilles, newSousFamille]);
    setIsDialogOpen(false);
    setNouvelleSousFamille({ code: '', name: '', description: '', familleId: '' });
    
    toast({
      title: "Succès",
      description: "Sous-famille ajoutée avec succès"
    });
  };

  const handleModifierSousFamille = (sousFamille: SousFamille) => {
    setEditingSousFamille(sousFamille);
    setIsEditDialogOpen(true);
  };

  const handleSauvegarderModification = () => {
    if (!editingSousFamille) return;

    setSousFamilles(sousFamilles.map(sf => 
      sf.id === editingSousFamille.id ? editingSousFamille : sf
    ));
    setIsEditDialogOpen(false);
    setEditingSousFamille(null);
    
    toast({
      title: "Succès",
      description: "Sous-famille modifiée avec succès"
    });
  };

  const handleSupprimerSousFamille = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette sous-famille ?')) {
      setSousFamilles(sousFamilles.filter(sf => sf.id !== id));
      toast({
        title: "Succès",
        description: "Sous-famille supprimée avec succès"
      });
    }
  };

  return (
    <Card>
      <CardHeader className="bg-white flex justify-between items-center">
        <div className="flex items-center">
          <Tag className="h-5 w-5 mr-2 text-primary" />
          <CardTitle className="text-lg font-medium">Sous-familles de produits</CardTitle>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-48">
            <Select value={selectedFamille} onValueChange={setSelectedFamille}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par famille" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les familles</SelectItem>
                {familles.map((famille) => (
                  <SelectItem key={famille.id} value={famille.id}>
                    {famille.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <PlusCircle className="h-4 w-4 mr-2" />
                Ajouter une sous-famille
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nouvelle Sous-Famille de Produits</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="code">Code Sous-Famille</Label>
                  <Input 
                    id="code" 
                    placeholder="SFAM007"
                    value={nouvelleSousFamille.code}
                    onChange={(e) => setNouvelleSousFamille({...nouvelleSousFamille, code: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="name">Nom de la Sous-Famille</Label>
                  <Input 
                    id="name" 
                    placeholder="Ex: Accessoires"
                    value={nouvelleSousFamille.name}
                    onChange={(e) => setNouvelleSousFamille({...nouvelleSousFamille, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input 
                    id="description" 
                    placeholder="Description de la sous-famille"
                    value={nouvelleSousFamille.description}
                    onChange={(e) => setNouvelleSousFamille({...nouvelleSousFamille, description: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="famille">Famille</Label>
                  <Select value={nouvelleSousFamille.familleId} onValueChange={(value) => setNouvelleSousFamille({...nouvelleSousFamille, familleId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une famille" />
                    </SelectTrigger>
                    <SelectContent>
                      {familles.map((famille) => (
                        <SelectItem key={famille.id} value={famille.id}>
                          {famille.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleAjouterSousFamille}>
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
                <DialogTitle>Modifier la Sous-Famille de Produits</DialogTitle>
              </DialogHeader>
              {editingSousFamille && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-code">Code Sous-Famille</Label>
                    <Input 
                      id="edit-code" 
                      value={editingSousFamille.code}
                      onChange={(e) => setEditingSousFamille({...editingSousFamille, code: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-name">Nom de la Sous-Famille</Label>
                    <Input 
                      id="edit-name" 
                      value={editingSousFamille.name}
                      onChange={(e) => setEditingSousFamille({...editingSousFamille, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-description">Description</Label>
                    <Input 
                      id="edit-description" 
                      value={editingSousFamille.description || ''}
                      onChange={(e) => setEditingSousFamille({...editingSousFamille, description: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-famille">Famille</Label>
                    <Select 
                      value={editingSousFamille.familleId} 
                      onValueChange={(value) => setEditingSousFamille({...editingSousFamille, familleId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une famille" />
                      </SelectTrigger>
                      <SelectContent>
                        {familles.map((famille) => (
                          <SelectItem key={famille.id} value={famille.id}>
                            {famille.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Famille</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSousFamilles.map((sousFamille) => (
              <TableRow key={sousFamille.id}>
                <TableCell className="font-medium">{sousFamille.code}</TableCell>
                <TableCell>{sousFamille.name}</TableCell>
                <TableCell>{sousFamille.description}</TableCell>
                <TableCell>{getFamilleNameById(sousFamille.familleId)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleModifierSousFamille(sousFamille)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleSupprimerSousFamille(sousFamille.id)}
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

export default SousFamillesList;
