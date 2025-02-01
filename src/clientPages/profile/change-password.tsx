'use client';

import { changePassword } from '@/src/app/actions';
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
import { useToast } from '@/src/hooks/use-toast';
import { RootState } from '@/src/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { z } from 'zod';

const formSchema = z.object({
  oldPassword: z
    .string()
    .nonempty('Old password is required!')
    .min(8, 'Old password must be at least 8 characters.')
    .regex(/[a-z]/, 'Old password must contain at least one lowercase letter.')
    .regex(/[A-Z]/, 'Old password must contain at least one uppercase letter.')
    .regex(/[0-9]/, 'Old password must contain at least one number.')
    .regex(
      /[^a-zA-Z0-9]/,
      'Old password must contain at least one special character.'
    ),
  newPassword: z
    .string()
    .nonempty('Confirm your password!')
    .min(8, 'Password must be at least 8 characters.'),
});

const ChangePasswordForm = () => {
  const { user } = useSelector((state: RootState) => state.users);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        const data = { ...values, email: user!.email };
        const res = await changePassword(data); // Calls the changePassword function
        toast({
          title: 'Success',
          description: res.message || 'Password changed successful!',
        });
        form.reset();
        router.push('/profile');
      } catch (error: any) {
        try {
          const parsedError = JSON.parse(error.message);
          toast({
            title: 'Error',
            description:
              parsedError.message ||
              'An error occurred during password change.',
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
    <Card className="space-y-3">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-full flex flex-col items-center gap-6"
          >
            <div className="w-full flex flex-col gap-6">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Old Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="New Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full mt-auto"
              disabled={isPending}
            >
              {isPending ? 'Loading...' : 'Submit'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;
