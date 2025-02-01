'use client';

import { contactApi } from '@/src/app/actions';
import { Button } from '@/src/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { useToast } from '@/src/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const contactFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactUs = () => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: '',
      subject: '',
      description: '',
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    startTransition(async () => {
      try {
        const res = await contactApi(values);

        toast({
          title: 'Success',
          description: res.message || 'Your message has been sent!',
        });
        form.reset();
      } catch (error: any) {
        try {
          const parsedError = JSON.parse(error.message);
          toast({
            title: 'Error',
            description:
              parsedError.message ||
              'Failed to send your message. Please try again.',
            variant: 'destructive',
          });
        } catch (parseError) {
          // Handle unexpected errors
          toast({
            title: 'Server error',
            description: 'An unexpected error occurred.',
          });
        }
      }
    });
  };

  return (
    <div className="my-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Subject Field */}
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the subject" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your message"
                    {...field}
                    className="min-h-[150px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Loading...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactUs;
