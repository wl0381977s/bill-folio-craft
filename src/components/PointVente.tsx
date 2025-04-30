
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Search, Trash, Plus, Minus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
}

// Données fictives pour les produits
const products: Product[] = [
  { id: 'P001', name: 'Smartphone XYZ', price: 599.99, category: 'Électronique', stock: 15 },
  { id: 'P002', name: 'Laptop ABC', price: 899.99, category: 'Informatique', stock: 10 },
  { id: 'P003', name: 'Casque audio', price: 99.99, category: 'Électronique', stock: 20 },
  { id: 'P004', name: 'Souris sans fil', price: 29.99, category: 'Informatique', stock: 30 },
  { id: 'P005', name: 'Clavier mécanique', price: 89.99, category: 'Informatique', stock: 12 },
  { id: 'P006', name: 'Écran 24"', price: 199.99, category: 'Informatique', stock: 8 },
  { id: 'P007', name: 'Tablette 10"', price: 349.99, category: 'Électronique', stock: 5 },
  { id: 'P008', name: 'Chaise de bureau', price: 149.99, category: 'Mobilier', stock: 7 }
];

// Catégories de produits
const categories = ['Tous', 'Électronique', 'Informatique', 'Mobilier'];

const PointVente = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Tous' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { 
          id: product.id, 
          name: product.name, 
          price: product.price, 
          quantity: 1 
        }];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };
  
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="mb-6">
          <CardHeader className="bg-white flex justify-between items-center">
            <div className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2 text-primary" />
              <CardTitle className="text-lg font-medium">Point de Vente</CardTitle>
            </div>
            <div className="flex items-center gap-2 w-64">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher un produit..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="h-8"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="Tous" onValueChange={setActiveCategory}>
              <TabsList className="mb-4">
                {categories.map(category => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                  <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => addToCart(product)}>
                    <CardContent className="p-4">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground mt-1">{product.price.toFixed(2)} €</div>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="outline">{product.category}</Badge>
                        <div className="text-xs text-muted-foreground">
                          Stock: {product.stock}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardHeader className="bg-white">
            <CardTitle className="text-lg font-medium">Panier</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {cart.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                Le panier est vide
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produit</TableHead>
                    <TableHead>Qté</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0" 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus size={14} />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0" 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{(item.price * item.quantity).toFixed(2)} €</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash size={14} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            
            <div className="p-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total :</span>
                <span className="font-bold text-lg">{cartTotal.toFixed(2)} €</span>
              </div>
              
              <Button className="w-full bg-primary hover:bg-primary/90" disabled={cart.length === 0}>
                Valider la vente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PointVente;
