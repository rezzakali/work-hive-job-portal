'use client';

import { Button } from '@/src/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { useToast } from '@/src/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signup } from '../actions';

const formSchema = z.object({
  email: z.string().nonempty('Email is required!').email({
    message: 'Invalid email address.',
  }),
  phone: z.string().nonempty('Phone is required!').min(10, {
    message: 'Phone must be at least 10 characters.',
  }),
  password: z
    .object({
      password: z
        .string()
        .nonempty('Password is required!')
        .min(8, 'Password must be at least 8 characters.')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
        .regex(/[0-9]/, 'Password must contain at least one number.')
        .regex(
          /[^a-zA-Z0-9]/,
          'Password must contain at least one special character.'
        ),
      confirmPassword: z
        .string()
        .nonempty('Confirm your password!')
        .min(8, 'Password must be at least 8 characters.'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Password mismatch!',
      path: ['confirmPassword'],
    }),
});

const Page = () => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      phone: '',
      password: {
        password: '',
        confirmPassword: '',
      },
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        const data = { ...values, password: values.password.password };
        const res = await signup(data); // Calls the signup function
        toast({
          title: 'Success',
          description: res.message || 'Signup successful!',
        });
        form.reset();
        router.push('/signin');
      } catch (error: any) {
        try {
          const parsedError = JSON.parse(error.message);
          toast({
            title: 'Error',
            description:
              parsedError.message || 'An error occurred during signup.',
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
    <div className="container flex items-center justify-center flex-col max-h-screen mt-20 space-y-3">
      <h1 className="text-lg">Signup</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full max-w-lg"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    autoComplete="true"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Your phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password.password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password.confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
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
      <div className="flex items-center gap-1">
        <p>Already have an account !</p>
        <Link href={'/signin'} prefetch>
          Signin
        </Link>
      </div>
    </div>
  );
};

export default Page;
