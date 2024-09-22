import { Suspense } from 'react'

import { cn } from '@/lib/utils'
import { DotPattern } from '@/components/magicui/dot-pattern' // Decorative SVG pattern
import { PageHeader } from './_components/page-header'
import { SearchBar } from './_components/search-bar'
import { SearchBarFallback } from './_components/search-bar-fallback'
import { StockCard } from './_components/stock-card'

export default function Home() {
  return (
    <main className="container relative z-0 flex-1 py-10 lg:grid lg:place-items-center">
      <div className="flex flex-col items-center gap-5 sm:gap-10">
        <PageHeader
          title="Stock Price Viewer"
          description="Enter a stock symbol to view real-time price information"
        />
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
        <Suspense fallback={null}>
          <StockCard />
        </Suspense>
      </div>
      <DotPattern
        width={16}
        height={16}
        cr={4}
        className={cn('[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]', '-z-10 opacity-10')}
      />
    </main>
  )
}
