import { redirect } from "next/navigation"
import { getAppUrl } from "@/lib/site-url"

export default function DashboardRedirectPage() {
  redirect(`${getAppUrl()}/dashboard`)
}
