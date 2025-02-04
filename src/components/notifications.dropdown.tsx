'use client'; // Mark the component as a Client Component

import { Bell } from 'lucide-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { NotificationInterface } from '../@types';
import { markNotificationRead } from '../app/actions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Button } from './ui/button';

const NotificationDropdown = ({
  notifications = [],
  userId,
}: {
  notifications: NotificationInterface[];
  userId: string;
}) => {
  const router = useRouter(); // Initialize router

  const hasUnread = notifications.some(
    (n) => !n.isReadBy.includes(userId) // Check if user has not read this notification
  );

  const handleNotificationClick = async (
    notification: NotificationInterface
  ) => {
    if (notification.jobId) {
      router.push(`/job/${notification.jobId}`); // Navigate to job details page
      // Mark notification as read
      await markNotificationRead(notification._id);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative" size="sm">
          <Bell />
          {hasUnread && (
            <span className="absolute top-1 right-1 block h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse"></span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72 max-h-80 overflow-y-auto shadow-lg rounded-md"
      >
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            const isUnread = !notification.isReadBy.includes(userId);
            return (
              <DropdownMenuItem
                key={notification._id}
                className={`flex justify-between relative cursor-pointer`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex flex-col space-y-1">
                  <p className="font-semibold">New Job Alert!</p>
                  <p className="text-xs">{`A new job has been posted: ${notification.message.replace(
                    'New job posted: ',
                    ''
                  )}. Check it out now!`}</p>
                  <p className="text-[0.6rem] text-end text-gray-400">
                    Posted on {moment(notification.createdAt).format('lll')}
                  </p>
                </div>
                {isUnread && (
                  <p className="ml-2 text-xs font-semibold text-blue-500 absolute top-1 right-1">
                    New
                  </p>
                )}
              </DropdownMenuItem>
            );
          })
        ) : (
          <p className="text-center p-3 text-sm">No new notifications</p>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
