'use client';

import { createJob } from '@/src/app/actions';
import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
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
import { useToast } from '@/src/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const jobSchema = z.object({
  title: z.string().nonempty('Title is required!'),
  description: z.string().nonempty('Description is required!'),
  company: z.string().nonempty('Company is required!'),
  location: z.string().nonempty('Location is required!'),
  salary: z.string().nonempty('Salary is required!'),
  employmentType: z.enum(
    ['full-time', 'part-time', 'contract', 'freelance', 'internship'],
    {
      errorMap: () => ({ message: 'Invalid employment type' }),
    }
  ),
  experienceLevel: z.enum(['entry-level', 'mid-level', 'senior-level'], {
    errorMap: () => ({ message: 'Invalid experience level' }),
  }),
  skills: z.string().nonempty('At least one skill is required').optional(),
});

const PostJobForm = () => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: '',
      description: '',
      company: '',
      location: '',
      salary: '',
      employmentType: 'full-time',
      experienceLevel: 'entry-level',
      skills: 'HTML,CSS',
    },
  });

  const onSubmit = async (values: z.infer<typeof jobSchema>) => {
    startTransition(async () => {
      try {
        const { skills, ...rest } = values;
        const formattedData = {
          ...rest,
          skills: skills?.split(','),
          salary: +rest.salary,
        };
        const res = await createJob(formattedData);
        toast({
          title: 'Success',
          description: res.message || 'Job create successful!',
        });
        form.reset();
      } catch (error: any) {
        try {
          const parsedError = JSON.parse(error.message);
          toast({
            title: 'Error',
            description:
              parsedError.message || 'An error occurred during job create!.',
          });
          form.reset();
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
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Post a Job</CardTitle>
        </CardHeader>
        <CardContent>
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
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Employment Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="freelance">Freelance</SelectItem>
                            <SelectItem value="internship">
                              Internship
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experienceLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Experience Level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entry-level">
                              Entry-level
                            </SelectItem>
                            <SelectItem value="mid-level">Mid-level</SelectItem>
                            <SelectItem value="senior-level">
                              Senior-level
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default PostJobForm;
