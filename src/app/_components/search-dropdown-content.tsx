'use client'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Search, LoaderCircle, CircleAlert, SearchX } from 'lucide-react'
import { PopoverClose } from '@/components/ui/popover'

import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { createQueryString } from '@/utils/create-query-string'
import type { Ticker } from '@/types'

type SearchDropdownContentProps = {
  isLoading: boolean
  isError: boolean
  error: Error | null
  data: Ticker[] | undefined
}

function LoadingState() {
  return (
    <div className="flex items-center text-sm p-3 gap-2">
      <LoaderCircle className="w-5 h-5 animate-spin" />
      Searching...
    </div>
  )
}

function ErrorState({ error }: { error: Error }) {
  return (
    <div className="flex items-center gap-2 p-3 text-sm text-destructive">
      <CircleAlert className="w-5 h-5" />
      {error.message}
    </div>
  )
}

function NoResultsState() {
  return (
    <div className="flex items-center gap-2 p-3 text-sm">
      <SearchX className="w-5 h-5" />
      No results found.
    </div>
  )
}

export function SearchDropdownContent({ isLoading, isError, error, data }: SearchDropdownContentProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const dataNoRecords = Array.isArray(data) && data.length === 0

  const handleSetStockSymbol = (event: React.KeyboardEvent | React.MouseEvent, symbol: Ticker['symbol']) => {
    // If the event is a keydown event, only proceed if the key is Enter
    if (event.type === 'keydown' && (event as React.KeyboardEvent).key !== 'Enter') return

    // Create a new query string with the stock symbol and push it to the router
    const queryString = createQueryString(searchParams, 'stock_symbol', symbol)
    router.push(`${pathname}?${queryString}`)
  }

  // Return different states based on isLoading, isError, and data values
  if (data === undefined && !isLoading && !isError) return null
  if (isLoading) return <LoadingState />
  if (isError && error) return <ErrorState error={error} />
  if (dataNoRecords) return <NoResultsState />

  return (
    <ScrollArea className={cn('w-full', data?.length! > 4 && 'h-48')}>
      <ul
        className="w-full flex flex-col"
        role="combobox"
      >
        {data?.map((ticker) => (
          <PopoverClose
            key={ticker.symbol}
            asChild
          >
            <li
              className="flex justify-between items-center p-3 gap-2 text-xs cursor-pointer transition-colors hover:bg-muted focus-visible:outline-none   focus-visible:bg-muted"
              onClick={(e) => handleSetStockSymbol(e, ticker.symbol)}
              onKeyDown={(e) => handleSetStockSymbol(e, ticker.symbol)}
              role="option"
              tabIndex={0}
            >
              <div className="flex items-center">
                <Search className="min-w-3 w-3 aspect-square mr-2" />
                <span>{ticker.name}</span>
              </div>
              <div>({ticker.symbol})</div>
            </li>
          </PopoverClose>
        ))}
      </ul>
    </ScrollArea>
  )
}
