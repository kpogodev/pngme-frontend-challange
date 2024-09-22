import { DarkModeToggle } from './dark-mode-toggle'
import { LogoLink } from './logo-link'

export function Header() {
  return (
    <header className="w-full py-2 xl:py-4">
      <div className="container flex items-center">
        <LogoLink />
        <DarkModeToggle />
      </div>
    </header>
  )
}
