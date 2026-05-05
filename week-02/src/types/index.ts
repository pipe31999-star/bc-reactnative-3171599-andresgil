export interface Agent {
  id: string;
  name: string;
  status: 'available' | 'busy' | 'offline';
  phone: string;
  calls_handled: number;
}

export interface Call {
  id: string;
  agent_id: string;
  client_name: string;
  duration: number;
  timestamp: string;
  status: 'completed' | 'missed' | 'transfered';
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  last_contact: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  target_clients: number;
  agents_assigned: number;
}

// Para esta app, usaremos Agent como el tipo principal
export type Item = Agent;
