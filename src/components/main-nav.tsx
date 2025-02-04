import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getProfile } from '../app/actions';
import LogoutItem from './logout-item';
import ModeToggle from './mode-toggle';
import NotificationDropdownWrapper from './notifications.dropdown-wrapper';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export async function MainNav() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('client.sid')?.value;
  const user = cookie && (await getProfile());

  return (
    <header className="bg-background shadow-sm sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 md:px-0 lg:px-0 py-3 flex justify-between items-center">
        <div>
          <Link href="/" className="text-xl font-bold">
            WorkShive
          </Link>
        </div>

        <nav className="hidden md:flex space-x-6">
          {user && <Link href="/">Recent Jobs</Link>}
          <Link href="/about-us">About us</Link>
          <Link href="/contact-us">Contact us</Link>
        </nav>

        <div className="flex items-center gap-1">
          <ModeToggle />

          {/* Move NotificationDropdown to a Client Component */}
          {user && <NotificationDropdownWrapper userId={user.data._id} />}

          {user && (
            <Avatar className="w-7 h-7">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Link href={'/profile'}>
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  {user.data.role === 'employer' && (
                    <Link href={'/dashboard'}>
                      <DropdownMenuItem className="cursor-pointer">
                        Dashboard
                      </DropdownMenuItem>
                    </Link>
                  )}
                  <LogoutItem />
                </DropdownMenuContent>
              </DropdownMenu>
            </Avatar>
          )}
        </div>
      </div>
    </header>
  );
}
