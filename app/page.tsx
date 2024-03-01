import AnimeCard from './components/AnimeCard'
import Pagination from './components/Pagination'
import { getTopAnime } from './services/AnimeService'

const HomePage = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1

  const topAnime = await getTopAnime({ page: page })
  const animes = topAnime.data
  const pagination = topAnime.pagination

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
      <Pagination pageCount={pagination.last_visible_page} />
    </div>
  )
}

export default HomePage