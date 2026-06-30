import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAgents, fetchAgentById, createAgent, updateAgent } from '../services/api';
import { CreateAgentPayload, UpdateAgentPayload } from '../types';

export const useItems = () =>
  useQuery({
    queryKey: ['agents'],
    queryFn: fetchAgents,
  });

export const useItemById = (id?: string) =>
  useQuery({
    queryKey: ['agents', id],
    queryFn: () => fetchAgentById(id!),
    enabled: Boolean(id),
  });

export const useCreateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateAgentPayload) => createAgent(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['agents'] }),
  });
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateAgentPayload }) =>
      updateAgent(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['agents'] }),
  });
};
