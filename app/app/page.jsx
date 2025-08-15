import Link from 'next/link'

export default function Home(){
  return (
    <main>
      <h1>Domesticated Savages</h1>
      <p>Podcast, merch, and mayhem. Stay savage.</p>
      <p><Link href="/episodes">Episodes</Link></p>
    </main>
  )
}
