'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { changeAddress } from '@/src/app/actions';
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
import { RootState } from '@/src/redux/store';
import { useTransition } from 'react';
import { useSelector } from 'react-redux';

const formSchema = z.object({
  street: z.string().nonempty('Street is required.'),
  city: z.string().nonempty('City is required.'),
  state: z.string().nonempty('State is required.'),
  postalCode: z
    .string()
    .nonempty('PIN is required.')
    .regex(/^[1-9][0-9]{5}$/, 'Invalid PIN code.'),
  country: z.string().nonempty('Country is required.'),
});

const ChangeAddress = ({
  open,
  setOpen,
  address,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  address: {
    city: string;
    country: string;
    postalCode: string;
    state: string;
    street: string;
  };
}) => {
  const { user } = useSelector((state: RootState) => state.users);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: address?.city || '',
      country: address?.country || '',
      postalCode: address?.postalCode || '',
      state: address?.state || '',
      street: address?.street || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        const data = {
          email: user!.email,
          address: { ...values },
        };
        const res = await changeAddress(data); // Calls the signup function
        toast({
          title: 'Success',
          description: res.message || 'Address changed!',
        });
        form.reset();
        setOpen(false);
      } catch (error: any) {
        let errorMessage = 'An error occurred while updating the address.';
        if (error.message) {
          try {
            // Attempt to parse the error message as JSON
            const parsedError = JSON.parse(error.message);
            errorMessage = parsedError.message || errorMessage;
          } catch (parseError) {
            // Fallback: Use the raw error message if JSON parsing fails
            errorMessage = error.message;
          }
        }
        toast({
          title: 'Failed',
          description: errorMessage,
        });
        console.error('Error updating address:', error);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>Change Address</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 w-full max-w-lg"
            >
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Street"
                        {...field}
                        autoComplete="true"
                        spellCheck
                        autoCorrect="true"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input type="string" placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input type="string" placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="string" placeholder="PIN" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="string" placeholder="Country" {...field} />
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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeAddress;
