
import React from 'react';

const Header = () => {
  return (
    <header className="py-12 px-4 text-center bg-dark-300">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-redflag animate-fade-in">REDFLAGGED</h1>
        <h2 className="text-xl md:text-2xl text-gray-200 mb-4">Professional Consequences for Unprofessional Conduct</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          The ledger for ghosting, exploitation, and deception in hiring.
          Public, verified, and unapologetically honest.
        </p>
      </div>
    </header>
  );
};

export default Header;
