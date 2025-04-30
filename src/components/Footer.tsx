
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          &copy; {currentYear} BillFolio - Tous droits réservés
        </div>
        <div className="text-sm text-gray-600">
          Version 1.0
        </div>
      </div>
    </footer>
  );
};

export default Footer;
