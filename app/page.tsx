import AnimeCard from './components/AnimeCard'
import BaseResponse from '@/interfaces/BaseResponse'
import AnimeData from '@/interfaces/Anime'
import Pagination from './components/Pagination'

const HomePage = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1

  const getTopAnime = await fetch(`${process.env.API_BASE_URL}/top/anime?page=${page}`)
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
      <Pagination pageCount={response.pagination.last_visible_page} />
    </div>
  )
}

export default HomePage