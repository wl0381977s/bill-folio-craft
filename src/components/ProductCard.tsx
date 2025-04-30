
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tag, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  reference: string;
}

const ProductCard = ({
  id,
  name,
  price,
  imageUrl,
  category,
  stock,
  reference
}: ProductCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        {stock <= 5 && (
          <Badge 
            variant="outline" 
            className="absolute top-2 right-2 bg-red-100 text-red-800 border-red-200"
          >
            Stock bas
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2 pt-4">
        <div className="flex justify-between">
          <h3 className="font-medium text-sm">{name}</h3>
          <span className="font-bold text-sm">{price.toFixed(2)} €</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Tag className="h-3 w-3 mr-1" /> 
          <span>{category}</span>
        </div>
      </CardHeader>
      <CardContent className="py-1">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Réf: {reference}</span>
          <span className="text-xs">Stock: {stock} unités</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2 pb-4">
        <Button size="sm" variant="outline" className="w-full">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Ajouter au panier
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
