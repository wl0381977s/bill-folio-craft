
import React from 'react';
import Layout from '@/components/Layout';
import TiersList from '@/components/TiersList';

const TiersPage = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Gestion des tiers</h2>
        <TiersList />
      </div>
    </Layout>
  );
};

export default TiersPage;
