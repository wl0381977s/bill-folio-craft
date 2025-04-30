
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Tag, Edit, Trash } from 'lucide-react';
import { Famille } from '@/types';

// Données fictives pour les familles
const familles: Famille[] = [
  { id: '1', code: 'FAM001', name: 'Électronique', description: 'Produits électroniques et accessoires' },
  { id: '2', code: 'FAM002', name: 'Informatique', description: 'Matériel informatique et périphériques' },
  { id: '3', code: 'FAM003', name: 'Mobilier', description: 'Mobilier de bureau et accessoires' },
  { id: '4', code: 'FAM004', name: 'Fournitures', description: 'Fournitures de bureau diverses' },
];

const FamillesList = () => {
  return (
    <Card>
      <CardHeader className="bg-white flex justify-between items-center">
        <div className="flex items-center">
          <Tag className="h-5 w-5 mr-2 text-primary" />
          <CardTitle className="text-lg font-medium">Familles de produits</CardTitle>
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <PlusCircle className="h-4 w-4 mr-2" />
          Ajouter une famille
        </Button>
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

export default FamillesList;
