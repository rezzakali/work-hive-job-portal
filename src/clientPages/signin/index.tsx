'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { signin } from '@/src/app/actions';
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
import { setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

const formSchema = z.object({
  email: z.string().nonempty('Email is required.').email({
    message: 'Invalid email address.',
  }),
  password: z
    .string()
    .nonempty('Password is required.')
    .min(8, 'Password must be at least 8 characters.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.')
    .regex(
      /[^a-zA-Z0-9]/,
      'Password must contain at least one special character.'
    ),
});

const Signin = () => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        const res = await signin(values); // Calls the signin function

        if (res && res.success) {
          // Ensure the cookie is set properly
          setCookie('client.sid', res.data, {
            path: '/', // Make cookie available across the site
            httpOnly: false, // Ensure it's accessible from JS
            sameSite: 'strict', // Security measure
          });

          toast({
            title: 'Success',
            description: res.message || 'Signin successful!',
          });

          form.reset();
          router.push('/');
        } else {
          // Handle failed login attempt
          toast({
            title: 'Error',
            description: res?.message || 'Invalid email or password.',
          });
        }
      } catch (error: any) {
        let errorMessage = 'An unexpected error occurred.';

        try {
          const parsedError = JSON.parse(error.message);
          errorMessage = parsedError.message || errorMessage;
        } catch {
          // If error.message isn't JSON, fallback to default message
        }

        toast({
          title: 'Server error',
          description: errorMessage,
        });
      }
    });
  };

  return (
    <div className="container flex items-center justify-center flex-col max-h-screen space-y-3 mt-20">
      <h1 className="text-lg">Signin</h1>
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
                    autoComplete="on" // ✅ Fix incorrect attribute
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
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
        <p>Don&apos;t have an account?</p>
        <Link href={'/signup'} prefetch>
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Signin;
