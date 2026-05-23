import { create } from 'zustand';
import { CallCenterState, Campaign } from '../types';

export const useCampaignStore = create<CallCenterState>((set) => ({
  savedCampaigns: [],
  addCampaign: (campaign) =>
    set((state) => ({
      savedCampaigns: [...state.savedCampaigns, campaign],
    })),
  removeCampaign: (id) =>
    set((state) => ({
      savedCampaigns: state.savedCampaigns.filter((c) => c.id !== id),
    })),
  clearAll: () => set({ savedCampaigns: [] }),
}));
