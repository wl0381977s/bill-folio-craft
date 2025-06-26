
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, SlidersHorizontal, ShoppingCart, FilterX, Filter, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Slider
} from "@/components/ui/slider";

// Mock data with store associations
const products = [
  {
    id: '1',
    name: 'Ordinateur portable Pro',
    price: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    category: 'Informatique',
    stock: 15,
    reference: 'LAPTOP-001',
    magasins: [
      { nom: 'Magasin Central', stock: 8 },
      { nom: 'Dépôt Nord', stock: 5 },
      { nom: 'Dépôt Sud', stock: 2 }
    ]
  },
  {
    id: '2',
    name: 'Smartphone XL',
    price: 899.99,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    category: 'Téléphonie',
    stock: 8,
    reference: 'PHONE-002',
    magasins: [
      { nom: 'Magasin Central', stock: 6 },
      { nom: 'Dépôt Nord', stock: 2 }
    ]
  },
  {
    id: '3',
    name: 'Écouteurs sans fil',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZWFyYnVkc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    category: 'Audio',
    stock: 4,
    reference: 'AUDIO-003',
    magasins: [
      { nom: 'Magasin Central', stock: 4 }
    ]
  },
  {
    id: '4',
    name: 'Montre connectée',
    price: 249.99,
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    category: 'Accessoires',
    stock: 12,
    reference: 'WATCH-004',
    magasins: [
      { nom: 'Magasin Central', stock: 7 },
      { nom: 'Dépôt Sud', stock: 5 }
    ]
  },
  {
    id: '5',
    name: 'Caméra de surveillance',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2VjdXJpdHklMjBjYW1lcmF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    category: 'Sécurité',
    stock: 3,
    reference: 'SECU-005',
    magasins: [
      { nom: 'Dépôt Nord', stock: 3 }
    ]
  },
  {
    id: '6',
    name: 'Imprimante Laser',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJpbnRlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    category: 'Informatique',
    stock: 7,
    reference: 'PRINT-006',
    magasins: [
      { nom: 'Magasin Central', stock: 4 },
      { nom: 'Dépôt Sud', stock: 3 }
    ]
  },
];

const ProduitsListePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMagasin, setSelectedMagasin] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [stockFilter, setStockFilter] = useState('all');
  const [activeFilters, setActiveFilters] = useState(0);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesMagasin = selectedMagasin === 'all' || 
                          product.magasins.some(mag => mag.nom === selectedMagasin);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesStock = stockFilter === 'all' || 
                         (stockFilter === 'inStock' && product.stock > 5) ||
                         (stockFilter === 'lowStock' && product.stock <= 5);

    return matchesSearch && matchesCategory && matchesMagasin && matchesPrice && matchesStock;
  });

  const categories = ['all', ...new Set(products.map(product => product.category))];
  const magasins = ['all', ...new Set(products.flatMap(product => product.magasins.map(mag => mag.nom)))];

  // Calculate active filters
  React.useEffect(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (selectedMagasin !== 'all') count++;
    if (stockFilter !== 'all') count++;
    if (priceRange[0] > 0 || priceRange[1] < 1500) count++;
    setActiveFilters(count);
  }, [selectedCategory, selectedMagasin, stockFilter, priceRange]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedMagasin('all');
    setStockFilter('all');
    setPriceRange([0, 1500]);
  };

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h2 className="text-2xl font-bold mb-6">Liste des produits</h2>

        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Rechercher un produit..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'Toutes les catégories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Select
                value={selectedMagasin}
                onValueChange={setSelectedMagasin}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Magasin" />
                </SelectTrigger>
                <SelectContent>
                  {magasins.map(magasin => (
                    <SelectItem key={magasin} value={magasin}>
                      {magasin === 'all' ? 'Tous les magasins' : magasin}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="md:w-auto relative">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtres
                  {activeFilters > 0 && (
                    <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                      {activeFilters}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium mb-2 flex items-center justify-between">
                    Filtres avancés
                    <Button onClick={resetFilters} variant="ghost" size="sm" className="h-8 flex items-center">
                      <FilterX className="h-4 w-4 mr-2" />
                      Réinitialiser
                    </Button>
                  </h4>

                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Prix</h5>
                    <Slider
                      defaultValue={[0, 1500]}
                      max={1500}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mt-2"
                    />
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs">{priceRange[0]} €</span>
                      <span className="text-xs">{priceRange[1]} €</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">État du stock</h5>
                    <Select
                      value={stockFilter}
                      onValueChange={setStockFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="État du stock" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les produits</SelectItem>
                        <SelectItem value="inStock">En stock</SelectItem>
                        <SelectItem value="lowStock">Stock bas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Tabs defaultValue="grid">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} produits trouvés
              </span>
            </div>
            <TabsList>
              <TabsTrigger value="grid">Grille</TabsTrigger>
              <TabsTrigger value="list">Liste</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="grid" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm border p-4">
                  <div className="aspect-square w-full mb-3 relative">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                  <h3 className="font-medium text-sm mb-2">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{product.reference}</p>
                  <Badge variant="outline" className="mb-2">{product.category}</Badge>
                  
                  <div className="mb-3">
                    <p className="text-xs font-medium mb-1 flex items-center">
                      <Store className="h-3 w-3 mr-1" />
                      Disponible dans:
                    </p>
                    <div className="space-y-1">
                      {product.magasins.map((magasin, index) => (
                        <div key={index} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{magasin.nom}</span>
                          <span className={magasin.stock <= 5 ? "text-red-500 font-medium" : ""}>
                            {magasin.stock} unités
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold">{product.price.toFixed(2)} €</span>
                    <span className={`text-sm ${product.stock <= 5 ? "text-red-500 font-medium" : ""}`}>
                      Total: {product.stock}
                    </span>
                  </div>
                  
                  <Button size="sm" className="w-full">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="mt-0">
            <div className="bg-white rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Image</th>
                    <th className="text-left p-4">Nom</th>
                    <th className="text-left p-4">Référence</th>
                    <th className="text-left p-4">Catégorie</th>
                    <th className="text-left p-4">Magasins</th>
                    <th className="text-left p-4">Stock Total</th>
                    <th className="text-left p-4">Prix</th>
                    <th className="text-left p-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="w-12 h-12 relative">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="object-cover w-full h-full rounded-md"
                          />
                        </div>
                      </td>
                      <td className="p-4 font-medium">{product.name}</td>
                      <td className="p-4 text-sm text-muted-foreground">{product.reference}</td>
                      <td className="p-4">
                        <Badge variant="outline">{product.category}</Badge>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          {product.magasins.map((magasin, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs">
                              <Store className="h-3 w-3" />
                              <span>{magasin.nom}</span>
                              <Badge variant="secondary" className="text-xs">
                                {magasin.stock}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={product.stock <= 5 ? "text-red-500 font-medium" : ""}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="p-4 font-medium">{product.price.toFixed(2)} €</td>
                      <td className="p-4">
                        <Button size="sm" variant="outline">
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProduitsListePage;
