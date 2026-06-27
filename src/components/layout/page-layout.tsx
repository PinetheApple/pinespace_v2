import { NavBar } from './navbar'
import { Footer } from './footer'

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="pt-14">{children}</main>
      <Footer />
    </>
  )
}
