type PageHeaderProps = {
  title: string
  description: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col items-center sm:gap-2">
      <h1 className="text-center text-3xl font-extrabold sm:text-5xl lg:text-6xl">{title}</h1>
      <p className="mt-2 text-center text-sm text-muted-foreground sm:text-base md:text-lg">{description}</p>
    </div>
  )
}
