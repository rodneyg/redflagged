
import React, { useState } from 'react';
import Header from '@/components/Header';
import FlagList from '@/components/FlagList';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Feed = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

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

        <div className="max-w-3xl mx-auto mb-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search by company or role..."
                className="pl-10 bg-dark-100 border-gray-700 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select 
              value={filterType} 
              onValueChange={setFilterType}
            >
              <SelectTrigger className="w-full sm:w-48 bg-dark-100 border-gray-700 text-white">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent className="bg-dark-100 border-gray-700 text-white">
                <SelectItem value="all">All Violations</SelectItem>
                <SelectItem value="ghosting">Ghosting</SelectItem>
                <SelectItem value="unpaid">Unpaid Challenge</SelectItem>
                <SelectItem value="misleading">Misleading Role</SelectItem>
                <SelectItem value="revoked">Offer Revoked</SelectItem>
                <SelectItem value="disrespectful">Disrespectful Behavior</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <FlagList searchQuery={searchQuery} filterType={filterType} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Feed;
