
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Store, Edit, Trash } from 'lucide-react';
import { Magasin } from '@/types';

// Données fictives pour les magasins
const magasins: Magasin[] = [
  { id: '1', code: 'MAG001', name: 'Magasin Central', address: '123 Rue Principale, Paris', manager: 'Jean Dupont', isActive: true },
  { id: '2', code: 'MAG002', name: 'Dépôt Nord', address: '45 Avenue du Nord, Lille', manager: 'Marie Martin', isActive: true },
  { id: '3', code: 'MAG003', name: 'Dépôt Sud', address: '78 Boulevard du Sud, Marseille', manager: 'Pierre Durand', isActive: true },
  { id: '4', code: 'MAG004', name: 'Entrepôt Est', address: '12 Rue de l\'Est, Strasbourg', manager: 'Sophie Bernard', isActive: false },
];

const MagasinsList = () => {
  return (
    <Card>
      <CardHeader className="bg-white flex justify-between items-center">
        <div className="flex items-center">
          <Store className="h-5 w-5 mr-2 text-primary" />
          <CardTitle className="text-lg font-medium">Magasins</CardTitle>
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <PlusCircle className="h-4 w-4 mr-2" />
          Ajouter un magasin
        </Button>
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
            {magasins.map((magasin) => (
              <TableRow key={magasin.id}>
                <TableCell className="font-medium">{magasin.code}</TableCell>
                <TableCell>{magasin.name}</TableCell>
                <TableCell>{magasin.address}</TableCell>
                <TableCell>{magasin.manager}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={magasin.isActive 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-800' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-800'
                    }
                  >
                    {magasin.isActive ? 'Actif' : 'Inactif'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
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
