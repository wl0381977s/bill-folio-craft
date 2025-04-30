
import React from 'react';
import Layout from '@/components/Layout';
import SousFamillesList from '@/components/SousFamillesList';

const SousFamillesPage = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Gestion des sous-familles</h2>
        <SousFamillesList />
      </div>
    </Layout>
  );
};

export default SousFamillesPage;
