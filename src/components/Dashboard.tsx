
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatCard from './StatCard';
import BillSummary from './BillSummary';
import RecentActivity from './RecentActivity';
import ChartSection from './ChartSection';
import ClientsList from './ClientsList';
import InvoiceForm from './InvoiceForm';
import { CreditCard, DollarSign, FileText, Package2, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6">Tableau de bord</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard 
              title="Chiffre d'affaires" 
              value="24 780,50 €" 
              description="Mois courant"
              trend={{ value: "+12,5% du mois dernier", positive: true }}
              icon={<DollarSign className="h-5 w-5" />}
            />
            <StatCard 
              title="Factures en attente" 
              value="8" 
              description="Valeur: 12 450,80 €"
              trend={{ value: "-2 du mois dernier", positive: true }}
              icon={<FileText className="h-5 w-5" />}
            />
            <StatCard 
              title="Clients actifs" 
              value="14" 
              description="3 ajoutés ce mois"
              trend={{ value: "+3 du mois dernier", positive: true }}
              icon={<Package2 className="h-5 w-5" />}
            />
            <StatCard 
              title="Délai de paiement moyen" 
              value="3,5 jours" 
              description="Cible: 7 jours"
              trend={{ value: "-0,8 jours du mois dernier", positive: true }}
              icon={<CreditCard className="h-5 w-5" />}
            />
          </div>
          
          <Tabs defaultValue="overview" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-sm text-muted-foreground">
                  Aperçu du système
                </span>
              </div>
              <TabsList>
                <TabsTrigger value="overview">Aperçu</TabsTrigger>
                <TabsTrigger value="invoices">Factures</TabsTrigger>
                <TabsTrigger value="clients">Clients</TabsTrigger>
                <TabsTrigger value="reception">Réception</TabsTrigger>
                <TabsTrigger value="achats">Achats</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <ChartSection />
                
                <div className="lg:col-span-1 space-y-6">
                  <h3 className="text-lg font-medium">Factures récentes</h3>
                  <div className="space-y-4">
                    <BillSummary 
                      billNumber="FAC-2023-004" 
                      clientName="Acme Corporation" 
                      amount="1 250,00 €" 
                      date="28 Avr 2025" 
                      status="pending"
                    />
                    <BillSummary 
                      billNumber="FAC-2023-003" 
                      clientName="Wayne Enterprises" 
                      amount="3 800,50 €" 
                      date="22 Avr 2025" 
                      status="paid"
                    />
                    <BillSummary 
                      billNumber="FAC-2023-002" 
                      clientName="Globex Industries" 
                      amount="750,00 €" 
                      date="15 Avr 2025" 
                      status="overdue"
                    />
                  </div>
                </div>
              </div>
  
              <div className="mt-6">
                <RecentActivity />
              </div>
            </TabsContent>
            
            <TabsContent value="invoices">
              <div className="mt-6">
                <InvoiceForm />
              </div>
            </TabsContent>
            
            <TabsContent value="clients">
              <div className="mt-6">
                <ClientsList />
              </div>
            </TabsContent>
            
            <TabsContent value="reception">
              <div className="mt-6">
                <button 
                  className="px-4 py-2 bg-primary text-primary-foreground rounded"
                  onClick={() => navigate('/bons-reception')}
                >
                  Voir tous les bons de réception
                </button>
              </div>
            </TabsContent>
            
            <TabsContent value="achats">
              <div className="mt-6">
                <button 
                  className="px-4 py-2 bg-primary text-primary-foreground rounded"
                  onClick={() => navigate('/bons-achat')}
                >
                  Voir tous les bons d'achat
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
