'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme()

  const handleClick = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="ml-auto overflow-hidden relative"
      onClick={handleClick}
    >
      <Sun className="h-5 w-5 absolute inset-0 m-auto dark:translate-y-12 transition-transform" />
      <Moon className="h-5 w-5 absolute inset-0 m-auto -translate-y-12 dark:translate-y-0 transition-transform" />
      <span className="sr-only">Dark Mode Toggle</span>
    </Button>
  )
}
