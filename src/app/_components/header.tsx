import Link from 'next/link'
import { DarkModeToggle } from './dark-mode-toggle'

export function Header() {
  return (
    <header className="w-full py-2 xl:py-4">
      <div className="container flex items-center">
        <Link
          href="/"
          className="font-extrabold text-muted-foreground text-xl"
        >
          LogoPlaceholder
        </Link>
        <DarkModeToggle />
      </div>
    </header>
  )
}
