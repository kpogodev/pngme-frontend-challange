type PageHeaderProps = {
  title: string
  description: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col items-center sm:gap-2">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-center">{title}</h1>
      <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-center mt-2">{description}</p>
    </div>
  )
}
