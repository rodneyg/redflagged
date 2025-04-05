
import React from 'react';
import Header from '@/components/Header';
import FlagForm from '@/components/FlagForm';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Submit = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark-500">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-3xl mx-auto mb-6">
          <Button 
            variant="outline" 
            className="border-gray-700 text-white hover:bg-dark-100 mb-4" 
            asChild
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Feed
            </Link>
          </Button>
          <FlagForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Submit;
