
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BonsReception from "./pages/BonsReception";
import BonsAchat from "./pages/BonsAchat";
import TiersPage from "./pages/TiersPage";
import TiersAddPage from "./pages/TiersAddPage";
import FamillesPage from "./pages/FamillesPage";
import SousFamillesPage from "./pages/SousFamillesPage";
import MagasinsPage from "./pages/MagasinsPage";
import POSPage from "./pages/POSPage";
import TransfertsPage from "./pages/TransfertsPage";
import ProduitsListePage from "./pages/ProduitsListePage";
import CreateInvoicePage from "./pages/CreateInvoicePage";
import InvoicesListePage from "./pages/InvoicesListePage";
import AchatsCommandesPage from "./pages/AchatsCommandesPage";
import InventairePage from "./pages/InventairePage";
import StockAlertesPage from "./pages/StockAlertesPage";
import ParametresPage from "./pages/ParametresPage";
import BudgetPage from "./pages/BudgetPage";
import NouveauBonPage from "./pages/NouveauBonPage";
import NouvelleFaturePage from "./pages/NouvelleFaturePage";
import CommandesClientsPage from "./pages/CommandesClientsPage";
import BonsLivraisonPage from "./pages/BonsLivraisonPage";
import BonsSortiePage from "./pages/BonsSortiePage";
import FacturesFournisseursPage from "./pages/FacturesFournisseursPage";
import ComptabilitePage from "./pages/ComptabilitePage";
import TresoreriePage from "./pages/TresoreriePage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/bons-reception" element={<BonsReception />} />
          <Route path="/bons-achat" element={<BonsAchat />} />
          <Route path="/tiers/clients" element={<TiersPage />} />
          <Route path="/tiers/fournisseurs" element={<TiersPage />} />
          <Route path="/tiers/ajouter" element={<TiersAddPage />} />
          <Route path="/produits/familles" element={<FamillesPage />} />
          <Route path="/produits/sous-familles" element={<SousFamillesPage />} />
          <Route path="/produits/liste" element={<ProduitsListePage />} />
          <Route path="/magasins" element={<MagasinsPage />} />
          <Route path="/pos" element={<POSPage />} />
          <Route path="/stock/transferts" element={<TransfertsPage />} />
          <Route path="/stock/inventaire" element={<InventairePage />} />
          <Route path="/stock/alertes" element={<StockAlertesPage />} />
          <Route path="/facturation/creer" element={<CreateInvoicePage />} />
          <Route path="/facturation/nouvelle" element={<NouvelleFaturePage />} />
          <Route path="/facturation/liste" element={<InvoicesListePage />} />
          <Route path="/achats/commandes" element={<AchatsCommandesPage />} />
          <Route path="/achats/nouveau-bon" element={<NouveauBonPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/parametres" element={<ParametresPage />} />
          
          {/* Nouvelles pages pour les ventes */}
          <Route path="/ventes/commandes" element={<CommandesClientsPage />} />
          <Route path="/ventes/livraisons" element={<BonsLivraisonPage />} />
          <Route path="/ventes/sorties" element={<BonsSortiePage />} />
          
          {/* Pages pour les factures fournisseurs */}
          <Route path="/achats/factures" element={<FacturesFournisseursPage />} />
          
          {/* Pages comptabilité et trésorerie */}
          <Route path="/comptabilite" element={<ComptabilitePage />} />
          <Route path="/tresorerie" element={<TresoreriePage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
