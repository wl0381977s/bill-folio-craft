
import React from 'react';
import Layout from '@/components/Layout';
import FamillesList from '@/components/FamillesList';

const FamillesPage = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Gestion des familles</h2>
        <FamillesList />
      </div>
    </Layout>
  );
};

export default FamillesPage;
