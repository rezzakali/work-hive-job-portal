// 'use client';

// import { useEffect, useState } from 'react';

// const useNotificationPermissionStatus = () => {
//   const [permission, setPermission] =
//     useState<NotificationPermission>('default');

//   useEffect(() => {
//     if (typeof window === 'undefined' || !('Notification' in window)) {
//       console.log('first');
//       return; // Prevent execution on the server
//     }

//     const updatePermission = () => setPermission(Notification.permission);
//     updatePermission();

//     let permissionStatus: PermissionStatus | null = null;

//     const checkPermissions = async () => {
//       try {
//         permissionStatus = await navigator.permissions.query({
//           name: 'notifications',
//         });

//         permissionStatus.onchange = updatePermission;
//       } catch (error) {
//         console.warn('Permission API not supported', error);
//       }
//     };

//     checkPermissions();

//     return () => {
//       if (permissionStatus) {
//         permissionStatus.onchange = null; // Cleanup listener
//       }
//     };
//   }, []);

//   return permission;
// };

// export default useNotificationPermissionStatus;

'use client';
import { useEffect, useState } from 'react';

const useNotificationPermissionStatus = () => {
  const [permission, setPermission] =
    useState<NotificationPermission>('default');

  useEffect(() => {
    const handler = () => setPermission(Notification.permission);
    handler();
    Notification.requestPermission().then(handler);

    navigator.permissions
      .query({ name: 'notifications' })
      .then((notificationPerm) => {
        notificationPerm.onchange = handler;
      });
  }, []);

  return permission;
};

export default useNotificationPermissionStatus;
