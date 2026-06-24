"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

const navItems = [
  {
    href: "",
    label: "Tổng quan",
    emoji: "🏠",
    color: "#8B5CF6",
  },
  {
    href: "/ssg",
    label: "SSG",
    emoji: "📦",
    color: "#10B981",
    desc: "Static Site Generation",
  },
  {
    href: "/ssr",
    label: "SSR",
    emoji: "⚡",
    color: "#F59E0B",
    desc: "Server-Side Rendering",
  },
  {
    href: "/isr",
    label: "ISR",
    emoji: "🔄",
    color: "#6366F1",
    desc: "Incremental Static Regeneration",
  },
  {
    href: "/client",
    label: "CSR",
    emoji: "🖥️",
    color: "#EC4899",
    desc: "Client-Side Rendering",
  },
];

interface Props {
  children: ReactNode;
}

export default function RenderingDemoLayout({ children }: Props) {
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;
  const basePath = `/${locale}/rendering-demo`;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple-600/10 blur-[128px]" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-blue-600/10 blur-[128px]" />
        <div className="absolute -bottom-40 right-1/3 w-96 h-96 rounded-full bg-emerald-600/8 blur-[128px]" />
      </div>

      <div className="relative flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-72 min-h-screen border-r border-white/5 bg-[#0d0d15]/80 backdrop-blur-xl sticky top-0">
          {/* Logo */}
          <div className="p-6 border-b border-white/5">
            <Link href={basePath} className="group flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-lg shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-shadow">
                ⚛️
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight">
                  Next.js 15
                </h1>
                <p className="text-[11px] text-gray-500">Rendering Strategies</p>
              </div>
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const fullHref = `${basePath}${item.href}`;
              const isActive =
                item.href === ""
                  ? pathname === basePath
                  : pathname.startsWith(fullHref);

              return (
                <Link
                  key={item.href}
                  href={fullHref}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? "bg-white/10 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                  style={
                    isActive
                      ? {
                          boxShadow: `0 0 20px ${item.color}15`,
                          borderLeft: `2px solid ${item.color}`,
                        }
                      : {}
                  }
                >
                  <span className="text-lg">{item.emoji}</span>
                  <div>
                    <div>{item.label}</div>
                    {item.desc && (
                      <div className="text-[10px] text-gray-500 group-hover:text-gray-400 transition-colors">
                        {item.desc}
                      </div>
                    )}
                  </div>
                  {isActive && (
                    <div
                      className="ml-auto w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/5">
            <div className="px-4 py-3 rounded-xl bg-white/5 text-xs text-gray-500">
              <p className="font-semibold text-gray-400 mb-1">💡 Mẹo</p>
              <p>
                Reload trang để thấy sự khác biệt giữa các chiến lược rendering!
              </p>
            </div>
          </div>
        </aside>

        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0d0d15]/90 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href={basePath} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-sm">
                ⚛️
              </div>
              <span className="text-sm font-bold">Rendering Demo</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 text-gray-400"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Mobile menu dropdown */}
          {mobileMenuOpen && (
            <nav className="px-4 pb-4 space-y-1 border-t border-white/5 pt-2">
              {navItems.map((item) => {
                const fullHref = `${basePath}${item.href}`;
                const isActive =
                  item.href === ""
                    ? pathname === basePath
                    : pathname.startsWith(fullHref);

                return (
                  <Link
                    key={item.href}
                    href={fullHref}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{item.emoji}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          )}
        </div>

        {/* Main content */}
        <main className="flex-1 min-w-0 lg:max-h-screen lg:overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 mt-14 lg:mt-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
