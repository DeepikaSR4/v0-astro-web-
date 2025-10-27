// components/chat-interface.tsx
"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { Send, ArrowLeft, Sparkles, Loader2, Heart, Briefcase, DollarSign } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface ChatInterfaceProps {
  type: "love" | "career" | "finance"
  title: string
  description: string
  // Removed icon, iconColor, and bgGradient from props
}

const iconMap: Record<ChatInterfaceProps["type"], LucideIcon> = {
  love: Heart,
  career: Briefcase,
  finance: DollarSign,
}

const iconColorMap: Record<ChatInterfaceProps["type"], string> = {
  love: "text-red-500",
  career: "text-blue-500",
  finance: "text-green-500",
}

const bgGradientMap: Record<ChatInterfaceProps["type"], string> = {
  love: "from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20",
  career: "from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
  finance: "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
}

export function ChatInterface({ type, title, description }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user, decrementChats } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const Icon = iconMap[type]
  const iconColor = iconColorMap[type]
  const bgGradient = bgGradientMap[type]

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    // Add welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      content: `Welcome to your ${title.toLowerCase()} consultation! I'm Astro, your cosmic guide. Ask me anything about your ${type} and I'll consult the stars for insights.`,
      isUser: false,
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }, [user, router, title, type])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    if (!user) {
      router.push("/login")
      return
    }

    if (user.chatsLeft <= 0) {
      toast({
        title: "No consultations remaining",
        description: "Purchase more consultations to continue.",
        variant: "destructive",
      })
      router.push("/pricing")
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: inputValue, isUser: true }],
          type: type,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error("No response body")

      let fullResponse = ""
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        fullResponse += decoder.decode(value, { stream: true })
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: fullResponse,
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
      decrementChats()

      toast({
        title: "Consultation complete",
        description: `You have ${user.chatsLeft - 1} consultations remaining.`,
      })
    } catch (error) {
      console.error("Error sending message:", error)
      setIsLoading(false)
      toast({
        title: "Error",
        description: "Failed to get response from Astro. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <div className={`bg-gradient-to-r ${bgGradient} border-b`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-background/80 rounded-lg">
                <Icon className={`h-6 w-6 ${iconColor}`} />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1 bg-background/80 rounded-full">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium">{user.chatsLeft} consultations remaining</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              <span>Powered by cosmic wisdom</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] ${message.isUser ? "order-2" : "order-1"}`}>
                <Card
                  className={`p-4 ${
                    message.isUser ? "bg-primary text-primary-foreground ml-4" : "bg-muted/50 mr-4 border-primary/20"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {!message.isUser && (
                      <div className="p-1 bg-primary/10 rounded-full flex-shrink-0">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p
                        className={`text-xs mt-2 ${
                          message.isUser ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <Card className="p-4 bg-muted/50 mr-4 border-primary/20 max-w-[80%]">
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-primary/10 rounded-full">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Astro is consulting the stars...</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Ask Astro about your ${type}...`}
              className="flex-1"
              disabled={isLoading || user.chatsLeft <= 0}
            />
            <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isLoading || user.chatsLeft <= 0}>
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {user.chatsLeft <= 0 && (
            <div className="mt-3 text-center">
              <p className="text-sm text-muted-foreground mb-2">You've used all your free consultations.</p>
              <Button size="sm" onClick={() => router.push("/pricing")}>
                Get More Consultations
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
