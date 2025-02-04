'use client';

import { useEffect, useState } from 'react';
import { NotificationInterface } from '../@types';
import { getNotifications } from '../app/actions';
import NotificationDropdown from './notifications.dropdown';

const NotificationDropdownWrapper = ({ userId }: { userId: string }) => {
  const [notifications, setNotifications] = useState<NotificationInterface[]>(
    []
  );

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await getNotifications({ page: 1, limit: 5 });
        setNotifications(res.data || []);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return <NotificationDropdown notifications={notifications} userId={userId} />;
};

export default NotificationDropdownWrapper;
