
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
          <Route path="/facturation/creer" element={<CreateInvoicePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
