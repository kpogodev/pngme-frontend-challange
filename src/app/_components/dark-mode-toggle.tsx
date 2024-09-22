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
      className="relative ml-auto overflow-hidden"
      onClick={handleClick}
    >
      <Sun className="absolute inset-0 m-auto h-5 w-5 transition-transform dark:translate-y-12" />
      <Moon className="absolute inset-0 m-auto h-5 w-5 -translate-y-12 transition-transform dark:translate-y-0" />
      <span className="sr-only">Dark Mode Toggle</span>
    </Button>
  )
}
