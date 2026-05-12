export interface Agent {
  id: string;
  name: string;
  role: 'Inbound' | 'Outbound' | 'Supervisor';
  status: 'Available' | 'Busy' | 'Offline' | 'On Call';
  extension: string;
  email: string;
  callsToday: number;
  avatar: string;
  department: string;
  experience: string;
}

export type RootStackParamList = {
  HomeList: undefined;
  HomeDetail: { id: string; name: string };
};
