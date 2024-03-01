import Image from 'next/image'
import AnimeData from '@/interfaces/Anime'

type Props = {
    anime: AnimeData
}

const AnimeCard = ({ anime }: Props) => {
    return (
        <a href={`/details/${anime.mal_id}`} className="relative">
            <Image src={anime.images.webp.large_image_url} width={500} height={1000} alt={anime.title} className='w-full h-[280px] lg:h-[320px] object-cover rounded-lg'></Image>
            <p className="text-xs absolute bottom-0 left-0 right-0 p-2 flex justify-center items-center text-center h-[50px] bg-slate-800/80 text-white line-clamp-2 rounded-bl-lg rounded-br-lg">{anime.title}</p>
            <span className="absolute top-2 left-2 bg-orange-500 text-white font-bold text-xs px-2 py-1 rounded-md">{anime.type}</span>
        </a>
    )
}

export default AnimeCard