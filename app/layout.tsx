import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AIAssistant from "@/components/AIAssistant"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: {
    default: "E-Cell SVCE | Startup Culture",
    template: "%s | E-Cell SVCE",
  },
  description: "The official entrepreneurship hub at SVCE, empowering students to build bold ideas, startup stories, and creative innovation.",
  keywords: ["entrepreneurship", "E-cell", "SVCE", "startups", "innovation", "business", "engineering"],
  authors: [{ name: "E-Cell SVCE", url: "https://ecell-website-svce.vercel.app" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ecell-website-svce.vercel.app",
    title: "E-Cell SVCE | Startup Culture",
    description: "Fostering a bold entrepreneurial spirit at SVCE.",
    siteName: "E-Cell SVCE",
    images: [
      {
  url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "E-cell SVCE Logo and Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Cell SVCE | Startup Culture",
    description: "Join the hub of innovation and startup culture at SVCE.",
    creator: "@ecellsvce",
  images: ["/twitter-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "ZgGe9C-HXqLHJExhXlQ8IS7nHLipeslwiHoQW_el9js",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const PageTransitionLoader = require("@/components/PageTransitionLoader").default;
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning
        className={cn(
          "min-h-screen font-sans antialiased",
          inter.variable,
          poppins.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <PageTransitionLoader />
          <div className="relative flex min-h-screen flex-col page-container">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <AIAssistant />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
