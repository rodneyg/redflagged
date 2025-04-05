
import React from 'react';
import Header from '@/components/Header';
import FlagList from '@/components/FlagList';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

const Feed = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark-500">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-3xl mx-auto mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Recent Redflags</h2>
          <Button className="bg-redflag hover:bg-redflag-dark" asChild>
            <Link to="/submit">
              <PlusCircle className="mr-2 h-4 w-4" />
              Submit Redflag
            </Link>
          </Button>
        </div>
        <FlagList />
      </main>
      
      <Footer />
    </div>
  );
};

export default Feed;
