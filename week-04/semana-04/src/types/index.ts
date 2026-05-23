export interface Campaign {
  id: string;
  name: string;
  description: string;
  type: 'Inbound' | 'Outbound';
  category: string;
  targetAudience: string;
  status: 'Active' | 'Paused' | 'Completed';
  successRate: number;
  image: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  experience: string;
  rating: number;
}

export interface CallCenterState {
  savedCampaigns: Campaign[];
  addCampaign: (campaign: Campaign) => void;
  removeCampaign: (id: string) => void;
  clearAll: () => void;
}
