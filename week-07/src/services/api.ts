import axios from 'axios';
import type { CallCenterItem } from '../types';

const api = axios.create({
  timeout: 4000,
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const mockItemsSeed: CallCenterItem[] = [
  {
    id: 'seed-1',
    agentName: 'Ana Torres',
    clientName: 'María Paz',
    campaignName: 'Campaña renovaciones',
    status: 'En llamada',
    priority: 'Alta',
    notes: 'Cliente interesado en plan premium.',
    createdAt: '2026-06-29T09:00:00.000Z',
  },
  {
    id: 'seed-2',
    agentName: 'Luis Vega',
    clientName: 'Carlos Ríos',
    campaignName: 'Campaña fidelización',
    status: 'En espera',
    priority: 'Media',
    notes: 'Se debe confirmar correo de contacto.',
    createdAt: '2026-06-28T15:30:00.000Z',
  },
  {
    id: 'seed-3',
    agentName: 'Sofía Gómez',
    clientName: 'Lucía Mena',
    campaignName: 'Campaña reactivación',
    status: 'Cerrado',
    priority: 'Baja',
    notes: 'Seguimiento finalizado.',
    createdAt: '2026-06-27T11:40:00.000Z',
  },
];

export async function fetchItemsFromApi(): Promise<CallCenterItem[]> {
  const response = await api.get('/posts');
  const rawItems = Array.isArray(response.data) ? response.data : [];

  return rawItems.slice(0, 8).map((post: any, index: number) => ({
    id: String(post.id ?? `${index + 1}`),
    agentName: ['Ana Torres', 'Luis Vega', 'Sofía Gómez', 'Diego Vega'][index % 4],
    clientName: `Cliente ${index + 1}`,
    campaignName: post.title?.slice(0, 24) ?? 'Campaña de seguimiento',
    status: index % 2 === 0 ? 'En espera' : 'En llamada',
    priority: index % 3 === 0 ? 'Alta' : index % 3 === 1 ? 'Media' : 'Baja',
    notes: post.body?.slice(0, 60) ?? 'Seguimiento generado automáticamente para el tablero.',
    createdAt: new Date(Date.now() - index * 3600000).toISOString(),
  }));
}
