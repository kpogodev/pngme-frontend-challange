'use client'

import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { TrendingUp, TrendingDown, CircleAlert, SearchX } from 'lucide-react'

import { alphavantageApi } from '@/services'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

function StockSymbol({ symbol, isLoading }: { symbol?: string; isLoading: boolean }) {
  return (
    <div className="flex items-center justify-between p-5">
      <h2 className="text-xl text-muted-foreground">Stock Symbol</h2>
      <span className="!space-y-0 text-xl font-bold">{isLoading ? <Skeleton className="h-7 w-20" /> : symbol}</span>
    </div>
  )
}

function StockPrice({ price, change, isLoading }: { price?: string; change?: string; isLoading: boolean }) {
  const changeValue = parseFloat(change || '0')

  return (
    <div className="col-span-4 flex flex-col justify-center p-5 pr-0">
      <span className="text-muted-foreground">Current Price</span>
      <span className="flex items-center text-2xl font-bold leading-loose">
        {isLoading ? <Skeleton className="h-12 w-36" /> : price}
        {changeValue > 0 && !isLoading ? (
          <TrendingUp className="ml-1 inline-block h-6 w-6 text-green-500" />
        ) : changeValue < 0 && !isLoading ? (
          <TrendingDown className="ml-1 inline-block h-6 w-6 text-red-500" />
        ) : null}
      </span>
    </div>
  )
}

function StockInfo({ label, value, isLoading }: { label: string; value?: string; isLoading: boolean }) {
  return (
    <div className="flex w-full justify-between gap-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-bold">{isLoading ? <Skeleton className="h-5 w-16" /> : value}</span>
    </div>
  )
}

function ErrorState({ error }: { error: Error }) {
  return (
    <div className="flex w-full max-w-sm items-center gap-2 rounded-lg border bg-card p-5 text-destructive">
      <CircleAlert className="h-5 w-5" />
      {error.message}
    </div>
  )
}

function NotFoundState() {
  return (
    <div className="flex w-full max-w-sm items-center gap-2 rounded-lg border bg-card p-5">
      <SearchX className="h-5 w-5" />
      Stock information not found.
    </div>
  )
}

export function StockCard() {
  const searchParams = useSearchParams()
  const searchParamsSymbol = searchParams.get('stock_symbol')

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['stock-info', searchParamsSymbol],
    queryFn: () => alphavantageApi.getRealTimeStockInfo(searchParamsSymbol!),
    enabled: !!searchParamsSymbol,
    staleTime: 0,
    retry: false,
  })

  const isNotFound = data && !Object.keys(data).length

  if (!searchParamsSymbol && !data && !isLoading) return null
  if (isError) return <ErrorState error={error} />
  if (isNotFound) return <NotFoundState />

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-0">
        <StockSymbol
          symbol={data?.symbol}
          isLoading={isLoading}
        />
        <Separator />
        <div className="grid grid-cols-8">
          <StockPrice
            price={data?.price}
            change={data?.change}
            isLoading={isLoading}
          />
          <div className="col-span-4 flex flex-col items-end justify-between gap-1 p-5 text-sm">
            <StockInfo
              label="CLOSE"
              value={data?.previous_close}
              isLoading={isLoading}
            />
            <StockInfo
              label="HIGH"
              value={data?.high}
              isLoading={isLoading}
            />
            <StockInfo
              label="LOW"
              value={data?.low}
              isLoading={isLoading}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
