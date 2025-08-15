import { XMLParser } from 'fast-xml-parser'

const FEED = process.env.PODCAST_RSS_URL

function slugify(s){
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)+/g,'')
}

async function safeFetchFeedXml(){
  try {
    if (!FEED) return null
    const res = await fetch(FEED, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    return await res.text()
  } catch {
    return null
  }
}

export async function getEpisodes({limit=50} = {}){
  const xml = await safeFetchFeedXml()
  if(!xml) return []
  try {
    const parser = new XMLParser({ ignoreAttributes:false, attributeNamePrefix:'@_' })
    const j = parser.parse(xml)
    const items = j?.rss?.channel?.item || []
    const eps = items.map(it => {
      const title = String(it.title || 'Episode')
      const guid  = String(it.guid?.['#text'] || it.guid || title)
      const enclosure = it.enclosure?.['@_url'] || it.enclosure?.['@_URL'] || ''
      const audio = it['media:content']?.['@_url'] || enclosure
      const desc = String(it['content:encoded'] || it.description || '').replace(/<[^>]+>/g,'')
      const pub  = it.pubDate ? new Date(it.pubDate).toISOString() : new Date().toISOString()
      return { slug: slugify(title || guid), title, description: desc, audioUrl: audio, publishedAt: pub }
    })
    return eps.slice(0, limit)
  } catch {
    return []
  }
}

export async function getEpisodeBySlug(slug){
  const eps = await getEpisodes({limit: 200})
  return eps.find(e => e.slug === slug)
}
