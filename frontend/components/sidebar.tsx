"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"

const nav = [
  { href: "/", label: "Генерация", icon: "🎬" },
  { href: "/platforms", label: "Платформы", icon: "📡" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 min-h-screen flex flex-col" style={{ background: "#F0E8DF", borderRight: "1px solid #E0D3C8" }}>
      <div className="p-5" style={{ borderBottom: "1px solid #E0D3C8" }}>
        <div className="text-lg font-bold" style={{ color: "#6B1A2A" }}>🚀 Space Scarface</div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
            )}
            style={pathname === item.href
              ? { background: "#6B1A2A", color: "#FAF7F2" }
              : { color: "#7A4E57" }
            }
            onMouseEnter={e => { if (pathname !== item.href) (e.currentTarget as HTMLElement).style.background = "#E5D5CB" }}
            onMouseLeave={e => { if (pathname !== item.href) (e.currentTarget as HTMLElement).style.background = "transparent" }}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-3" style={{ borderTop: "1px solid #E0D3C8" }}>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
          style={{ color: "#7A4E57" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#E5D5CB"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
        >
          <span>🚪</span> Выйти
        </button>
      </div>
    </aside>
  )
}
