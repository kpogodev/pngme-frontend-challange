import { Skeleton } from '@/components/ui/skeleton'

export function SearchBarFallback() {
  return (
    <div className="flex flex-col w-96 gap-2 mt-10">
      <Skeleton className="w-1/2 h-5" />
      <Skeleton className="w-full h-12" />
    </div>
  )
}
