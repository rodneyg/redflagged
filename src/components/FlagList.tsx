
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldAlert, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface Flag {
  id: number;
  company: string;
  role: string;
  description: string;
  tags: string[];
  date: string;
  timestamp: Date; // Added for sorting
  views: number;
  website?: string;
}

const sampleFlags: Flag[] = [
  {
    id: 1,
    company: "Felt",
    role: "Software Engineer",
    description: "Ghosted after submitting final round code. Interviewer said no one else solved their challenge.",
    tags: ["Ghosting", "Unpaid Challenge"],
    date: "March 2024",
    timestamp: new Date(2024, 2, 15), // March 15, 2024
    views: 1284,
    website: "https://felt.com"
  },
  {
    id: 2,
    company: "Acme Corp",
    role: "UX Designer",
    description: "Received unpaid take-home project. Spent 12 hours designing and coding a prototype. Never received feedback despite follow-up emails.",
    tags: ["Unpaid Challenge", "Ghosting"],
    date: "February 2024",
    timestamp: new Date(2024, 1, 10), // February 10, 2024
    views: 723,
    website: "https://acme.com"
  },
  {
    id: 3,
    company: "TechForward",
    role: "Product Manager",
    description: "Role was advertised as remote-friendly. After 4 interviews, was told it's actually required to be in-office 5 days a week in a different state.",
    tags: ["Misleading Role"],
    date: "January 2024",
    timestamp: new Date(2024, 0, 5), // January 5, 2024
    views: 946,
    website: "https://techforward.io"
  },
  {
    id: 4,
    company: "Growth Capital",
    role: "Financial Analyst",
    description: "Signed offer letter, gave notice at current job. Offer was rescinded 3 days before start date citing 'changing business needs'.",
    tags: ["Offer Revoked"],
    date: "February 2024",
    timestamp: new Date(2024, 1, 25), // February 25, 2024
    views: 1576,
    website: "https://growthcapital.com"
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
  timeSort?: string;
}

const FlagList = ({ searchQuery = '', filterType = 'all', timeSort = 'all' }: FlagListProps) => {
  // Filter by search query and tag
  let filteredFlags = sampleFlags.filter(flag => {
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

  // Apply time filtering
  const now = new Date();
  filteredFlags = filteredFlags.filter(flag => {
    switch(timeSort) {
      case 'now':
        // Last hour
        return (now.getTime() - flag.timestamp.getTime()) < 60 * 60 * 1000;
      case 'today':
        // Last 24 hours
        return (now.getTime() - flag.timestamp.getTime()) < 24 * 60 * 60 * 1000;
      case 'week':
        // Last 7 days
        return (now.getTime() - flag.timestamp.getTime()) < 7 * 24 * 60 * 60 * 1000;
      case 'month':
        // Last 30 days
        return (now.getTime() - flag.timestamp.getTime()) < 30 * 24 * 60 * 60 * 1000;
      case 'year':
        // Last 365 days
        return (now.getTime() - flag.timestamp.getTime()) < 365 * 24 * 60 * 60 * 1000;
      case 'all':
      default:
        return true;
    }
  });

  // Sort by most recent first
  filteredFlags.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

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
              <Link 
                to={`/flag/${flag.id}`} 
                key={flag.id}
                className="block border-b border-gray-800 p-4 hover:bg-dark-300 transition-colors"
              >
                <div className="flex flex-wrap items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">
                    {flag.company} – <span className="text-gray-300">{flag.role}</span>
                  </h3>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(flag.timestamp, { addSuffix: true })}
                  </span>
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
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </div>
  );
};

export default FlagList;
