import { MovieDBMoviesResponse } from "@/infrastructure/interfaces/moviedb-response";
import { MovieMapper } from "@/infrastructure/mappers/movie.mapper";
import { movieApi } from "../api/movie-api";

interface Options {
  page: number;
  limit?: number;
}

export const topRatedAction = async ({ page, limit }: Options) => {
  try {
    const { data } = await movieApi.get<MovieDBMoviesResponse>("/top_rated", {
      params: {
        page,
      },
    });
    // console.log(JSON.stringify(data, null, 2));
    const movie = data.results.map(MovieMapper.fromTheMovieDBToMovie);
    // console.log(JSON.stringify(movie, null, 2));
    return movie;
  } catch (error) {
    console.error(error);
    throw "Cannot  load now playing movies";
  }
};
