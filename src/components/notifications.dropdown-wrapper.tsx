'use client';

import { NotificationInterface } from '../@types';
import NotificationDropdown from './notifications.dropdown';

const NotificationDropdownWrapper = ({
  notifications = [],
  userId,
}: {
  notifications: NotificationInterface[];
  userId: string;
}) => {
  return <NotificationDropdown notifications={notifications} userId={userId} />;
};

export default NotificationDropdownWrapper;
