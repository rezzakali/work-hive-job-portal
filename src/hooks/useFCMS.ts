import { MessagePayload, onMessage } from 'firebase/messaging';
import { useEffect, useState } from 'react';
import { messaging } from '../config/firebase.config';
import { useToast } from './use-toast';
import useFCMToken from './useFCMToken';

const useFCM = () => {
  const fcmToken = useFCMToken();
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const fcmmessaging = messaging();
      const unsubscribe = onMessage(fcmmessaging, (payload) => {
        toast({ title: payload.notification?.title });
        setMessages((messages) => [...messages, payload]);
      });
      return () => unsubscribe();
    }
  }, [fcmToken]);
  return { fcmToken, messages };
};

export default useFCM;
