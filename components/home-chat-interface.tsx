"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Send, Heart, Briefcase, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"

export function HomeChatInterface() {
  const [message, setMessage] = useState("")
  const [selectedType, setSelectedType] = useState<"love" | "career" | "finance" | null>(null)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && selectedType) {
      router.push(`/${selectedType}?message=${encodeURIComponent(message)}`)
    }
  }

  const handleCategoryClick = (type: "love" | "career" | "finance") => {
    setSelectedType(type)
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
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center px-3 md:px-4 py-6 md:py-12">
        <div className="w-full max-w-2xl mx-auto space-y-6 md:space-y-8 flex flex-col">
          <div className="text-center space-y-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
              Ask the stars, get your answers.
            </h1>
          </div>

          <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
            <button
              onClick={() => handleCategoryClick("love")}
              className={`flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-colors text-xs md:text-sm font-medium ${
                selectedType === "love"
                  ? "bg-red-500 text-white"
                  : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50"
              }`}
            >
              <Heart className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>Love</span>
            </button>
            <button
              onClick={() => handleCategoryClick("career")}
              className={`flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-colors text-xs md:text-sm font-medium ${
                selectedType === "career"
                  ? "bg-blue-500 text-white"
                  : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>Career</span>
            </button>
            <button
              onClick={() => handleCategoryClick("finance")}
              className={`flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-colors text-xs md:text-sm font-medium ${
                selectedType === "finance"
                  ? "bg-green-500 text-white"
                  : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50"
              }`}
            >
              <DollarSign className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>Finance</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
            {examplePrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(prompt)}
                className="p-2.5 md:p-3 text-left text-xs sm:text-sm bg-card hover:bg-amber-500 border border-border rounded-lg transition-colors hover:border-amber-500 dark:hover:border-amber-500 hover:text-white"
              >
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground hover:text-white line-clamp-2 transition-colors">
                    {prompt}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 w-full bg-background border-t border-border px-3 md:px-4 py-4 md:py-6">
        <div className="w-full max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="relative w-full">
            <div className="relative bg-background border-2 border-amber-200 dark:border-amber-800 rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 focus-within:border-amber-400 dark:focus-within:border-amber-600">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What would you like to know?"
                className="w-full h-10 sm:h-12 md:h-14 px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-3 text-xs sm:text-sm md:text-base bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground/60"
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
                disabled={!message.trim() || !selectedType}
                className="absolute right-2 md:right-3 bottom-2 md:bottom-3 h-6 sm:h-7 md:h-8 w-6 sm:w-7 md:w-8 p-0 bg-amber-500 hover:bg-amber-600 disabled:bg-muted disabled:text-muted-foreground rounded-md"
              >
                <Send className="w-3 h-3 md:w-3.5 md:h-3.5" />
              </Button>
            </div>
            {!selectedType && message.trim() && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                Please select a category (Love, Career, or Finance)
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
