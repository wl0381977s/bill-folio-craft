
import React from 'react';
import Layout from '@/components/Layout';
import PointVente from '@/components/PointVente';

const POSPage = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Point de Vente</h2>
        <PointVente />
      </div>
    </Layout>
  );
};

export default POSPage;
