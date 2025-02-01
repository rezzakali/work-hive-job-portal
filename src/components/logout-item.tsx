'use client';

import { DropdownMenuItem } from '@/src/components/ui/dropdown-menu';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { logout } from '../app/actions';
import { useToast } from './ui/use-toast';

const LogoutItem = () => {
  const { toast } = useToast();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignout = async () => {
    startTransition(async () => {
      try {
        const res = await logout(); // Calls the signup function
        if (res && res.success) {
          deleteCookie('client.sid');
        }
        toast({
          title: 'Success',
          description: res.message || 'Logut successful!',
        });
        replace('/signin');
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
    <DropdownMenuItem
      onClick={handleSignout}
      disabled={isPending}
      className="cursor-pointer"
    >
      Signout
    </DropdownMenuItem>
  );
};

export default LogoutItem;
