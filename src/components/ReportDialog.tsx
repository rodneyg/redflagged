
import React from 'react';
import { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Flag, AlertTriangle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const reportSchema = z.object({
  reportType: z.enum(['incorrect', 'inappropriate', 'personal', 'other']),
  explanation: z.string().min(10, "Please provide at least 10 characters of explanation").max(500, "Explanation must be less than 500 characters"),
  email: z.string().email("Please enter a valid email address"),
});

type ReportFormValues = z.infer<typeof reportSchema>;

interface ReportDialogProps {
  flagId: number;
  companyName: string;
}

const ReportDialog = ({ flagId, companyName }: ReportDialogProps) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  
  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      reportType: 'incorrect',
      explanation: '',
      email: '',
    },
  });

  const handleReportSubmit = (values: ReportFormValues) => {
    // In a real app, this would send the report to the backend
    console.log('Report submitted:', values);
    
    toast({
      title: "Report submitted",
      description: "We'll review your report and get back to you soon.",
    });
    
    setOpen(false);
    setStep(1);
    form.reset();
  };

  const handleClose = () => {
    setOpen(false);
    setStep(1);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Flag className="h-4 w-4" />
          Report this Flag
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-dark-200 border-gray-700 text-white">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-white">Report this flag</DialogTitle>
              <DialogDescription className="text-gray-400">
                Please read before proceeding
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-dark-300 p-4 rounded-md border border-gray-700">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium mb-2">Important Information</h4>
                    <p className="text-gray-300 text-sm mb-3">
                      We take reports seriously and investigate all claims. Please ensure your report is:
                    </p>
                    <ul className="text-gray-300 text-sm list-disc pl-5 space-y-1">
                      <li>Truthful and accurate</li>
                      <li>Includes specific details</li>
                      <li>Can be verified (if you're claiming to be from the company)</li>
                    </ul>
                    <p className="text-gray-300 text-sm mt-3">
                      False reports may result in account restrictions. If you're reporting on behalf 
                      of {companyName}, we'll need to verify your identity through your company email.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={handleClose} className="border-gray-700 text-white bg-dark-300 hover:bg-dark-100">
                Cancel
              </Button>
              <Button className="bg-redflag hover:bg-redflag-dark" onClick={() => setStep(2)}>
                Continue
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-white">Report details</DialogTitle>
              <DialogDescription className="text-gray-400">
                Please provide details about your report
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleReportSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="reportType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-white">Reason for report</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="incorrect" className="border-gray-600" />
                            </FormControl>
                            <FormLabel className="font-normal text-gray-300">
                              Information is incorrect
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="inappropriate" className="border-gray-600" />
                            </FormControl>
                            <FormLabel className="font-normal text-gray-300">
                              Content is inappropriate
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="personal" className="border-gray-600" />
                            </FormControl>
                            <FormLabel className="font-normal text-gray-300">
                              I work for this company
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="other" className="border-gray-600" />
                            </FormControl>
                            <FormLabel className="font-normal text-gray-300">
                              Other
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="explanation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Explanation</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please explain the issue in detail..."
                          className="resize-none h-24 bg-dark-100 border-gray-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400 text-xs">
                        {field.value.length}/500 characters
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Your email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your@email.com"
                          className="bg-dark-100 border-gray-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400 text-xs">
                        Required for verification. Company email required if reporting as employee.
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <DialogFooter className="gap-2 sm:gap-0 pt-2">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="border-gray-700 text-white bg-dark-300 hover:bg-dark-100">
                    Back
                  </Button>
                  <Button type="submit" className="bg-redflag hover:bg-redflag-dark">
                    Submit Report
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;
