import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { CaretDownIcon } from '@phosphor-icons/react'
import { site } from '@config/site'
import { Burger, Drawer } from '@ui'
import { ProjectsMenu, WritingMenu } from './nav-menu'
import { Container } from './container'
import { cn } from '@utils/cn'

type NavItem = (typeof site.nav)[number]
type MenuKind = Extract<NavItem, { menu: string }>['menu']

function hasMenu(item: NavItem): item is Extract<NavItem, { menu: string }> {
  return 'menu' in item
}

const MENUS: Record<
  MenuKind,
  (props: { onNavigate?: () => void }) => React.ReactNode
> = {
  projects: ProjectsMenu,
  writing: WritingMenu,
}

export function NavBar() {
  const [drawer, setDrawer] = useState(false)
  const [openMenu, setOpenMenu] = useState<MenuKind | null>(null)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="absolute inset-0 border-b border-line bg-well/80 backdrop-blur-md" />
        <Container className="relative flex h-14 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-mono text-sm font-medium tracking-widest text-violet-400 uppercase transition-colors hover:text-violet-300"
          >
            <img
              src="/favicon.gif"
              alt=""
              aria-hidden
              className="size-5 rounded-sm"
            />
            {site.handle}
          </Link>

          <nav
            className="relative hidden md:block"
            onMouseLeave={() => setOpenMenu(null)}
          >
            <div className="flex items-center gap-1">
              {site.nav.map((item) =>
                hasMenu(item) ? (
                  <MenuTrigger
                    key={item.label}
                    item={item}
                    active={openMenu === item.menu}
                    onOpen={() => setOpenMenu(item.menu)}
                  />
                ) : (
                  <NavLink key={item.label} item={item} />
                ),
              )}
            </div>

            <div
              className={cn(
                'absolute right-0 top-full pt-2 transition-all ease-nocturne',
                openMenu
                  ? 'pointer-events-auto translate-y-0 opacity-100'
                  : 'pointer-events-none -translate-y-1 opacity-0',
              )}
            >
              <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-2">
                {openMenu &&
                  MENUS[openMenu]({ onNavigate: () => setOpenMenu(null) })}
              </div>
            </div>
          </nav>

          <Burger
            open={drawer}
            onClick={() => setDrawer((v) => !v)}
            className="md:hidden"
          />
        </Container>
      </header>

      <Drawer open={drawer} onClose={() => setDrawer(false)}>
        <div className="mb-8 flex items-center justify-between">
          <span className="font-mono text-sm font-medium tracking-widest text-violet-400 uppercase">
            {site.handle}
          </span>
          <Burger open onClick={() => setDrawer(false)} />
        </div>
        <nav className="flex flex-col">
          {site.nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={'hash' in item ? item.hash : undefined}
              onClick={() => setDrawer(false)}
              activeOptions={{ exact: item.to === '/' }}
              className="border-b border-line py-4 font-display text-2xl font-semibold text-ink transition-all hover:pl-2 hover:text-violet-300"
              activeProps={{ className: 'text-violet-400' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Drawer>
    </>
  )
}

function MenuTrigger({
  item,
  active,
  onOpen,
}: {
  item: Extract<NavItem, { menu: string }>
  active: boolean
  onOpen: () => void
}) {
  return (
    <Link
      to={item.to}
      onMouseEnter={onOpen}
      onFocus={onOpen}
      className={cn(
        'flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
        active
          ? 'bg-surface text-ink'
          : 'text-muted hover:bg-surface hover:text-ink',
      )}
    >
      {item.label}
      <CaretDownIcon
        size={13}
        weight="bold"
        className={cn('transition-transform', active && 'rotate-180')}
      />
    </Link>
  )
}

function NavLink({ item }: { item: NavItem }) {
  return (
    <Link
      to={item.to}
      hash={'hash' in item ? item.hash : undefined}
      activeOptions={{ exact: item.to === '/' }}
      className="rounded-md px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-ink"
      activeProps={{ className: 'text-ink bg-surface' }}
    >
      {item.label}
    </Link>
  )
}
