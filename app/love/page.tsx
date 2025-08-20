import { ChatInterface } from "@/components/chat-interface"
import { Heart } from "lucide-react"

export default function LovePage() {
  return (
    <ChatInterface
      type="love"
      title="Love & Relationships"
      description="Discover insights about your romantic life, compatibility, and matters of the heart"
      icon={Heart}
      iconColor="text-red-500"
      bgGradient="from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20"
    />
  )
}
