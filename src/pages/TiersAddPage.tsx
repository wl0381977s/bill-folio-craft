
import React from 'react';
import Layout from '@/components/Layout';
import TiersForm from '@/components/TiersForm';

const TiersAddPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h2 className="text-2xl font-bold mb-6">Ajouter un tier</h2>
        <TiersForm />
      </div>
    </Layout>
  );
};

export default TiersAddPage;
