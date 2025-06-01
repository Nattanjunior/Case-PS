'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()

  const navLinks = [
    { href: '/clients', label: 'Clientes' },
    { href: '/assets', label: 'Ativos Financeiros' },
  ]

  return (
    <header className="bg-gray-100 dark:border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto flex items-center px-10">
        {/* Logo ou Título */}
        <div className="flex items-center gap-2">
          <span className="text-2xl text-blue-600 dark:text-blue-400">🏛️</span>
        </div>

        {/* Navegação */}
        <nav className="flex items-center space-x-4 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors relative group',
                pathname === link.href && 'text-gray-900'
              )}
            >
              {link.label}
              {/* Indicador de aba ativa */}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300" />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
} 