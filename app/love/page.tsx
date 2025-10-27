// app/love/page.tsx
import { ChatInterface } from "@/components/chat-interface"
import { Heart } from "lucide-react"

export default function LovePage() {
  return (
    <ChatInterface
      type="love"
      title="Love & Relationships"
      description="Discover insights about your romantic life, compatibility, and matters of the heart"
    />
  )
}
