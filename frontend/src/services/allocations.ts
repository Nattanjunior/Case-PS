import { api } from '../lib/axios'

export async function getAllocationsByClient(clientId: string) {
  const response = await api.get(`/clients/${clientId}/allocations`)
  return response.data
}

export async function createAllocation(clientId: string, data: { assetId: string, quantidade: number, valorInvestido: number }) {
  const response = await api.post(`/clients/${clientId}/allocations`, data)
  return response.data
}

export async function updateAllocation(clientId: string, allocationId: string, data: { quantidade: number, valorInvestido: number }) {
  const response = await api.put(`/clients/${clientId}/allocations/${allocationId}`, data)
  return response.data
}

export async function deleteAllocation(clientId: string, allocationId: string) {
  await api.delete(`/clients/${clientId}/allocations/${allocationId}`)
} 