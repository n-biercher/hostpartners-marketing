import type { ReactNode } from "react"
import { MarketingFooter } from "@/components/marketing/marketing-footer"
import { MarketingNav } from "@/components/marketing/marketing-nav"

export function MarketingShell({
  children,
  isAuthenticated = false,
}: {
  children: ReactNode
  isAuthenticated?: boolean
}) {
  return (
    <div className="marketing-theme flex min-h-screen flex-col bg-background">
      <MarketingNav isAuthenticated={isAuthenticated} />
      <main className="min-w-0 flex-1">{children}</main>
      <MarketingFooter />
    </div>
  )
}
