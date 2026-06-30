export interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'inactive' | 'on-break';
  image: string;
  callsHandled: number;
}

export interface Call {
  id: string;
  clientName: string;
  duration: string;
  status: 'completed' | 'missed' | 'in-progress';
  image: string;
  date: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  status: 'vip' | 'regular' | 'inactive';
  image: string;
  joinDate: string;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'completed';
  image: string;
  progress: number;
}

export type CallCenterItem = Agent | Call | Client | Campaign;
