import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import MyNavbar from './ui/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Water Tank',
  description: 'Tugas Besar IoT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">      
      <body className={inter.className}>
        <MyNavbar/>
        {children}
      </body>      
    </html>
  )
}
