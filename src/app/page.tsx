import { Suspense } from 'react'

import { DotPattern } from '@/components/magicui/dot-pattern'
import { cn } from '@/lib/utils'
import { SearchBar } from './_components/search-bar'
import { SearchBarFallback } from './_components/search-bar-fallback'

export default function Home() {
  return (
    <main className="relative container py-10 flex-1 z-0 sm:grid sm:place-items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-center">Stock Price Viewer</h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-center mt-2">
          Search and view real-time stock price information
        </p>
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
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
