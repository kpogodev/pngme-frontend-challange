import { DotPattern } from '@/components/magicui/dot-pattern'
import { cn } from '@/lib/utils'

export default function Home() {
  return (
    <main className="container grid place-items-center flex-1 relative z-0">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-6xl font-extrabold text-center">Stock Price Viewer</h1>
        <p className="text-lg text-muted-foreground text-center">Search and view real-time stock price information</p>
      </div>
      <DotPattern
        width={32}
        height={32}
        cr={2}
        className={cn('[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]', '-z-10 opacity-70')}
      />
    </main>
  )
}
