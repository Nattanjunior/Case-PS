'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ControllerRenderProps } from 'react-hook-form'
import { useEffect } from 'react'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Client } from '@/types'

const formSchema = z.object({
  name: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres.' }),
  email: z.string().email({ message: 'Email inválido.' }),
  status: z.enum(['ACTIVE', 'INACTIVE'], { message: 'Status inválido.' }),
})

type ClientFormValues = z.infer<typeof formSchema>

interface ClientFormModalProps {
  isOpen: boolean
  onClose: () => void
  client?: Client | null // Para edição
  onSubmit: (values: ClientFormValues) => Promise<void>
  isLoading: boolean
}

export function ClientFormModal({
  isOpen,
  onClose,
  client,
  onSubmit,
  isLoading,
}: ClientFormModalProps) {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: client ? { name: client.name, email: client.email, status: client.status } : { name: '', email: '', status: 'ACTIVE' },
  })

  // Atualiza os valores do formulário ao abrir para edição
  useEffect(() => {
    if (client) {
      form.reset({ name: client.name, email: client.email, status: client.status })
    } else {
      form.reset({ name: '', email: '', status: 'ACTIVE' })
    }
  }, [client, isOpen])

  const handleFormSubmit = async (values: ClientFormValues) => {
    await onSubmit(values)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[430px] rounded-2xl shadow-2xl border border-gray-200 bg-white dark:bg-zinc-900 p-8 relative animate-in fade-in zoom-in">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          aria-label="Fechar"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>
        <DialogHeader className="flex flex-row items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <DialogTitle className="text-2xl font-bold">
              {client ? 'Editar Cliente' : 'Novo Cliente'}
            </DialogTitle>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold select-none shadow-sm border ${
              (client?.status ?? form.watch('status')) === 'ACTIVE'
                ? 'bg-green-100 text-green-700 border-green-200'
                : 'bg-red-100 text-red-700 border-red-200'
            }`}>
              {(client?.status ?? form.watch('status')) === 'ACTIVE' ? 'Ativo' : 'Inativo'}
            </span>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }: { field: ControllerRenderProps<ClientFormValues, 'name'> }) => (
                <FormItem>
                  <FormLabel className="text-base">Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome do cliente"
                      {...field}
                      className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-zinc-800 dark:border-zinc-700 dark:focus:border-blue-500 dark:focus:ring-blue-900 transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }: { field: ControllerRenderProps<ClientFormValues, 'email'> }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email do cliente"
                      {...field}
                      className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-zinc-800 dark:border-zinc-700 dark:focus:border-blue-500 dark:focus:ring-blue-900 transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }: { field: ControllerRenderProps<ClientFormValues, 'status'> }) => (
                <FormItem>
                  <FormLabel className="text-base">Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-lg border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-zinc-800 dark:border-zinc-700 dark:focus:border-blue-500 dark:focus:ring-blue-900 transition-all">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white dark:bg-zinc-800">
                      <SelectItem value="ACTIVE">Ativo</SelectItem>
                      <SelectItem value="INACTIVE">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 transition-colors shadow-md"
              >
                {client ? 'Salvar Alterações' : 'Criar Cliente'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 