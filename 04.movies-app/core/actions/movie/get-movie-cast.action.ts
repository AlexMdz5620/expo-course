import { CreditsResponse } from "@/infrastructure/interfaces/moviedb-credits.response";
import { movieApi } from "../api/movie-api";
import { Cast } from "@/infrastructure/interfaces/cast";
import { CastMapper } from "@/infrastructure/mappers/cast.mapper";

export const getMovieCastAction = async (
  movieId: number | string,
): Promise<Cast[]> => {
  try {
    const { data } = await movieApi.get<CreditsResponse>(`/${movieId}/credits`);

    const cast = data.cast.map(CastMapper.fromMovieDBCastToEntity);
    return cast;
  } catch (error) {
    console.error(error);
    throw "Can not load now casting movies";
  }
};
