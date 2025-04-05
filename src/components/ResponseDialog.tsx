
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageSquare, AlertTriangle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const responseSchema = z.object({
  response: z.string().min(20, "Please provide at least 20 characters in your response").max(1000, "Response must be less than 1000 characters"),
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Please enter your name").max(100, "Name must be less than 100 characters"),
  title: z.string().min(2, "Please enter your title").max(100, "Title must be less than 100 characters"),
});

type ResponseFormValues = z.infer<typeof responseSchema>;

interface ResponseDialogProps {
  flagId: number;
  companyName: string;
}

const ResponseDialog = ({ flagId, companyName }: ResponseDialogProps) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  
  const form = useForm<ResponseFormValues>({
    resolver: zodResolver(responseSchema),
    defaultValues: {
      response: '',
      email: '',
      name: '',
      title: '',
    },
  });

  const handleResponseSubmit = (values: ResponseFormValues) => {
    // In a real app, this would send the response to the backend
    console.log('Response submitted:', values);
    
    toast({
      title: "Response submitted",
      description: "We'll verify your identity and post your response if approved.",
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
          <MessageSquare className="h-4 w-4" />
          Respond as Company
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-dark-200 border-gray-700 text-white">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-white">Respond to this flag</DialogTitle>
              <DialogDescription className="text-gray-400">
                Company representative response
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-dark-300 p-4 rounded-md border border-gray-700">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium mb-2">Verification Required</h4>
                    <p className="text-gray-300 text-sm mb-3">
                      To respond as a representative of {companyName}, we'll need to verify your identity:
                    </p>
                    <ul className="text-gray-300 text-sm list-disc pl-5 space-y-1">
                      <li>You must use your company email address</li>
                      <li>We'll send a verification link to this email</li>
                      <li>Your response will be published once verified</li>
                    </ul>
                    <p className="text-gray-300 text-sm mt-3">
                      Impersonating a company representative is against our terms of service
                      and may result in legal action.
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
              <DialogTitle className="text-white">Respond as {companyName}</DialogTitle>
              <DialogDescription className="text-gray-400">
                Your response will be public after verification
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleResponseSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Your Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Smith"
                          className="bg-dark-100 border-gray-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Your Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="HR Manager"
                          className="bg-dark-100 border-gray-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Company Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@companyname.com"
                          className="bg-dark-100 border-gray-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400 text-xs">
                        Must be an email from the company domain for verification
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="response"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Your Response</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide your official response to this flag..."
                          className="resize-none h-36 bg-dark-100 border-gray-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400 text-xs">
                        {field.value.length}/1000 characters
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
                    Submit Response
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

export default ResponseDialog;
