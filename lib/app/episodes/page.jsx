import Link from 'next/link'
import { getEpisodes } from '../../lib/rss'

export const revalidate = 3600

export default async function Episodes() {
  const episodes = await getEpisodes({limit: 30})
  return (
    <main>
      <h1>Episodes</h1>
      <ul>
        {episodes.map(e => (
          <li key={e.slug}>
            <Link href={`/episodes/${e.slug}`}>{e.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
