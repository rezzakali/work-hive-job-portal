'use client';

import { getCookie } from 'cookies-next';
import { getToken, isSupported } from 'firebase/messaging';
import { useEffect, useState } from 'react';
import { messaging } from '../config/firebase.config';
import useNotificationPermission from './useNotificationPermission';

const useFCMToken = () => {
  const permission = useNotificationPermission();
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const cookie = getCookie('client.sid');

  useEffect(() => {
    const retrieveToken = async () => {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        if (permission === 'granted') {
          const isFCMSupported = await isSupported();
          if (!isFCMSupported) return;
          const fcmToken = await getToken(messaging(), {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          });
          if (fcmToken) {
            setFcmToken(fcmToken);

            // Send token to backend
            await fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/general/save-fcm-token`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'x-access-token': cookie as string,
                },
                body: JSON.stringify({
                  token: fcmToken,
                }),
              }
            );
          }
        }
      }
    };
    retrieveToken();
  }, [permission]);

  return fcmToken;
};

export default useFCMToken;
