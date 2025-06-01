import { api } from '@/lib/axios'
import { Client, CreateClientDTO, UpdateClientDTO } from '@/types'

export const clientsService = {
  list: async () => {
    const response = await api.get<Client[]>('/clients')
    return response.data
  },

  create: async (data: CreateClientDTO) => {
    const response = await api.post<Client>('/clients', data)
    return response.data
  },

  update: async (id: string, data: UpdateClientDTO) => {
    const response = await api.put<Client>(`/clients/${id}`, data)
    return response.data
  },

  delete: async (id: string) => {
    await api.delete(`/clients/${id}`)
  }
} 