import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Koy Anime',
  description: 'Watch anime online for free on Koy Anime',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <Navbar />
        <main className="flex min-h-screen max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
