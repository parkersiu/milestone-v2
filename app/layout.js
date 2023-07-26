import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Milestone v2',
  description: 'An updated version to Milestone',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=''>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
