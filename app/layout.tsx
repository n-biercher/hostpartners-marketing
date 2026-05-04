import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { DM_Serif_Display, Geist, Geist_Mono } from "next/font/google"
import { createMarketingMetadata } from "@/marketing/metadata"
import { getSiteUrl } from "@/lib/site-url"
import "./globals.css"

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const BASE_URL = getSiteUrl()

export const metadata: Metadata = createMarketingMetadata(BASE_URL)

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${dmSerifDisplay.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">{children}</body>
       <Analytics />
       <SpeedInsights />
    </html>
  )
}
