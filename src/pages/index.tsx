import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <div className='flex gap-4'>
        <Link href="/find">
          <button className='p-2 border-white border-2 border-solid rounded-sm text-sm'>Найти</button>
        </Link>
        <div>
          <h2 className='font-bold text-lg'><b className='text-red-400'>К</b>расная книга<sup>milestone 1</sup></h2>
        </div>
        <Link href="/add">
          <button className='p-2 border-white border-2 border-solid rounded-sm text-sm'>Добавить</button>
        </Link>
      </div>
    </main>
  )
}
