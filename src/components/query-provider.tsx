'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/get-query-client'

type QueryProviderProps = Readonly<{
  children: React.ReactNode | React.ReactNode[]
}>

export function QueryProvider({ children }: QueryProviderProps) {
  const queryClient = getQueryClient()
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
