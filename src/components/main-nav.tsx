import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getNotifications, getProfile } from '../app/actions';
import LogoutItem from './logout-item';
import ModeToggle from './mode-toggle';
import NotificationDropdown from './notifications.dropdown';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export async function MainNav() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('client.sid')?.value;

  const user = cookie && (await getProfile());

  const notifications =
    cookie && (await getNotifications({ page: 1, limit: 5 }));

  return (
    <header className="bg-background shadow-sm sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 md:px-0 lg:px-0 py-3 flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link href="/" className="text-xl font-bold">
            Work Hive
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          {user && <Link href="/">Recent Jobs</Link>}
          <Link href="/about-us">About us</Link>
          <Link href="/contact-us">Contact us</Link>
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center gap-1">
          {/* Theme Toggle */}
          <ModeToggle />

          {/* Notification Icon */}
          {user && (
            <NotificationDropdown
              notifications={notifications?.data || []}
              userId={user.data?._id}
            />
          )}

          {/* User Dropdown */}

          {user && user.data && (
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
                  <Link href={'/dashboard'}>
                    {user && user.data.role === 'employer' && (
                      <DropdownMenuItem className="cursor-pointer">
                        Dashboard
                      </DropdownMenuItem>
                    )}
                  </Link>
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
