import { prisma } from '../lib/prisma'


export async function isEmailUnique(email: string): Promise<boolean> {
  const existingClient = await prisma.client.findUnique({
    where: { email }
  })

  return !existingClient
}

export async function validateEmail(email: string): Promise<{ isValid: boolean; message?: string }> {
  if (!email) {
    return { isValid: false, message: 'Email é obrigatório' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Formato de email inválido' }
  }

  const isUnique = await isEmailUnique(email)
  if (!isUnique) {
    return { isValid: false, message: 'Não foi possível processar este e-mail. Tente novamente ou use outro.' }
  }

  return { isValid: true }
}
