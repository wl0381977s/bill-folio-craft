
import React from 'react';
import Layout from '@/components/Layout';
import MagasinsList from '@/components/MagasinsList';

const MagasinsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Gestion des magasins</h2>
        <MagasinsList />
      </div>
    </Layout>
  );
};

export default MagasinsPage;
