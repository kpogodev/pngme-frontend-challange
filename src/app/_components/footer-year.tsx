'use client'

// It's separated into client component to ensure the year is up-to-date when page is staticly generated
export function FooterYear() {
  return <span>{new Date().getFullYear()}</span>
}
