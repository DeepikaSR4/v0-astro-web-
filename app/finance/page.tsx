import { ChatInterface } from "@/components/chat-interface"
import { DollarSign } from "lucide-react"

export default function FinancePage() {
  return (
    <ChatInterface
      type="finance"
      title="Finance & Wealth"
      description="Explore your financial future, investment opportunities, and wealth potential"
      icon={DollarSign}
      iconColor="text-green-500"
      bgGradient="from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20"
    />
  )
}
