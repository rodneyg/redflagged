
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6 text-center border-t border-gray-800">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-gray-500 mb-4">
          Your story is power. Your receipts are protection. Your honesty builds the ledger.
        </p>
        <div className="flex justify-center space-x-6 text-sm text-gray-600">
          <a href="#" className="hover:text-redflag transition-colors">About</a>
          <a href="#" className="hover:text-redflag transition-colors">Terms</a>
          <a href="#" className="hover:text-redflag transition-colors">Privacy</a>
          <a href="#" className="hover:text-redflag transition-colors">Contact</a>
        </div>
        <p className="text-xs text-gray-700 mt-6">
          © {new Date().getFullYear()} Redflagged. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
