import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Sparkles, Heart, Briefcase, DollarSign, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-amber-50 to-background dark:from-amber-950/20 dark:to-background">
          <div className="container mx-auto max-w-4xl text-center space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sparkles className="w-10 h-10 text-amber-500" />
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  AstroWeb
                </h1>
                <Sparkles className="w-10 h-10 text-amber-500" />
              </div>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light">
                Ask the stars, get your answers.
              </p>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Welcome to AstroWeb, your cosmic guide to life's biggest questions. Whether you're seeking clarity on
              matters of the heart, career decisions, or financial guidance, our AI-powered astrology consultants are
              here to illuminate your path.
            </p>

            <Link href="/chat">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                Start Your Cosmic Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-16">Our Consultations</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Love */}
              <div className="p-8 rounded-2xl border border-border hover:border-amber-300 dark:hover:border-amber-700 transition-colors bg-card hover:bg-accent/50">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-8 h-8 text-rose-500" />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Love</h3>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                  Discover insights about your romantic journey, relationships, and matters of the heart guided by
                  celestial wisdom.
                </p>
              </div>

              {/* Career */}
              <div className="p-8 rounded-2xl border border-border hover:border-amber-300 dark:hover:border-amber-700 transition-colors bg-card hover:bg-accent/50">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="w-8 h-8 text-blue-500" />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Career</h3>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                  Navigate your professional path with cosmic guidance. Find your calling and unlock your true
                  potential.
                </p>
              </div>

              {/* Finance */}
              <div className="p-8 rounded-2xl border border-border hover:border-amber-300 dark:hover:border-amber-700 transition-colors bg-card hover:bg-accent/50">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-8 h-8 text-green-500" />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Finance</h3>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                  Align your financial decisions with the stars. Get guidance on wealth, investments, and prosperity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
          <div className="container mx-auto max-w-2xl text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Ready to Explore Your Destiny?</h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
                Get 3 free consultations to start your cosmic journey. Premium consultations available at ₹15 each.
              </p>
            </div>
            <Link href="/chat">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                Begin Your Reading
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
