import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../services/api'
import { Agent } from '../types'

export function useCreateAgent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: Omit<Agent, 'id' | 'createdAt'>) => {
      const { data } = await api.post<{ id: number }>('/users', {
        name: input.name,
        email: input.email,
        phone: input.phone,
        company: { name: input.department },
      })
      return { ...input, id: String(data.id), createdAt: new Date().toISOString() } as Agent
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] })
    },
  })
}
