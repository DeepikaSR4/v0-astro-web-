import { ChatInterface } from "@/components/chat-interface"
import { Briefcase } from "lucide-react"

export default function CareerPage() {
  return (
    <ChatInterface
      type="career"
      title="Career & Success"
      description="Get guidance on your professional path, opportunities, and career growth"
      icon={Briefcase}
      iconColor="text-blue-500"
      bgGradient="from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20"
    />
  )
}
