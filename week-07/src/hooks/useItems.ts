import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchItemsFromApi, mockItemsSeed } from '../services/api';
import type { CallCenterItem } from '../types';

const CACHE_KEY = 'callcenter-items-cache';

export function useItems() {
  const [offline, setOffline] = useState(false);

  const query = useQuery<CallCenterItem[]>({
    queryKey: ['items'],
    queryFn: async () => {
      try {
        const data = await fetchItemsFromApi();
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
        setOffline(false);
        return data;
      } catch (error) {
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached) as CallCenterItem[];
          setOffline(true);
          return parsed;
        }
        setOffline(true);
        throw error;
      }
    },
    initialData: mockItemsSeed,
    retry: 1,
    staleTime: 1000 * 60,
  });

  const items = useMemo(() => query.data ?? mockItemsSeed, [query.data]);

  return {
    items,
    isLoading: query.isLoading,
    isError: query.isError,
    offline,
    refetch: query.refetch,
  };
}
