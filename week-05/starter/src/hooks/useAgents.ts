import { useQuery } from '@tanstack/react-query'
import api from '../services/api'
import { Agent } from '../types'

interface JsonPlaceholderUser {
  id: number
  name: string
  email: string
  phone: string
  company: { name: string }
}

const ROLES = ['Agente', 'Supervisor', 'Manager']
const DEPARTMENTS = ['Ventas', 'Soporte Técnico', 'Retención', 'Cobranzas']
const STATUSES: Agent['status'][] = ['active', 'busy', 'offline']

function toAgent(user: JsonPlaceholderUser): Agent {
  const i = user.id % 3
  return {
    id: String(user.id),
    name: user.name,
    role: ROLES[i],
    department: DEPARTMENTS[i % DEPARTMENTS.length],
    phone: user.phone,
    email: user.email,
    status: STATUSES[i % STATUSES.length],
    createdAt: new Date().toISOString(),
  }
}

export function useAgents() {
  return useQuery<Agent[]>({
    queryKey: ['agents'],
    queryFn: async () => {
      const { data } = await api.get<JsonPlaceholderUser[]>('/users')
      return data.map(toAgent)
    },
  })
}

export function useAgent(id: string) {
  return useQuery<Agent>({
    queryKey: ['agents', id],
    queryFn: async () => {
      const { data } = await api.get<JsonPlaceholderUser>('/users/' + id)
      return toAgent(data)
    },
  })
}
