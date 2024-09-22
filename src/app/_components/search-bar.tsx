'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDebouncedCallback } from 'use-debounce'

import { alphavantageApi } from '@/services'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverAnchor } from '@/components/ui/popover'
import { SearchDropdownContent } from './search-dropdown-content'

/**
 * @constant {number} QUERY_STALE_TIME
 * The time in milliseconds before the query is considered stale.
 *
 * Although requriements clearly state that we should get real-time data,
 * I've set the stale time to 60 seconds to reduce the number of requests as it was
 * quickly exhausting the API rate limits during development (25 requests per day).
 *
 * Moreover, it would be actually better to cache the data for a longer period of time
 * as the only edge case I can think of is when the user is searching for a stock that
 * was just listed during the ongoing session of THIS particular user within the stale time period.
 */
const QUERY_STALE_TIME = 60 * 1000

export function SearchBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [isQueryEnabled, setIsQueryEnabled] = useState<boolean>(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Get search param from URL
  const searchParamStockSymbol = searchParams.get('stock_symbol') ?? undefined

  // useQuery hook to fetch ticker suggestions
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['tickerSuggestions', inputRef.current?.value],
    queryFn: () => {
      setIsQueryEnabled(false) // in previous tanstack version it would run deprecated onSucess callback
      return alphavantageApi.getTickersSuggestions(inputRef.current?.value!)
    },
    enabled: isQueryEnabled,
    staleTime: QUERY_STALE_TIME,
  })

  // Debounce search query enabling to throttle the number of requests
  const debouncedEnableSearchQuery = useDebouncedCallback(() => {
    setIsQueryEnabled(true)
  }, 500)

  // Handle search input change and side effects
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()

    // Close dropdown if input is empty
    setIsDropdownOpen(!!value)

    // Disable search query if input is empty and clear search param
    if (!value && searchParamStockSymbol) {
      setIsQueryEnabled(false)
      return router.push('/')
    }

    // Early return if input is empty to avoid unnecessary requests
    if (!value) return

    // Enable search query after debouncing
    debouncedEnableSearchQuery()
  }

  // Control popover visibility on input focus
  const handleSearchInputFocus = () => setIsDropdownOpen(!!inputRef.current?.value)

  // Synchronize searchParam state with input value and query enabling
  useEffect(() => {
    if (searchParamStockSymbol && searchParamStockSymbol.trim().length) {
      inputRef.current!.value = searchParamStockSymbol
      setIsQueryEnabled(true)
    }
  }, [searchParamStockSymbol])

  return (
    <div className="w-[90vw] max-w-96">
      <Popover
        open={isDropdownOpen}
        onOpenChange={setIsDropdownOpen}
      >
        <PopoverAnchor asChild>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="search"
              className="text-xs lg:text-sm font-medium"
            >
              Search by Stock Symbol or Company Name
            </label>
            <Input
              ref={inputRef}
              id="search"
              type="search"
              autoComplete="off"
              defaultValue={searchParamStockSymbol}
              onChange={handleSearchInputChange}
              onFocus={handleSearchInputFocus}
              placeholder="e.g. AAPL, Apple Inc."
              className="w-full h-12"
            />
          </div>
        </PopoverAnchor>
        <PopoverContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          sideOffset={8}
          avoidCollisions={false}
          className="w-[90vw] max-w-96 p-0 shadow-md rounded-xl overflow-hidden"
        >
          <SearchDropdownContent
            data={data}
            isError={isError}
            isLoading={isLoading}
            error={error}
            handleClose={setIsDropdownOpen}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
