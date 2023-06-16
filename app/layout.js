import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Modal from './components/Modal'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Milestone v2',
  description: 'An updated version to Milestone',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-gray-200'>
        <Navbar />
        <Header />
        {children}
        <Modal />
      </body>
    </html>
  )
}
