
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building, Calendar, Globe, Eye, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { formatDistanceToNow } from 'date-fns';
import ReportDialog from '@/components/ReportDialog';
import ResponseDialog from '@/components/ResponseDialog';

// This would typically come from an API
const sampleFlags = [
  {
    id: 1,
    company: "Felt",
    role: "Software Engineer",
    description: "Ghosted after submitting final round code. Interviewer said no one else solved their challenge.",
    tags: ["Ghosting", "Unpaid Challenge"],
    date: "March 2024",
    timestamp: new Date(2024, 2, 15),
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
    timestamp: new Date(2024, 1, 10),
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
    timestamp: new Date(2024, 0, 5),
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
    timestamp: new Date(2024, 1, 25),
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

const FlagDetails = () => {
  const { id } = useParams();
  const flagId = parseInt(id || '0');
  const flag = sampleFlags.find(f => f.id === flagId);

  if (!flag) {
    return (
      <div className="min-h-screen flex flex-col bg-dark-500">
        <Header />
        <main className="flex-grow py-8 px-4">
          <div className="max-w-3xl mx-auto">
            <Button 
              variant="outline" 
              className="border-gray-700 text-white bg-dark-300 hover:bg-dark-100 mb-4" 
              asChild
            >
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Feed
              </Link>
            </Button>
            <Card className="bg-dark-200 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Flag Not Found</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">The redflag you're looking for doesn't exist or has been removed.</p>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-dark-500">
      <Header />
      <main className="flex-grow py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Button 
            variant="outline" 
            className="border-gray-700 text-white bg-dark-300 hover:bg-dark-100 mb-4" 
            asChild
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Feed
            </Link>
          </Button>
          
          <Card className="bg-dark-200 border-gray-700 mb-6">
            <CardHeader className="border-b border-gray-700">
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-2xl text-white">{flag.company}</CardTitle>
                <span className="text-sm text-gray-400">
                  {formatDistanceToNow(flag.timestamp, { addSuffix: true })}
                </span>
              </div>
              <p className="text-lg text-gray-300">{flag.role}</p>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 mb-6">
                <div className="flex items-center text-gray-400">
                  <Building className="h-4 w-4 mr-2" />
                  <span>Company</span>
                  <span className="ml-2 text-white">{flag.company}</span>
                </div>
                
                <div className="flex items-center text-gray-400">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Reported</span>
                  <span className="ml-2 text-white">{flag.date}</span>
                </div>
                
                <div className="flex items-center text-gray-400">
                  <Globe className="h-4 w-4 mr-2" />
                  <a href={flag.website} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-400 hover:underline">
                    Company Website
                  </a>
                </div>
                
                <div className="flex items-center text-gray-400">
                  <Eye className="h-4 w-4 mr-2" />
                  <span>{flag.views.toLocaleString()} views</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-white font-medium mb-2">Violations:</h3>
                <div>
                  {flag.tags.map((tag, index) => (
                    <span key={index} className={getTagClassName(tag)}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-white font-medium mb-2">Description:</h3>
                <p className="text-gray-300 leading-relaxed">{flag.description}</p>
              </div>
              
              <div className="bg-dark-300 p-4 rounded-md border border-redflag/20 mb-6">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-redflag mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Verification Status</h4>
                    <p className="text-gray-300 text-sm">
                      This report has been verified by our team using supporting evidence 
                      provided by the submitter. We have a zero-tolerance policy for false 
                      or misleading reports.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <ReportDialog flagId={flag.id} companyName={flag.company} />
                <ResponseDialog flagId={flag.id} companyName={flag.company} />
              </div>
              
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FlagDetails;
