import { create } from 'zustand';
import { Campaign } from '../types';

interface DetailState {
  selectedCampaign: Campaign | null;
  setSelectedCampaign: (campaign: Campaign | null) => void;
}

export const useDetailStore = create<DetailState>((set) => ({
  selectedCampaign: null,
  setSelectedCampaign: (campaign) => set({ selectedCampaign: campaign }),
}));
