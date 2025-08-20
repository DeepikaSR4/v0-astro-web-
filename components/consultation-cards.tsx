"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Briefcase, DollarSign, ArrowRight } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const consultations = [
  {
    id: "love",
    title: "Love & Relationships",
    description: "Discover your romantic destiny, compatibility insights, and guidance for matters of the heart.",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    href: "/love",
    features: ["Compatibility Analysis", "Relationship Guidance", "Love Predictions", "Soulmate Insights"],
  },
  {
    id: "career",
    title: "Career & Success",
    description: "Unlock your professional potential with cosmic guidance on career paths and opportunities.",
    icon: Briefcase,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    href: "/career",
    features: ["Career Path Analysis", "Success Timing", "Professional Growth", "Leadership Insights"],
  },
  {
    id: "finance",
    title: "Finance & Wealth",
    description: "Navigate your financial future with astrological insights on money, investments, and prosperity.",
    icon: DollarSign,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    href: "/finance",
    features: ["Wealth Predictions", "Investment Timing", "Financial Planning", "Prosperity Guidance"],
  },
]

export function ConsultationCards() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleConsultationClick = (href: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to access astrology consultations.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (user.chatsLeft <= 0) {
      toast({
        title: "No consultations remaining",
        description: "Purchase more consultations to continue your cosmic journey.",
        variant: "destructive",
      })
      router.push("/pricing")
      return
    }

    router.push(href)
  }

  return (
    <section id="consultations" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Choose Your Cosmic Journey</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the area of your life you'd like to explore through the wisdom of the stars
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {consultations.map((consultation) => {
            const Icon = consultation.icon
            return (
              <Card
                key={consultation.id}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/20"
                onClick={() => handleConsultationClick(consultation.href)}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`inline-flex items-center justify-center p-4 rounded-full mb-4 ${consultation.bgColor}`}
                  >
                    <Icon className={`h-8 w-8 ${consultation.color}`} />
                  </div>
                  <CardTitle className="text-xl font-serif">{consultation.title}</CardTitle>
                  <CardDescription className="text-base">{consultation.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {consultation.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full group-hover:bg-primary/90 transition-colors">
                    Start Consultation
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {user && (
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium">You have {user.chatsLeft} free consultations remaining</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
