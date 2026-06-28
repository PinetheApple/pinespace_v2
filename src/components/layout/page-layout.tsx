import { NavBar } from './navbar'
import { Footer } from './footer'
import { BackToTop } from '@ui'

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="pt-14">{children}</main>
      <Footer />
      <BackToTop />
    </>
  )
}
