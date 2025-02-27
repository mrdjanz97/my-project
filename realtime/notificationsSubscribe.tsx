'use client';

import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import supabase from '@root/src/supabase_client';
import { NOTIFICATIONS_CHANNEL } from './consts';
import { NOTIFICATIONS_TABLE } from '../database/table.names';
import { NEW_NOTIFICATIONS_QUERY_KEY, NOTIFICATIONS_QUERY_KEY } from '../lib/core/notifications/queries/consts';

const NotificationsSubscribe = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel(NOTIFICATIONS_CHANNEL)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: NOTIFICATIONS_TABLE,
        },
        payload => {
          queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_QUERY_KEY] });
          queryClient.invalidateQueries({ queryKey: [NEW_NOTIFICATIONS_QUERY_KEY] });
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return <></>;
};

export default NotificationsSubscribe;
