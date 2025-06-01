import { z } from 'zod'

export const createAssetSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  value: z.number().positive('Valor deve ser positivo')
})

export const updateAssetSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').optional(),
  value: z.number().positive('Valor deve ser positivo').optional()
})

export type CreateAssetDTO = z.infer<typeof createAssetSchema>
export type UpdateAssetDTO = z.infer<typeof updateAssetSchema> 