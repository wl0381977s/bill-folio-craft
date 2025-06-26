
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  FileText, 
  ShoppingCart, 
  Package2, 
  Tag, 
  Settings,
  Store,
  Calculator,
  CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';
import MultiLevelMenu from './MultiLevelMenu';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      id: 'dashboard',
      title: 'Tableau de bord',
      path: '/',
      icon: <Home size={18} />,
    },
    {
      id: 'tiers',
      title: 'Tiers',
      icon: <Users size={18} />,
      children: [
        { id: 'clients', title: 'Clients', path: '/tiers/clients' },
        { id: 'fournisseurs', title: 'Fournisseurs', path: '/tiers/fournisseurs' },
        { id: 'ajouter-tier', title: 'Ajouter un tier', path: '/tiers/ajouter' }
      ]
    },
    {
      id: 'ventes',
      title: 'Ventes',
      icon: <ShoppingCart size={18} />,
      children: [
        { id: 'commandes-clients', title: 'Commandes clients', path: '/ventes/commandes' },
        { id: 'bons-livraison', title: 'Bons de livraison', path: '/ventes/livraisons' },
        { id: 'bons-sortie', title: 'Bons de sortie', path: '/ventes/sorties' }
      ]
    },
    {
      id: 'facturation',
      title: 'Facturation',
      icon: <FileText size={18} />,
      children: [
        { id: 'create-invoice', title: 'Créer une facture', path: '/facturation/creer' },
        { id: 'invoices-list', title: 'Liste des factures', path: '/facturation/liste' }
      ]
    },
    {
      id: 'achats',
      title: 'Achats',
      icon: <ShoppingCart size={18} />,
      children: [
        { id: 'bons-achat', title: 'Bons d\'achat', path: '/bons-achat' },
        { id: 'commandes-fournisseurs', title: 'Commandes fournisseurs', path: '/achats/commandes' },
        { id: 'factures-fournisseurs', title: 'Factures fournisseurs', path: '/achats/factures' }
      ]
    },
    {
      id: 'stock',
      title: 'Stock',
      icon: <Package2 size={18} />,
      children: [
        { id: 'bons-reception', title: 'Bons de réception', path: '/bons-reception' },
        { id: 'inventaire', title: 'Inventaire', path: '/stock/inventaire' },
        { id: 'transferts', title: 'Transferts', path: '/stock/transferts' },
        { id: 'stock-alerte', title: 'Stock d\'alerte', path: '/stock/alertes' }
      ]
    },
    {
      id: 'produits',
      title: 'Produits',
      icon: <Tag size={18} />,
      children: [
        { id: 'familles', title: 'Familles', path: '/produits/familles' },
        { id: 'sous-familles', title: 'Sous-familles', path: '/produits/sous-familles' },
        { id: 'liste-produits', title: 'Liste des produits', path: '/produits/liste' }
      ]
    },
    {
      id: 'comptabilite',
      title: 'Comptabilité',
      icon: <Calculator size={18} />,
      path: '/comptabilite'
    },
    {
      id: 'tresorerie',
      title: 'Trésorerie',
      icon: <CreditCard size={18} />,
      path: '/tresorerie'
    },
    {
      id: 'magasins',
      title: 'Magasins',
      icon: <Store size={18} />,
      path: '/magasins'
    },
    {
      id: 'pos',
      title: 'Point de Vente',
      icon: <ShoppingCart size={18} />,
      path: '/pos'
    },
    {
      id: 'parametres',
      title: 'Paramètres',
      icon: <Settings size={18} />,
      path: '/parametres'
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 h-[calc(100vh-64px-56px)]">
      <MultiLevelMenu items={menuItems} />
    </aside>
  );
};

export default Sidebar;
