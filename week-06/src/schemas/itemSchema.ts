import { z } from 'zod';

export const agentSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  campaign: z.string().min(2, 'La campaña es obligatoria'),
  client: z.string().min(2, 'El cliente es obligatorio'),
  calls: z.number().int().min(0, 'Las llamadas deben ser un número entero mayor o igual a 0'),
  status: z.string().min(1, 'El estado es obligatorio'),
});

export type AgentFormData = z.infer<typeof agentSchema>;
