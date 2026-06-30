export type CallCenterAgent = {
  id: string;
  name: string;
  campaign: string;
  client: string;
  calls: number;
  status: 'Active' | 'Break' | 'Offline';
};

export type CreateAgentPayload = {
  name: string;
  campaign: string;
  client: string;
  calls: number;
  status: string;
};

export type UpdateAgentPayload = CreateAgentPayload;
