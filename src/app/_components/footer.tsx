import { FooterYear } from './footer-year'

export function Footer() {
  return (
    <footer className="mt-auto flex py-2 xl:py-4">
      <p className="mx-auto capitalize">
        all rights reserved &copy; <FooterYear />
      </p>
    </footer>
  )
}
