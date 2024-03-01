import AnimeData from "@/interfaces/Anime";
import BaseResponse from "@/interfaces/BaseResponse";
import CharacterResponse from "@/interfaces/Character";
import Episode from "@/interfaces/Episode";

type TopAnimeProps = {
    page?: number
}

export async function getTopAnime({page}: TopAnimeProps) {
  const getTopAnime = await fetch(`${process.env.API_BASE_URL}/top/anime?page=${page}`)
  const response: BaseResponse<AnimeData[]> = await getTopAnime.json()
  return response
}

export async function getAnimeDetailById(animeId: number) {
    const request = await fetch(`${process.env.API_BASE_URL}/anime/${animeId}`)
    const response: BaseResponse<AnimeData> = await request.json()
    return response.data
}

export async function getAnimeEpisodesById(animeId: number) {
    const request = await fetch(`${process.env.API_BASE_URL}/anime/${animeId}/episodes`)
    const response: BaseResponse<Episode[]> = await request.json()
    return response.data
}

export async function getAnimeCharactersById(animeId: number) {
    const request = await fetch(`${process.env.API_BASE_URL}/anime/${animeId}/characters`)
    const response: CharacterResponse = await request.json()
    return response.data
}