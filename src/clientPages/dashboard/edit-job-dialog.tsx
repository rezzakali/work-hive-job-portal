'use client';

import { editJob } from '@/src/app/actions';
import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { Textarea } from '@/src/components/ui/textarea';
import { toast } from '@/src/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { JobInterface } from '../home/home.interface';

// 🔹 Zod Schema for Form Validation
const jobSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  company: z.string().min(3, 'Company name must be at least 3 characters'),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  salary: z.string().min(3, 'Salary must be valid'),
  employmentType: z.enum([
    'full-time',
    'part-time',
    'contract',
    'freelance',
    'internship',
  ]),
  experienceLevel: z.enum(['entry-level', 'mid-level', 'senior-level']),
  status: z.string().min(3, 'Status is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  skills: z.string().nonempty('At least one skill is required').optional(),
});

type JobFormValues = z.infer<typeof jobSchema>;

const EditJobDialog = ({
  job,
  open,
  setOpen,
}: {
  job: JobInterface;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isPending, startTransition] = useTransition();

  // 🔹 React Hook Form Setup
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: job.title,
      description: job.description,
      company: job.company,
      location: job.location,
      salary: String(job.salary),
      employmentType: job.employmentType as
        | 'full-time'
        | 'part-time'
        | 'contract'
        | 'freelance'
        | 'internship',
      experienceLevel: job.experienceLevel as
        | 'entry-level'
        | 'mid-level'
        | 'senior-level',
      skills: job.skills.join(','),
    },
  });

  //  Form Submission Handler
  const onSubmit = async (values: JobFormValues) => {
    console.log('Form Values:', values); // Debug form values
    startTransition(async () => {
      try {
        const { salary, ...restData } = values;
        const res = await editJob({
          id: job._id,
          data: {
            ...restData,
            salary: +salary,
            skills: values.skills?.split(','),
          },
        });
        toast({
          title: 'Success',
          description: res.message || 'Job updated successfully',
        });
        setOpen(false);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to update job',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[40rem] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-full"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Job title"
                      {...field}
                      autoCorrect="true"
                      autoCapitalize="true"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Job description"
                      {...field}
                      autoComplete="true"
                      autoCorrect="true"
                      aria-describedby="description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Your company name"
                        {...field}
                        autoComplete="true"
                        autoCorrect="true"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Company location"
                        {...field}
                        autoComplete="true"
                        autoCorrect="true"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Salary (monthly)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Employment Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experienceLevel"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Experience Level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="entry-level">Entry-level</SelectItem>
                        <SelectItem value="mid-level">Mid-level</SelectItem>
                        <SelectItem value="senior-level">
                          Senior-level
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Comma-separated skills" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Loading...' : 'Submit'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditJobDialog;
