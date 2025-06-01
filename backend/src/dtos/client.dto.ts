import { z } from 'zod'

export const createClientSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE')
})

export const updateClientSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').optional(),
  email: z.string().email('Email inválido').optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional()
})

export type CreateClientDTO = z.infer<typeof createClientSchema>
export type UpdateClientDTO = z.infer<typeof updateClientSchema> 