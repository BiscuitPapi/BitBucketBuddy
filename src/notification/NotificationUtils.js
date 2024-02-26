import React, { useState } from 'react';
import NotificationComponent from './NotificationComponent';

export function useNotification() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSeverity, setNotificationSeverity] = useState('success');

  const showNotification = (message, severity = 'success') => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setNotificationOpen(true);
  };

  const closeNotification = () => {
    setNotificationOpen(false);
  };

  const Notification = () => (
    <NotificationComponent
      open={notificationOpen}
      message={notificationMessage}
      severity={notificationSeverity}
      handleClose={closeNotification}
    />
  );

  return { showNotification, Notification };
}
