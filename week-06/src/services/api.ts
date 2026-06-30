import AsyncStorage from '@react-native-async-storage/async-storage';
import { CallCenterAgent, CreateAgentPayload, UpdateAgentPayload } from '../types';

const STORAGE_KEY = 'call-center-agents';

const getNextId = () => `${Date.now()}`;

const seedData = async (): Promise<CallCenterAgent[]> => {
  const initial: CallCenterAgent[] = [
    {
      id: '1',
      name: 'Ana Morales',
      campaign: 'Atención al cliente',
      client: 'Banco Pacifico',
      calls: 48,
      status: 'Active',
    },
    {
      id: '2',
      name: 'Luis Pérez',
      campaign: 'Ventas digitales',
      client: 'E-commerce Norte',
      calls: 27,
      status: 'Break',
    },
  ];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
};

export const fetchAgents = async (): Promise<CallCenterAgent[]> => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return seedData();
  return JSON.parse(raw) as CallCenterAgent[];
};

export const fetchAgentById = async (id: string): Promise<CallCenterAgent | null> => {
  const agents = await fetchAgents();
  return agents.find((a) => a.id === id) ?? null;
};

export const createAgent = async (payload: CreateAgentPayload): Promise<CallCenterAgent> => {
  const agents = await fetchAgents();
  const newAgent: CallCenterAgent = {
    id: getNextId(),
    name: payload.name,
    campaign: payload.campaign,
    client: payload.client,
    calls: Number(payload.calls),
    status: payload.status as CallCenterAgent['status'],
  };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([newAgent, ...agents]));
  return newAgent;
};

export const updateAgent = async (
  id: string,
  payload: UpdateAgentPayload
): Promise<CallCenterAgent | null> => {
  const agents = await fetchAgents();
  const updated = agents.map((a) =>
    a.id === id
      ? { ...a, ...payload, calls: Number(payload.calls), status: payload.status as CallCenterAgent['status'] }
      : a
  );
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated.find((a) => a.id === id) ?? null;
};
