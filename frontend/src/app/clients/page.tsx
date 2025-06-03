'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { clientsService } from '@/services/clients'
import { Client } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ClientFormModal } from '@/components/client-form-modal'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Pencil, Trash, AlertTriangle } from 'lucide-react'

export default function ClientsPage() {
  const router = useRouter()
  const { data: clients, isLoading, error, refetch } = useQuery({
    queryKey: ['clients'],
    queryFn: clientsService.list
  })

  const [modalOpen, setModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleNewClient = () => {
    setEditingClient(null)
    setModalOpen(true)
  }

  const handleEditClient = (client: Client) => {
    setEditingClient(client)
    setModalOpen(true)
  }

  const handleDeleteClient = (client: Client) => {
    setClientToDelete(client)
    setDeleteModalOpen(true)
  }

  const confirmDeleteClient = async () => {
    if (!clientToDelete) return
    setIsDeleting(true)
    try {
      await clientsService.delete(clientToDelete.id)
      toast.success('Cliente excluído com sucesso!')
      setDeleteModalOpen(false)
      setClientToDelete(null)
      refetch()
    } catch (e: any) {
      if (e?.response?.data?.error?.includes('violates foreign key constraint')) {
        toast.error('Não é possível excluir um cliente com ativos alocados. Remova as alocações primeiro.')
      } else {
        toast.error('Erro ao excluir cliente')
      }
    } finally {
      setIsDeleting(false)
    }
  }

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true)
    try {
      if (editingClient) {
        await clientsService.update(editingClient.id, values)
        toast.success('Cliente atualizado com sucesso!')
      } else {
        await clientsService.create(values)
        toast.success('Cliente criado com sucesso!')
      }
      setModalOpen(false)
      refetch()
    } catch (e) {
      toast.error('Erro ao salvar cliente')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>Erro ao carregar clientes</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <Button onClick={handleNewClient} className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap">Novo Cliente</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients?.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <span
                        className="cursor-pointer text-blue-600 hover:underline"
                        onClick={() => router.push(`/clients/${client.id}/allocations`)}
                      >
                        {client.name}
                      </span>
                    </TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        client.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {client.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClient(client)}
                          className="text-blue-600 hover:bg-blue-100 hover:text-blue-800"
                          title="Editar"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClient(client)}
                          className="text-red-600 hover:bg-red-100 hover:text-red-800"
                          disabled={isDeleting && clientToDelete?.id === client.id}
                          title="Excluir"
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <ClientFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        client={editingClient}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="max-w-[350px] text-center rounded-2xl shadow-2xl border border-gray-200 bg-white dark:bg-zinc-900 p-8 animate-in fade-in zoom-in">
          <DialogHeader className="flex flex-col items-center">
            <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-2" />
            <DialogTitle>Excluir Cliente</DialogTitle>
          </DialogHeader>
          <div className="mb-4">Tem certeza que deseja excluir o cliente <b>{clientToDelete?.name}</b>?<br />Esta ação não pode ser desfeita.</div>
          <DialogFooter className="flex justify-center gap-2">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)} disabled={isDeleting}>Cancelar</Button>
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={confirmDeleteClient}
              disabled={isDeleting}
            >
              {isDeleting ? 'Excluindo...' : 'Excluir'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 