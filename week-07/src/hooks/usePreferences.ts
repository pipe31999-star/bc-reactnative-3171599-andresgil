import { useMMKVBoolean, useMMKVNumber, useMMKVString } from 'react-native-mmkv';
import { storage } from '../storage/mmkv';
import type { PreferencesState, SortOrder } from '../types';

const DEFAULT_PREFERENCES: PreferencesState = {
  sortOrder: 'recent',
  compactMode: false,
  itemsPerPage: 6,
};

export function usePreferences() {
  const [sortOrder, setSortOrder] = useMMKVString('preferences.sortOrder', storage);
  const [compactMode, setCompactMode] = useMMKVBoolean('preferences.compactMode', storage);
  const [itemsPerPage, setItemsPerPage] = useMMKVNumber('preferences.itemsPerPage', storage);

  const preferences: PreferencesState = {
    sortOrder: (sortOrder as SortOrder | undefined) ?? DEFAULT_PREFERENCES.sortOrder,
    compactMode: compactMode ?? DEFAULT_PREFERENCES.compactMode,
    itemsPerPage: itemsPerPage ?? DEFAULT_PREFERENCES.itemsPerPage,
  };

  const updateSortOrder = (value: SortOrder) => setSortOrder(value);
  const updateCompactMode = (value: boolean) => setCompactMode(value);
  const updateItemsPerPage = (value: number) => setItemsPerPage(value);

  return {
    ...preferences,
    updateSortOrder,
    updateCompactMode,
    updateItemsPerPage,
  };
}
