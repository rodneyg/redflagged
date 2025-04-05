
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldAlert, Eye } from "lucide-react";

interface Flag {
  id: number;
  company: string;
  role: string;
  description: string;
  tags: string[];
  date: string;
  views: number;
}

const sampleFlags: Flag[] = [
  {
    id: 1,
    company: "Felt",
    role: "Software Engineer",
    description: "Ghosted after submitting final round code. Interviewer said no one else solved their challenge.",
    tags: ["Ghosting", "Unpaid Challenge"],
    date: "March 2024",
    views: 1284
  },
  {
    id: 2,
    company: "Acme Corp",
    role: "UX Designer",
    description: "Received unpaid take-home project. Spent 12 hours designing and coding a prototype. Never received feedback despite follow-up emails.",
    tags: ["Unpaid Challenge", "Ghosting"],
    date: "February 2024",
    views: 723
  },
  {
    id: 3,
    company: "TechForward",
    role: "Product Manager",
    description: "Role was advertised as remote-friendly. After 4 interviews, was told it's actually required to be in-office 5 days a week in a different state.",
    tags: ["Misleading Role"],
    date: "January 2024",
    views: 946
  },
  {
    id: 4,
    company: "Growth Capital",
    role: "Financial Analyst",
    description: "Signed offer letter, gave notice at current job. Offer was rescinded 3 days before start date citing 'changing business needs'.",
    tags: ["Offer Revoked"],
    date: "February 2024",
    views: 1576
  }
];

const getTagClassName = (tag: string): string => {
  switch(tag.toLowerCase()) {
    case 'ghosting':
      return 'flag-tag ghosting';
    case 'unpaid challenge':
      return 'flag-tag unpaid';
    case 'misleading role':
      return 'flag-tag misleading';
    case 'offer revoked':
      return 'flag-tag revoked';
    case 'disrespectful behavior':
      return 'flag-tag disrespectful';
    default:
      return 'flag-tag';
  }
};

interface FlagListProps {
  searchQuery?: string;
  filterType?: string;
}

const FlagList = ({ searchQuery = '', filterType = 'all' }: FlagListProps) => {
  const filteredFlags = sampleFlags.filter(flag => {
    // Apply search filter
    const matchesSearch = 
      searchQuery === '' || 
      flag.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flag.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flag.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply tag filter
    const matchesTag = 
      filterType === 'all' || 
      flag.tags.some(tag => tag.toLowerCase().includes(filterType.toLowerCase()));
    
    return matchesSearch && matchesTag;
  });

  return (
    <div className="container-card mb-10">
      <CardContent className="p-0">
        <Alert className="mb-4 bg-dark-300 border border-redflag/20 text-white">
          <ShieldAlert className="h-4 w-4 text-redflag" />
          <AlertDescription>
            All reports are verified before publication. Redflagged has a zero-tolerance policy on false or malicious submissions.
          </AlertDescription>
        </Alert>
        
        {filteredFlags.length === 0 ? (
          <div className="bg-dark-400 rounded-lg p-8 text-center text-gray-400">
            No redflags found matching your criteria.
          </div>
        ) : (
          <div className="bg-dark-400 rounded-lg overflow-hidden">
            {filteredFlags.map((flag) => (
              <div key={flag.id} className="border-b border-gray-800 p-4 hover:bg-dark-300 transition-colors">
                <div className="flex flex-wrap items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">
                    {flag.company} – <span className="text-gray-300">{flag.role}</span>
                  </h3>
                  <span className="text-xs text-gray-500">{flag.date}</span>
                </div>
                <p className="text-gray-300 mb-3">{flag.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    {flag.tags.map((tag, index) => (
                      <span key={index} className={getTagClassName(tag)}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Eye className="h-3 w-3 mr-1" />
                    {flag.views.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </div>
  );
};

export default FlagList;
