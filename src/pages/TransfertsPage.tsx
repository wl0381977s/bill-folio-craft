
import React from 'react';
import Layout from '@/components/Layout';
import TransfertsStock from '@/components/TransfertsStock';

const TransfertsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Transferts de stock</h2>
        <TransfertsStock />
      </div>
    </Layout>
  );
};

export default TransfertsPage;
