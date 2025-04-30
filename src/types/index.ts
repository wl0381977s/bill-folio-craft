
export type TierType = 'client' | 'fournisseur';

export interface Tier {
  id: string;
  code: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  type: TierType;
  status: 'active' | 'inactive';
  outstandingAmount?: number;
  initials: string;
  createdAt: Date;
}

export interface Famille {
  id: string;
  code: string;
  name: string;
  description?: string;
}

export interface SousFamille {
  id: string;
  code: string;
  name: string;
  description?: string;
  familleId: string;
}

export interface Magasin {
  id: string;
  code: string;
  name: string;
  address?: string;
  manager?: string;
  isActive: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  magasinsId: string[];
}

export interface Produit {
  id: string;
  code: string;
  name: string;
  description?: string;
  familleId: string;
  sousFamilleId?: string;
  prixAchat: number;
  prixVente: number;
  stockMin: number;
  stockMax: number;
}

export interface StockMagasin {
  produitId: string;
  magasinId: string;
  quantite: number;
}

export interface Transfert {
  id: string;
  date: Date;
  fromMagasinId: string;
  toMagasinId: string;
  status: 'pending' | 'completed' | 'cancelled';
  items: TransfertItem[];
}

export interface TransfertItem {
  produitId: string;
  quantite: number;
}
