import { redirect } from "next/navigation"
import { getAppUrl } from "@/lib/site-url"

export default function LoginRedirectPage() {
  redirect(`${getAppUrl()}/login`)
}
