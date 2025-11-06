import { Navbar } from "@/components/navbar"
import { HomeChatInterface } from "@/components/home-chat-interface"

export default function ChatPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HomeChatInterface />
      </main>
    </div>
  )
}
