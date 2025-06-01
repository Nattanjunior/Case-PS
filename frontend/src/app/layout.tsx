import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sistema de Investimentos',
  description: 'Sistema para gerenciamento de clientes e ativos financeiros',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          <main className="container mx-auto py-8">
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
} 