import { api } from '@/lib/axios'
import { Asset, CreateAssetDTO, UpdateAssetDTO } from '@/types'

export const assetsService = {
  list: async () => {
    const response = await api.get<Asset[]>('/assets')
    return response.data
  },

  listByClient: async (clientId: string) => {
    const response = await api.get<Asset[]>(`/clients/${clientId}/assets`)
    return response.data
  },

  create: async (clientId: string, data: CreateAssetDTO) => {
    const response = await api.post<Asset>(`/clients/${clientId}/assets`, data)
    return response.data
  },

  update: async (clientId: string, assetId: string, data: UpdateAssetDTO) => {
    const response = await api.put<Asset>(`/clients/${clientId}/assets/${assetId}`, data)
    return response.data
  },

  delete: async (clientId: string, assetId: string) => {
    await api.delete(`/clients/${clientId}/assets/${assetId}`)
  }
} 