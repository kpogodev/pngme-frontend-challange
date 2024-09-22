import Image from 'next/image'
import Link from 'next/link'

export function LogoLink() {
  return (
    <Link
      href="/"
      className="flex items-center gap-1 text-2xl font-extrabold text-muted-foreground"
    >
      <Image
        src="logo.svg"
        width={32}
        height={32}
        alt="Logo"
      />
      <span className="text-slate-900 dark:text-slate-100">S</span>
      <span className="text-slate-800 dark:text-slate-200">P</span>
      <span className="text-slate-700 dark:text-slate-300">V</span>
      <span className="sr-only">Logo link to homepage</span>
    </Link>
  )
}
