
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const violationOptions = [
  { id: "ghosting", label: "Ghosting" },
  { id: "unpaid", label: "Unpaid Challenge" },
  { id: "misleading", label: "Misleading Role" },
  { id: "revoked", label: "Offer Revoked" },
  { id: "disrespectful", label: "Disrespectful Behavior" },
  { id: "other", label: "Other" }
];

const FlagForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedViolations, setSelectedViolations] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    dateRange: '',
    narrative: '',
    names: '',
    quotes: '',
    consent: ''
  });

  const handleViolationToggle = (violation: string) => {
    setSelectedViolations(prev => 
      prev.includes(violation)
        ? prev.filter(v => v !== violation)
        : [...prev, violation]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleConsent = (value: string) => {
    setFormData(prev => ({ ...prev, consent: value }));
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.company && formData.role && formData.dateRange && selectedViolations.length > 0);
      case 2:
        return !!formData.narrative;
      case 3:
        return !!formData.consent;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      toast.error("Please fill out all required fields before proceeding.");
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStepValid(3)) {
      toast.success("Your redflag has been submitted successfully.");
      // Reset form after submission
      setCurrentStep(1);
      setSelectedViolations([]);
      setFormData({
        company: '',
        role: '',
        dateRange: '',
        narrative: '',
        names: '',
        quotes: '',
        consent: ''
      });
    } else {
      toast.error("Please verify all required information before submitting.");
    }
  };

  return (
    <div className="container-card mb-10">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-2xl mb-2">Submit Your Experience</CardTitle>
        <CardDescription className="text-gray-400">
          Share your experience to help others avoid similar situations.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="multistep-progress">
          <div className="progress-step">
            <div className={`progress-dot ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
              1
            </div>
            <span className="text-xs mt-1 text-gray-400">Basic Info</span>
          </div>
          <div className="flex-1 flex items-center">
            <div className="progress-line"></div>
          </div>
          <div className="progress-step">
            <div className={`progress-dot ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
              2
            </div>
            <span className="text-xs mt-1 text-gray-400">Details</span>
          </div>
          <div className="flex-1 flex items-center">
            <div className="progress-line"></div>
          </div>
          <div className="progress-step">
            <div className={`progress-dot ${currentStep >= 3 ? 'active' : ''}`}>
              3
            </div>
            <span className="text-xs mt-1 text-gray-400">Verification</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Step 1 */}
          <div className={`form-step ${currentStep === 1 ? 'active' : 'hidden'}`}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="company" className="text-white">Company Name*</Label>
                <Input 
                  id="company" 
                  value={formData.company}
                  onChange={handleInputChange}
                  className="bg-dark-100 border-gray-700 text-white mt-1" 
                  required 
                />
              </div>

              <div>
                <Label htmlFor="role" className="text-white">Role / Position*</Label>
                <Input 
                  id="role" 
                  value={formData.role}
                  onChange={handleInputChange}
                  className="bg-dark-100 border-gray-700 text-white mt-1" 
                  required 
                />
              </div>

              <div>
                <Label htmlFor="dateRange" className="text-white">Date Range of Process*</Label>
                <Input 
                  id="dateRange" 
                  value={formData.dateRange}
                  onChange={handleInputChange}
                  placeholder="e.g. Jan - Mar 2024" 
                  className="bg-dark-100 border-gray-700 text-white mt-1" 
                  required 
                />
              </div>

              <div>
                <Label className="text-white mb-2 block">Key Violations*</Label>
                <div className="grid grid-cols-2 gap-3">
                  {violationOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={option.id} 
                        className="border-gray-600 data-[state=checked]:bg-redflag data-[state=checked]:border-redflag" 
                        checked={selectedViolations.includes(option.id)}
                        onCheckedChange={() => handleViolationToggle(option.id)}
                      />
                      <label 
                        htmlFor={option.id}
                        className="text-sm text-gray-300 cursor-pointer"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                type="button" 
                onClick={handleNext}
                className="w-full bg-redflag hover:bg-redflag-dark"
              >
                Continue to Details
              </Button>
            </div>
          </div>

          {/* Step 2 */}
          <div className={`form-step ${currentStep === 2 ? 'active' : 'hidden'}`}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="narrative" className="text-white">What Happened?*</Label>
                <Textarea 
                  id="narrative" 
                  value={formData.narrative}
                  onChange={handleInputChange}
                  rows={6} 
                  maxLength={1000}
                  placeholder="Please describe your experience in detail." 
                  className="bg-dark-100 border-gray-700 text-white mt-1 resize-none" 
                  required 
                />
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {formData.narrative.length}/1000 characters
                </div>
              </div>

              <div>
                <Label htmlFor="proof" className="text-white">Upload Proof*</Label>
                <p className="text-xs text-gray-400 mb-2">
                  (Email screenshots, invites, code samples, etc.)
                </p>
                <Input 
                  id="proof" 
                  type="file" 
                  className="bg-dark-100 border-gray-700 text-white mt-1 file:mr-4 file:py-2 file:px-4
                           file:rounded-md file:border-0 file:bg-redflag file:text-white
                           hover:file:bg-redflag-dark" 
                  required 
                  multiple 
                />
              </div>

              <div className="flex space-x-3">
                <Button 
                  type="button" 
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1 border-gray-700 text-white hover:bg-dark-100"
                >
                  Back
                </Button>
                <Button 
                  type="button" 
                  onClick={handleNext}
                  className="flex-1 bg-redflag hover:bg-redflag-dark"
                >
                  Continue to Verification
                </Button>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className={`form-step ${currentStep === 3 ? 'active' : 'hidden'}`}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="names" className="text-white">Names Involved</Label>
                <p className="text-xs text-gray-400 mb-2">
                  (Optional, internal use unless verified)
                </p>
                <Input 
                  id="names" 
                  value={formData.names}
                  onChange={handleInputChange}
                  placeholder="First Last, Recruiter" 
                  className="bg-dark-100 border-gray-700 text-white mt-1" 
                />
              </div>

              <div>
                <Label htmlFor="quotes" className="text-white">Notable Quotes or Messages</Label>
                <p className="text-xs text-gray-400 mb-2">(Optional)</p>
                <Textarea 
                  id="quotes" 
                  value={formData.quotes}
                  onChange={handleInputChange}
                  rows={4} 
                  placeholder="Copy/paste any notable messages here" 
                  className="bg-dark-100 border-gray-700 text-white mt-1 resize-none" 
                />
              </div>

              <div>
                <Label htmlFor="consent" className="text-white">Consent*</Label>
                <Select 
                  value={formData.consent} 
                  onValueChange={handleConsent}
                >
                  <SelectTrigger 
                    id="consent" 
                    className="w-full bg-dark-100 border-gray-700 text-white mt-1"
                  >
                    <SelectValue placeholder="Select consent option" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-100 border-gray-700 text-white">
                    <SelectItem value="yes">
                      I verify this account is truthful and I agree to platform review
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-3">
                <Button 
                  type="button" 
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1 border-gray-700 text-white hover:bg-dark-100"
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-redflag hover:bg-redflag-dark"
                >
                  Submit Redflag
                </Button>
              </div>
            </div>
          </div>
        </form>

        <div className="mt-6 p-4 bg-dark-100 rounded-lg">
          <p className="text-sm text-gray-300 mb-2">
            <strong>Disclaimer:</strong> Redflagged is a user-submitted documentation platform. All claims are reviewed before posting. We encourage evidence-based reporting and transparency. Submissions are not legal claims.
          </p>
          <p className="text-sm text-gray-300">
            <strong>Right to Respond:</strong> Individuals named in any post will be privately notified and offered the opportunity to respond or clarify. Verified corrections may be added to public entries when appropriate. We do not tolerate harassment or false allegations.
          </p>
        </div>
      </CardContent>
    </div>
  );
};

export default FlagForm;
