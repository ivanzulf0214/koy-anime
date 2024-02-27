import AnimeCard from './components/AnimeCard'
import BaseResponse from '@/interfaces/BaseResponse'
import AnimeData from '@/interfaces/Anime'

export default async function HomePage() {
  const getTopAnime = await fetch(`${process.env.API_BASE_URL}/top/anime`)
  const response: BaseResponse<AnimeData[]> = await getTopAnime.json()
  const animes: AnimeData[] = response.data

  return (
    <div className="container mx-auto flex flex-col gap-4 px-3 py-5">
      <h1 className="text-2xl text-slate-800 font-bold">Top Anime</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {
          animes.map((anime, index) => {
            return <AnimeCard anime={anime} key={index} />
          })
        }
      </div>
    </div>
  )
}
