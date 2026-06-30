export type SortOrder = 'recent' | 'name' | 'status';

export interface CallCenterItem {
  id: string;
  agentName: string;
  clientName: string;
  campaignName: string;
  status: 'En espera' | 'En llamada' | 'Cerrado';
  priority: 'Alta' | 'Media' | 'Baja';
  notes: string;
  createdAt: string;
}

export interface PreferencesState {
  sortOrder: SortOrder;
  compactMode: boolean;
  itemsPerPage: number;
}
