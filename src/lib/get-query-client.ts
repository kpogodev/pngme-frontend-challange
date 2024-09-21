import { isServer, QueryClient } from '@tanstack/react-query'

const makeQueryClient = () => new QueryClient()

let browserQueryClient: QueryClient | undefined = undefined

export const getQueryClient = () => {
  // Server: always make a new query client
  if (isServer) return makeQueryClient()

  // Client: reuse the same query client if already created
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}
