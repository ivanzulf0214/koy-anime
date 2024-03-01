import Image from 'next/image'
import AnimeData from "@/interfaces/Anime"
import BaseResponse from "@/interfaces/BaseResponse"
import { FaStar } from 'react-icons/fa'
import Episode from '@/interfaces/Episode'
import moment from 'moment'
import CharacterResponse, { CharacterData } from '@/interfaces/Character'

type Props = {
    params: {
        id: number
    }
}

const AnimeDetailPage = async ({ params: { id } }: Props) => {
    const animeById = await fetch(`${process.env.API_BASE_URL}/anime/${id}`)
    const response: BaseResponse<AnimeData> = await animeById.json()
    const anime: AnimeData = response.data

    const episodeByAnimeId = await fetch(`${process.env.API_BASE_URL}/anime/${id}/episodes`)
    const episodeResponse: BaseResponse<Episode[]> = await episodeByAnimeId.json()
    const episodes: Episode[] = episodeResponse.data

    const characterByAnimeId = await fetch(`${process.env.API_BASE_URL}/anime/${id}/characters`)
    const characterResponse: CharacterResponse = await characterByAnimeId.json()
    const characters: CharacterData[] = characterResponse.data

    const isAiring = anime.airing ? "bg-green-600" : "bg-red-600"

    const formatDate = (dateString: string) => {
        if (dateString == null) {
            return '-'
        }

        return moment(dateString).format('MMM DD, YYYY')
    }

    const resolveAiredDate = (fromDateString: string, toDateString: string) => {
        if (fromDateString === null && toDateString === null) {
            return '-'
        }

        if (toDateString == null) {
            return formatDate(fromDateString)
        }

        return `${formatDate(fromDateString)} to ${formatDate(toDateString)}`
    }

    const resolvePremiered = (season: string, year: number) => {
        if (season == null && year == null) {
            return '-'
        }

        return `${season} ${year}`
    }

    return (
        <div className='container mx-auto flex flex-col px-3 py-5 lg:mt-5 lg:p-0'>
            <div className="flex flex-col lg:flex-row text-slate-600 mb-5">
                <div className="xs:flex-grow lg:basis-4/12 flex flex-col mb-2">
                    <Image src={anime.images.webp.large_image_url}
                        width={500}
                        height={1000}
                        alt={anime.title}
                        title={anime.title}
                        className='w-full h-[auto] max-h-[550px] object-cover rounded-lg'></Image>
                </div>
                <div className="basis-8/12 lg:pl-4 lg:mx-10">
                    <div className='flex flex-col items-center lg:items-start mb-5'>
                        <h1 className="text-2xl lg:text-3xl font-bold mb-3">{anime.title}</h1>
                        <div className='flex items-center gap-4'>
                            <div className='flex items-center gap-1'>
                                <FaStar className='text-orange-500' />
                                <span className='text-md'>{anime.score}</span>
                            </div>
                            <div>
                                <div className={`flex items-center gap-1 px-2 py-[4px] rounded-sm ${isAiring}`}>
                                    <span className='text-sm text-white'>{anime.status}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-center lg:justify-start items-center gap-2 mb-10'>
                        {
                            anime.genres.map((genre, index) => {
                                return (
                                    <div className='rounded-sm bg-slate-500 text-white text-sm px-4 py-2' key={index}>{genre.name}</div>
                                )
                            })
                        }
                    </div>
                    <div className='flex flex-col gap-2 text-sm mt-5'>
                        <div className='flex justify-between'>
                            <span className='font-bold basis-1/4'>Type:</span>
                            <span className='font-bold basis-3/4'>{anime.type}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='font-bold basis-1/4'>Premiered:</span>
                            <span className='font-bold basis-3/4 capitalize'>{resolvePremiered(anime.season, anime.year)}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='font-bold basis-1/4'>Date aired:</span>
                            <span className='font-bold basis-3/4'>{resolveAiredDate(anime.aired.from, anime.aired.to)}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='font-bold basis-1/4'>Duration:</span>
                            <span className='font-bold basis-3/4'>{anime.duration}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='font-bold basis-1/4'>Episodes:</span>
                            <span className='font-bold basis-3/4'>{anime.episodes}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='font-bold basis-1/4'>Studios:</span>
                            <span className='font-bold basis-3/4'>{anime.studios.map(studio => studio.name).join(", ")}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='font-bold basis-1/4'>Producers:</span>
                            <span className='font-bold basis-3/4'>{anime.producers.map(producer => producer.name).join(", ")}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col mb-5'>
                <h2 className='text-xl text-slate-700 font-bold mb-3'>Synopsys</h2>
                <p className='text-sm text-slate-500'>{anime.synopsis}</p>
            </div>
            <div className='flex flex-col mb-5'>
                <h2 className='text-xl text-slate-700 font-bold mb-3'>Characters</h2>
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3'>
                    {
                        characters.sort((a, b) => b.favorites - a.favorites).map((character, index) => {
                            return (
                                <div className='flex flex-col items-center gap-2 mb-4' key={index}>
                                    <Image src={character.character.images.webp.image_url} width={90} height={160} alt="Character" className='w-full h-auto max-h-[250px] object-cover rounded-lg bg-slate-200 p-1'></Image>
                                    <span className='font-bold text-md md:text-xs text-center'>{character.character.name}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                episodes.length == 0 ? "" :
                    <div className='flex flex-col mb-5'>
                        <h2 className='text-xl text-slate-700 font-bold mb-3'>Episode List</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {
                                episodes.map((episode, index) => {
                                    return (
                                        // <Link href={`details/${anime.mal_id}/episodes/${episode.mal_id}`}
                                        <div className='flex flex-col bg-slate-100 border hover:border-slate-400 border-slate-300 px-4 py-2 rounded-sm cursor-pointer' key={index} title='Coming soon'>
                                            <p className='text-md font-bold line-clamp-1'>{episode.mal_id}. {episode.title}</p>
                                            <p className='text-sm line-clamp-1'>{episode.title_japanese}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
            }
        </div>
    )
}

export default AnimeDetailPage