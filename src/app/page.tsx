import Image from 'next/image'
import Header from '@/components/Header'
import Board from '@/components/Board'
import Link from 'next/link'
export default function Home() {
  return (
    <main>
    <Header />

    <Board/>
    </main>
  )
}
