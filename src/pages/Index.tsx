
import React from 'react';
import Header from '@/components/Header';
import FlagList from '@/components/FlagList';
import FlagForm from '@/components/FlagForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark-500">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <FlagList />
        <FlagForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
