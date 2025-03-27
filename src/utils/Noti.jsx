import { Toaster, toast } from 'sonner';
import React, { useEffect } from 'react';

const Noti = ({ notifications }) => {
  useEffect(() => {
    notifications.forEach((notification) => {
      notification.isSuccess
        ? toast.success(notification.message)
        : toast.error(notification.message);
    });
  }, [notifications]);

  return <Toaster position="top-right" richColors closeButton />;
};

export default Noti;
