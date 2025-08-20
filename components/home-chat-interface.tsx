"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Send, Heart, Briefcase, DollarSign, Sparkles } from "lucide-react"
import Link from "next/link"

export function HomeChatInterface() {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // For now, redirect to love chat as default
      window.location.href = "/love"
    }
  }

  const examplePrompts = [
    "Will I find love this year?",
    "What career path should I choose?",
    "How can I improve my finances?",
    "What do the stars say about my future?",
  ]

  const handleExampleClick = (prompt: string) => {
    setMessage(prompt)
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 min-h-[80vh]">
      <div className="w-full max-w-3xl mx-auto text-center space-y-12">
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-amber-500" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              AstroWeb
            </h1>
            <Sparkles className="w-8 h-8 text-amber-500" />
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <Link
              href="/love"
              className="flex items-center gap-2 hover:text-amber-500 transition-colors px-3 py-1 rounded-full hover:bg-amber-50 dark:hover:bg-amber-950"
            >
              <Heart className="w-4 h-4" />
              Love
            </Link>
            <Link
              href="/career"
              className="flex items-center gap-2 hover:text-amber-500 transition-colors px-3 py-1 rounded-full hover:bg-amber-50 dark:hover:bg-amber-950"
            >
              <Briefcase className="w-4 h-4" />
              Career
            </Link>
            <Link
              href="/finance"
              className="flex items-center gap-2 hover:text-amber-500 transition-colors px-3 py-1 rounded-full hover:bg-amber-50 dark:hover:bg-amber-950"
            >
              <DollarSign className="w-4 h-4" />
              Finance
            </Link>
          </div>

          <p className="text-xl text-muted-foreground font-light">Ask the stars, get your answers.</p>
        </div>

        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative bg-background border-2 border-amber-200 dark:border-amber-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 focus-within:border-amber-400 dark:focus-within:border-amber-600">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What would you like to know about your future?"
                className="w-full h-16 px-6 py-4 text-base bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground/60"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
              />
              <Button
                type="submit"
                size="sm"
                disabled={!message.trim()}
                className="absolute right-3 bottom-3 h-10 w-10 p-0 bg-amber-500 hover:bg-amber-600 disabled:bg-muted disabled:text-muted-foreground rounded-xl"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {examplePrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(prompt)}
                className="p-4 text-left text-sm bg-card hover:bg-accent border border-border rounded-xl transition-colors hover:border-amber-300 dark:hover:border-amber-700"
              >
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{prompt}</span>
                </div>
              </button>
            ))}
          </div>

          <p className="text-xs text-muted-foreground/60">Start your cosmic journey with a simple question</p>
        </div>
      </div>
    </div>
  )
}
