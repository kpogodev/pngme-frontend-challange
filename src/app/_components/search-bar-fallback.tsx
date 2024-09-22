import { Skeleton } from '@/components/ui/skeleton'

export function SearchBarFallback() {
  return (
    <div className="mt-10 flex w-96 flex-col gap-2">
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-12 w-full" />
    </div>
  )
}
