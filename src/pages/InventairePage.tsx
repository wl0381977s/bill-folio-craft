
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Package, Edit, Save, X, FileText, Download, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';

interface StockItem {
  id: string;
  produit: string;
  code: string;
  magasin: string;
  stockActuel: number;
  stockTheorique: number;
  stockMin: number;
  stockMax: number;
  valeur: number;
  emplacement?: string;
  dateInventaire?: string;
  statut: 'conforme' | 'ecart' | 'a_verifier';
}

const mockStock: StockItem[] = [
  {
    id: '1',
    produit: 'Ordinateur Portable HP',
    code: 'ORD-001',
    magasin: 'Magasin Central',
    stockActuel: 15,
    stockTheorique: 18,
    stockMin: 5,
    stockMax: 50,
    valeur: 75000,
    emplacement: 'A-01-15',
    dateInventaire: '2024-01-20',
    statut: 'ecart'
  },
  {
    id: '2',
    produit: 'Souris Logitech',
    code: 'SOU-001',
    magasin: 'Dépôt Nord',
    stockActuel: 3,
    stockTheorique: 3,
    stockMin: 10,
    stockMax: 100,
    valeur: 1200,
    emplacement: 'B-02-08',
    dateInventaire: '2024-01-20',
    statut: 'conforme'
  },
  {
    id: '3',
    produit: 'Clavier Mécanique',
    code: 'CLA-001',
    magasin: 'Magasin Central',
    stockActuel: 12,
    stockTheorique: 10,
    stockMin: 8,
    stockMax: 30,
    valeur: 8400,
    emplacement: 'A-03-12',
    dateInventaire: '2024-01-21',
    statut: 'ecart'
  }
];

const InventairePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMagasin, setSelectedMagasin] = useState('all');
  const [selectedStatut, setSelectedStatut] = useState('all');
  const [stock, setStock] = useState<StockItem[]>(mockStock);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [tempStock, setTempStock] = useState<number>(0);
  const [isAdjustmentDialogOpen, setIsAdjustmentDialogOpen] = useState(false);
  const [newInventoryDialogOpen, setNewInventoryDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredStock = stock.filter(item => {
    const matchesSearch = item.produit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMagasin = selectedMagasin === 'all' || item.magasin === selectedMagasin;
    const matchesStatut = selectedStatut === 'all' || item.statut === selectedStatut;
    return matchesSearch && matchesMagasin && matchesStatut;
  });

  const getStockStatus = (item: StockItem) => {
    if (item.statut === 'ecart') {
      return { color: 'bg-red-100 text-red-800', label: 'Écart détecté' };
    }
    if (item.statut === 'a_verifier') {
      return { color: 'bg-yellow-100 text-yellow-800', label: 'À vérifier' };
    }
    if (item.stockActuel <= item.stockMin) {
      return { color: 'bg-orange-100 text-orange-800', label: 'Stock faible' };
    }
    return { color: 'bg-green-100 text-green-800', label: 'Conforme' };
  };

  const handleStockEdit = (itemId: string, newStock: number) => {
    setStock(prev => prev.map(item => {
      if (item.id === itemId) {
        const updatedItem = { 
          ...item, 
          stockActuel: newStock,
          statut: newStock === item.stockTheorique ? 'conforme' as const : 'ecart' as const
        };
        return updatedItem;
      }
      return item;
    }));
    setEditingItem(null);
    toast({
      title: "Stock mis à jour",
      description: "Le stock a été ajusté avec succès.",
    });
  };

  const startNewInventory = () => {
    toast({
      title: "Nouvel inventaire lancé",
      description: "Un nouvel inventaire a été créé pour tous les produits.",
    });
    setNewInventoryDialogOpen(false);
  };

  const exportInventory = () => {
    toast({
      title: "Export en cours",
      description: "L'inventaire est en cours d'export au format Excel.",
    });
  };

  const totalEcarts = stock.filter(item => item.statut === 'ecart').length;
  const totalValue = stock.reduce((sum, item) => sum + (item.stockActuel * item.valeur / item.stockActuel), 0);
  const totalItems = stock.length;

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Inventaire</h1>
          <div className="flex gap-2">
            <Dialog open={newInventoryDialogOpen} onOpenChange={setNewInventoryDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Nouvel Inventaire
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Créer un nouvel inventaire</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Magasin</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un magasin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les magasins</SelectItem>
                        <SelectItem value="central">Magasin Central</SelectItem>
                        <SelectItem value="nord">Dépôt Nord</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Type d'inventaire</label>
                    <Select defaultValue="complet">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="complet">Inventaire complet</SelectItem>
                        <SelectItem value="partiel">Inventaire partiel</SelectItem>
                        <SelectItem value="tournant">Inventaire tournant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setNewInventoryDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={startNewInventory}>
                      Créer l'inventaire
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button onClick={exportInventory} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Dialog open={isAdjustmentDialogOpen} onOpenChange={setIsAdjustmentDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-theme-blue hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajustement Stock
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajustement de stock</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Produit</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un produit" />
                      </SelectTrigger>
                      <SelectContent>
                        {stock.map(item => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.produit} ({item.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Nouvelle quantité</label>
                    <Input type="number" placeholder="Entrer la quantité" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Motif</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un motif" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inventaire">Ajustement inventaire</SelectItem>
                        <SelectItem value="perte">Perte/Vol</SelectItem>
                        <SelectItem value="deterioration">Détérioration</SelectItem>
                        <SelectItem value="erreur">Correction d'erreur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAdjustmentDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={() => setIsAdjustmentDialogOpen(false)}>
                      Valider l'ajustement
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-theme-blue" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Produits</p>
                  <p className="text-2xl font-bold">{totalItems}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Écarts Détectés</p>
                  <p className="text-2xl font-bold text-red-600">{totalEcarts}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Conformes</p>
                  <p className="text-2xl font-bold text-green-600">
                    {stock.filter(item => item.statut === 'conforme').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Valeur Stock</p>
                  <p className="text-2xl font-bold">
                    {totalValue.toLocaleString('fr-FR')} DA
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>État des Stocks</CardTitle>
            <div className="flex gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedMagasin} onValueChange={setSelectedMagasin}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Magasin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les magasins</SelectItem>
                  <SelectItem value="Magasin Central">Magasin Central</SelectItem>
                  <SelectItem value="Dépôt Nord">Dépôt Nord</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatut} onValueChange={setSelectedStatut}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="conforme">Conforme</SelectItem>
                  <SelectItem value="ecart">Écart détecté</SelectItem>
                  <SelectItem value="a_verifier">À vérifier</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Magasin</TableHead>
                  <TableHead>Emplacement</TableHead>
                  <TableHead>Stock Théorique</TableHead>
                  <TableHead>Stock Réel</TableHead>
                  <TableHead>Écart</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStock.map((item) => {
                  const status = getStockStatus(item);
                  const ecart = item.stockActuel - item.stockTheorique;
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.produit}</TableCell>
                      <TableCell>{item.code}</TableCell>
                      <TableCell>{item.magasin}</TableCell>
                      <TableCell>{item.emplacement}</TableCell>
                      <TableCell>{item.stockTheorique}</TableCell>
                      <TableCell>
                        {editingItem === item.id ? (
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={tempStock}
                              onChange={(e) => setTempStock(Number(e.target.value))}
                              className="w-20"
                            />
                            <Button
                              size="sm"
                              onClick={() => handleStockEdit(item.id, tempStock)}
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingItem(null)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <span 
                            className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                            onClick={() => {
                              setEditingItem(item.id);
                              setTempStock(item.stockActuel);
                            }}
                          >
                            {item.stockActuel}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className={ecart !== 0 ? (ecart > 0 ? 'text-green-600' : 'text-red-600') : ''}>
                          {ecart > 0 ? '+' : ''}{ecart}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={status.color} variant="outline">
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingItem(item.id);
                            setTempStock(item.stockActuel);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default InventairePage;
