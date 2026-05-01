import { Agent, Call, Client, Campaign } from '../types';

export const agentsMockData: Agent[] = [
  {
    id: '1',
    name: 'María García',
    role: 'Agente Senior',
    status: 'active',
    image: 'https://picsum.photos/200/200?random=1',
    callsHandled: 145,
  },
  {
    id: '2',
    name: 'Juan López',
    role: 'Agente Cuentas',
    status: 'active',
    image: 'https://picsum.photos/200/200?random=2',
    callsHandled: 89,
  },
  {
    id: '3',
    name: 'Sofía Martínez',
    role: 'Supervisor',
    status: 'on-break',
    image: 'https://picsum.photos/200/200?random=3',
    callsHandled: 203,
  },
  {
    id: '4',
    name: 'Carlos Díaz',
    role: 'Agente Support',
    status: 'active',
    image: 'https://picsum.photos/200/200?random=4',
    callsHandled: 56,
  },
];

export const callsMockData: Call[] = [
  {
    id: '1',
    clientName: 'Tech Solutions Inc',
    duration: '12:34',
    status: 'completed',
    image: 'https://picsum.photos/200/200?random=5',
    date: '2025-04-27',
  },
  {
    id: '2',
    clientName: 'Digital Marketing Co',
    duration: '08:15',
    status: 'completed',
    image: 'https://picsum.photos/200/200?random=6',
    date: '2025-04-26',
  },
  {
    id: '3',
    clientName: 'Global Trade Ltd',
    duration: '05:42',
    status: 'missed',
    image: 'https://picsum.photos/200/200?random=7',
    date: '2025-04-26',
  },
  {
    id: '4',
    clientName: 'Finance Plus Group',
    duration: '03:20',
    status: 'in-progress',
    image: 'https://picsum.photos/200/200?random=8',
    date: '2025-04-27',
  },
];

export const clientsMockData: Client[] = [
  {
    id: '1',
    name: 'Empresa ABC Networks',
    email: 'contact@abcnetworks.com',
    status: 'vip',
    image: 'https://picsum.photos/200/200?random=9',
    joinDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'StartUp Innovación',
    email: 'hello@startupinno.com',
    status: 'regular',
    image: 'https://picsum.photos/200/200?random=10',
    joinDate: '2024-06-22',
  },
  {
    id: '3',
    name: 'Enterprise Systems',
    email: 'admin@enterprisesys.com',
    status: 'vip',
    image: 'https://picsum.photos/200/200?random=11',
    joinDate: '2022-11-08',
  },
  {
    id: '4',
    name: 'Local Shop Supply',
    email: 'info@localshop.com',
    status: 'inactive',
    image: 'https://picsum.photos/200/200?random=12',
    joinDate: '2021-03-19',
  },
];

export const campaignsMockData: Campaign[] = [
  {
    id: '1',
    name: 'Black Friday 2025',
    description: 'Campaña de descuentos especiales',
    status: 'active',
    image: 'https://picsum.photos/200/200?random=13',
    progress: 75,
  },
  {
    id: '2',
    name: 'Reactivación de Clientes',
    description: 'Recuperación de cuentas inactivas',
    status: 'active',
    image: 'https://picsum.photos/200/200?random=14',
    progress: 45,
  },
  {
    id: '3',
    name: 'Upgrade Premium',
    description: 'Programa de expansión de servicios',
    status: 'paused',
    image: 'https://picsum.photos/200/200?random=15',
    progress: 30,
  },
  {
    id: '4',
    name: 'Satisfacción Cliente Q1',
    description: 'Encuesta de satisfacción trimestral',
    status: 'completed',
    image: 'https://picsum.photos/200/200?random=16',
    progress: 100,
  },
];
