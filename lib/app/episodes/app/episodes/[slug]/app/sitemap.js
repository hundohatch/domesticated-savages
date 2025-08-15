import { getEpisodes } from '../lib/rss'

export default async function sitemap(){
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const eps = await getEpisodes({limit: 100}).catch(() => [])
  const staticPages = ['', '/episodes']
  const staticEntries = staticPages.map(p => ({ url: `${base}${p}`, lastModified: new Date() }))
  const episodeEntries = (eps || []).map(e => ({ url: `${base}/episodes/${e.slug}`, lastModified: new Date(e.publishedAt) }))
  return [...staticEntries, ...episodeEntries]
}
