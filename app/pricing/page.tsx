"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { Check, Star, Zap, MessageCircle, CreditCard, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

const pricingPlans = [
  {
    id: "single",
    name: "Single Consultation",
    price: 15,
    chats: 1,
    description: "Perfect for a quick cosmic insight",
    features: ["1 AI consultation", "Any topic (Love/Career/Finance)", "Instant cosmic guidance", "24/7 availability"],
    popular: false,
  },
  {
    id: "bundle-5",
    name: "Cosmic Bundle",
    price: 60,
    originalPrice: 75,
    chats: 5,
    description: "Best value for regular seekers",
    features: [
      "5 AI consultations",
      "All topics included",
      "Priority cosmic guidance",
      "Save ₹15",
      "Extended validity",
    ],
    popular: true,
  },
  {
    id: "bundle-10",
    name: "Astro Explorer",
    price: 100,
    originalPrice: 150,
    chats: 10,
    description: "For the dedicated cosmic explorer",
    features: ["10 AI consultations", "All topics included", "Premium cosmic insights", "Save ₹50", "Longest validity"],
    popular: false,
  },
]

export default function PricingPage() {
  const { user, addChats } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState<string | null>(null)

  const handlePurchase = async (planId: string, chats: number, price: number) => {
    if (!user) {
      router.push("/login")
      return
    }

    setLoading(planId)

    // Simulate payment processing
    setTimeout(() => {
      addChats(chats)
      setLoading(null)

      toast({
        title: "Purchase successful!",
        description: `${chats} consultation${chats > 1 ? "s" : ""} added to your account.`,
      })

      router.push("/profile")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <h1 className="text-4xl font-serif font-bold mb-4">Choose Your Cosmic Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock the wisdom of the stars with our consultation packages
          </p>

          {user && (
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <MessageCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">You currently have {user.chatsLeft} consultations remaining</span>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan) => (
            <Card key={plan.id} className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-serif">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>

                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold">₹{plan.price}</span>
                    {plan.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">₹{plan.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {plan.chats} consultation{plan.chats > 1 ? "s" : ""} • ₹{Math.round(plan.price / plan.chats)} per
                    chat
                  </p>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handlePurchase(plan.id, plan.chats, plan.price)}
                  disabled={loading === plan.id}
                >
                  {loading === plan.id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Purchase Now
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold mb-8">Why Choose AstroWeb?</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Instant Insights</h3>
              <p className="text-sm text-muted-foreground">Get immediate cosmic guidance whenever you need it</p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Expert Accuracy</h3>
              <p className="text-sm text-muted-foreground">AI-powered readings based on ancient astrological wisdom</p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Personal Touch</h3>
              <p className="text-sm text-muted-foreground">Tailored consultations for your unique cosmic journey</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-center mb-8">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do consultations work?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Simply choose your topic (Love, Career, or Finance), ask your question, and receive personalized
                  cosmic guidance from our AI astrologer, Astro.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do consultations expire?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your purchased consultations never expire. Use them whenever you need cosmic guidance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I get a refund?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We offer a 7-day satisfaction guarantee. If you're not happy with your consultation, contact our
                  support team for a full refund.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
