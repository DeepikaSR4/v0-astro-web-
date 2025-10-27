"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { Stars, Sparkles, CreditCard, User, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function Navbar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: Stars },
    { href: "/chat", label: "Chat", icon: Sparkles },
    { href: "/pricing", label: "Pricing", icon: CreditCard },
  ]

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Stars className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-serif font-bold">AstroWeb</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center space-x-2">
                <Link href="/pricing">
                  <span className="text-sm text-muted-foreground">{user.chatsLeft} chats left</span>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-1" />
                    Profile
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background/50 backdrop-blur">
            <div className="px-4 py-4 space-y-3">
              {/* Mobile Navigation Items */}
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors",
                      pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}

              <div className="border-t pt-3 mt-3 space-y-3">
                {/* Theme Toggle in Mobile Menu */}
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm font-medium">Theme</span>
                  <ThemeToggle />
                </div>

                {/* Mobile Auth Section */}
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-muted-foreground hover:bg-accent transition-colors"
                    >
                      <User className="h-5 w-5" />
                      <span className="font-medium">Profile</span>
                    </Link>
                    <Link
                      href="/pricing"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-muted-foreground hover:bg-accent transition-colors"
                    >
                      <span className="text-sm font-medium">{user.chatsLeft} chats left</span>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => {
                        logout()
                        setMobileMenuOpen(false)
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block">
                    <Button className="w-full">Sign In</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
