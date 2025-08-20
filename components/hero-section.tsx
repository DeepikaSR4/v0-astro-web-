"use client"

import { Button } from "@/components/ui/button"
import { Stars, Sparkles } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"

export function HeroSection() {
  const { user } = useAuth()

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 text-primary/20">
          <Stars className="h-8 w-8 animate-pulse" />
        </div>
        <div className="absolute top-40 right-20 text-primary/20">
          <Sparkles className="h-6 w-6 animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        <div className="absolute bottom-20 left-20 text-primary/20">
          <Stars className="h-10 w-10 animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
        <div className="absolute bottom-40 right-10 text-primary/20">
          <Sparkles className="h-8 w-8 animate-pulse" style={{ animationDelay: "0.5s" }} />
        </div>
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-6">
            <Stars className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            AstroWeb
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Ask the stars, get your answers.
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            Discover insights about your love life, career path, and financial future through personalized astrology
            consultations powered by cosmic wisdom.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {user ? (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Welcome back, {user.name}! You have {user.chatsLeft} free consultations remaining.
              </p>
              <Button size="lg" className="px-8 py-6 text-lg" asChild>
                <Link href="#consultations">Start Your Reading</Link>
              </Button>
            </div>
          ) : (
            <>
              <Button size="lg" className="px-8 py-6 text-lg" asChild>
                <Link href="/login">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg bg-transparent" asChild>
                <Link href="#consultations">Explore Services</Link>
              </Button>
            </>
          )}
        </div>

        {!user && (
          <p className="text-sm text-muted-foreground mt-6">
            Start with 3 free consultations • No credit card required
          </p>
        )}
      </div>
    </section>
  )
}
