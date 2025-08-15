import { getEpisodeBySlug } from '../../../lib/rss'

export const revalidate = 3600

export default async function Episode({ params }){
  const ep = await getEpisodeBySlug(params.slug)
  if(!ep) return <main>Not found</main>
  return (
    <main>
      <h1>{ep.title}</h1>
      <audio controls style={{width:'100%'}} src={ep.audioUrl}/>
      <p>{ep.description}</p>
    </main>
  )
}
