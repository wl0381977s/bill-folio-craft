
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';

const AuthPage = () => {
  const navigate = useNavigate();

  const handleLogin = (user: { email: string; name: string }) => {
    // Stocker les informations utilisateur dans localStorage
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-theme-blue">BillFolio</h1>
          <p className="text-gray-600 mt-2">Gestion de facturation professionnelle</p>
        </div>
        <AuthForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default AuthPage;
