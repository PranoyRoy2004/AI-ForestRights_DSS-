'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, FileText, FolderOpen,
  Scale, BarChart3, TreePine, MessageSquare, ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard',    icon: LayoutDashboard, desc: 'Overview & stats' },
  { href: '/claims',    label: 'File Claim',   icon: FileText,        desc: 'New FRA claim' },
  { href: '/cases',     label: 'Case Manager', icon: FolderOpen,      desc: 'Track all cases' },
  { href: '/policy',    label: 'Policy Engine',icon: Scale,           desc: 'FRA 2006 Q&A' },
  { href: '/analytics', label: 'Analytics',    icon: BarChart3,       desc: 'Charts & insights' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-stone-900/90 border-r border-stone-800/60 backdrop-blur-xl z-30 flex flex-col">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 px-5 py-5 border-b border-stone-800/60 hover:bg-stone-800/30 transition-colors">
        <div className="w-8 h-8 rounded-xl bg-green-600 flex items-center justify-center shadow-md shadow-green-900/40 shrink-0">
          <TreePine className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-stone-100 font-semibold text-sm leading-tight">Vanadhikar</div>
          <div className="text-stone-600 text-xs">वनाधिकार DSS</div>
        </div>
      </Link>

      {/* Nav label */}
      <div className="px-5 pt-5 pb-2">
        <span className="text-stone-600 text-xs font-medium uppercase tracking-widest">Navigation</span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon, desc }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-200 group',
                active
                  ? 'bg-green-900/40 text-green-300 border border-green-800/50'
                  : 'text-stone-500 hover:text-stone-200 hover:bg-stone-800/50'
              )}
            >
              <Icon className={cn(
                'w-4 h-4 shrink-0 transition-colors',
                active ? 'text-green-400' : 'text-stone-600 group-hover:text-stone-400'
              )} />
              <div className="flex-1 min-w-0">
                <div className="font-medium leading-tight">{label}</div>
                <div className={cn('text-xs leading-tight mt-0.5', active ? 'text-green-600' : 'text-stone-700')}>{desc}</div>
              </div>
              {active && <ChevronRight className="w-3 h-3 text-green-600 shrink-0" />}
            </Link>
          )
        })}
      </nav>

      {/* AI Chat quick access */}
      <div className="p-4 border-t border-stone-800/60">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 p-3 rounded-xl bg-green-950/40 border border-green-900/40 hover:bg-green-950/70 transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-green-800/40 flex items-center justify-center shrink-0">
            <MessageSquare className="w-4 h-4 text-green-400" />
          </div>
          <div className="min-w-0">
            <div className="text-green-300 text-xs font-semibold">VanadhikarAI</div>
            <div className="text-stone-600 text-xs truncate">Ask about FRA rights</div>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
        </Link>

        <div className="mt-3 px-1 flex items-center justify-between">
          <span className="text-stone-800 text-xs">v1.0.0</span>
          <span className="text-stone-800 text-xs">Claude AI</span>
        </div>
      </div>
    </aside>
  )
}