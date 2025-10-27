import { streamText } from "ai"
import { google } from "@ai-sdk/google"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, type } = await req.json()

  const systemPrompts = {
    love: "You are Astro, a wise cosmic guide specializing in matters of the heart. You provide insightful, mystical guidance about love, relationships, and romantic connections. Your responses should be poetic, encouraging, and draw from astrological wisdom. Keep responses concise but meaningful.",
    career:
      "You are Astro, a cosmic guide specializing in career and professional growth. You provide insightful guidance about career paths, professional development, and success. Your responses should be inspiring, practical, and draw from astrological wisdom. Keep responses concise but meaningful.",
    finance:
      "You are Astro, a cosmic guide specializing in financial wisdom and abundance. You provide insightful guidance about money, investments, and financial growth. Your responses should be encouraging, wise, and draw from astrological wisdom. Keep responses concise but meaningful.",
  }

  const systemPrompt = systemPrompts[type as keyof typeof systemPrompts] || systemPrompts.love

  try {
    const result = await streamText({
      model: google("gemini-2.5-flash"),
      system: systemPrompt,
      messages: messages.map((msg: any) => ({
        role: msg.role || (msg.isUser ? "user" : "assistant"),
        content: msg.content,
      })),
      temperature: 0.8,
      maxTokens: 1000,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error("Gemini API error:", error)
    return new Response(JSON.stringify({ error: "Failed to generate response" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
