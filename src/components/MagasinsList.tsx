
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Store, Edit, Trash, Eye, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Magasin } from '@/types';

const magasins: Magasin[] = [
  { id: '1', code: 'MAG001', name: 'Magasin Central', address: '123 Rue Principale, Paris', manager: 'Jean Dupont', isActive: true },
  { id: '2', code: 'MAG002', name: 'Dépôt Nord', address: '45 Avenue du Nord, Lille', manager: 'Marie Martin', isActive: true },
  { id: '3', code: 'MAG003', name: 'Dépôt Sud', address: '78 Boulevard du Sud, Marseille', manager: 'Pierre Durand', isActive: true },
  { id: '4', code: 'MAG004', name: 'Entrepôt Est', address: '12 Rue de l\'Est, Strasbourg', manager: 'Sophie Bernard', isActive: false },
];

const MagasinsList = () => {
  const [magasinsList, setMagasinsList] = useState<Magasin[]>(magasins);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMagasin, setEditingMagasin] = useState<Magasin | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    address: '',
    manager: '',
    isActive: true
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingMagasin) {
      // Update existing magasin
      setMagasinsList(prev => prev.map(mag => 
        mag.id === editingMagasin.id 
          ? { ...mag, ...formData }
          : mag
      ));
      toast({
        title: "Magasin modifié",
        description: "Le magasin a été modifié avec succès.",
      });
    } else {
      // Add new magasin
      const newMagasin: Magasin = {
        id: Date.now().toString(),
        ...formData
      };
      setMagasinsList(prev => [...prev, newMagasin]);
      toast({
        title: "Magasin ajouté",
        description: "Le nouveau magasin a été créé avec succès.",
      });
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      address: '',
      manager: '',
      isActive: true
    });
    setEditingMagasin(null);
  };

  const handleEdit = (magasin: Magasin) => {
    setEditingMagasin(magasin);
    setFormData({
      code: magasin.code,
      name: magasin.name,
      address: magasin.address || '',
      manager: magasin.manager || '',
      isActive: magasin.isActive
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setMagasinsList(prev => prev.filter(mag => mag.id !== id));
    toast({
      title: "Magasin supprimé",
      description: "Le magasin a été supprimé avec succès.",
    });
  };

  const toggleStatus = (id: string) => {
    setMagasinsList(prev => prev.map(mag => 
      mag.id === id 
        ? { ...mag, isActive: !mag.isActive }
        : mag
    ));
    toast({
      title: "Statut modifié",
      description: "Le statut du magasin a été mis à jour.",
    });
  };

  return (
    <Card>
      <CardHeader className="bg-white flex justify-between items-center">
        <div className="flex items-center">
          <Store className="h-5 w-5 mr-2 text-primary" />
          <CardTitle className="text-lg font-medium">Magasins</CardTitle>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={resetForm}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Ajouter un magasin
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingMagasin ? 'Modifier le magasin' : 'Ajouter un magasin'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Code</label>
                <Input
                  value={formData.code}
                  onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                  placeholder="Code du magasin"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Nom</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nom du magasin"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Adresse</label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Adresse complète"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Responsable</label>
                <Input
                  value={formData.manager}
                  onChange={(e) => setFormData(prev => ({ ...prev, manager: e.target.value }))}
                  placeholder="Nom du responsable"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                />
                <label htmlFor="isActive" className="text-sm font-medium">
                  Magasin actif
                </label>
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button type="submit">
                  {editingMagasin ? 'Modifier' : 'Ajouter'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Adresse</TableHead>
              <TableHead>Responsable</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {magasinsList.map((magasin) => (
              <TableRow key={magasin.id}>
                <TableCell className="font-medium">{magasin.code}</TableCell>
                <TableCell>{magasin.name}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                    {magasin.address}
                  </div>
                </TableCell>
                <TableCell>{magasin.manager}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={`cursor-pointer ${magasin.isActive 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-800' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-800'
                    }`}
                    onClick={() => toggleStatus(magasin.id)}
                  >
                    {magasin.isActive ? 'Actif' : 'Inactif'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEdit(magasin)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(magasin.id)}
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

export default MagasinsList;
