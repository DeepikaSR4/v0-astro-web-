"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Navbar } from "@/components/navbar"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { User, Mail, MessageCircle, CreditCard, LogOut, Star, Calendar, Activity } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  if (!user) {
    router.push("/login")
    return null
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out successfully",
      description: "You have been signed out of your account.",
    })
    router.push("/")
  }

  const handleBuyChats = () => {
    router.push("/pricing")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">Your Profile</h1>
          <p className="text-muted-foreground">Manage your account and cosmic journey</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account Information
                </CardTitle>
                <CardDescription>Your personal details and account status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{user.email}</p>
                    <p className="text-sm text-muted-foreground">Email Address</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Member since December 2024</p>
                    <p className="text-sm text-muted-foreground">Join Date</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Consultation History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Consultations
                </CardTitle>
                <CardDescription>Your latest cosmic conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-1 bg-red-100 dark:bg-red-900/20 rounded">
                        <MessageCircle className="h-4 w-4 text-red-500" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Love & Relationships</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-1 bg-blue-100 dark:bg-blue-900/20 rounded">
                        <MessageCircle className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Career & Success</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>

                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">Start a new consultation to see more history</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Consultation Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Consultations
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <div className="text-3xl font-bold text-primary mb-1">{user.chatsLeft}</div>
                  <p className="text-sm text-muted-foreground">Free consultations remaining</p>
                </div>

                {user.chatsLeft > 0 ? (
                  <Badge variant="default" className="mb-4">
                    <Star className="h-3 w-3 mr-1" />
                    Active Plan
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="mb-4">
                    No consultations left
                  </Badge>
                )}

                <Button
                  onClick={handleBuyChats}
                  className="w-full"
                  variant={user.chatsLeft > 0 ? "outline" : "default"}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Buy More Chats
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <a href="/">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    New Consultation
                  </a>
                </Button>

                <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleBuyChats}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  View Pricing
                </Button>

                <Separator />

                <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
