import { MovieDBMoviesResponse } from "@/infrastructure/interfaces/moviedb-response";
import { MovieMapper } from "@/infrastructure/mappers/movie.mapper";
import { movieApi } from "../api/movie-api";

export const nowPlayingAction = async () => {
  try {
    const { data } = await movieApi.get<MovieDBMoviesResponse>("/now_playing");
    // console.log(JSON.stringify(data, null, 2));
    const movie = data.results.map(MovieMapper.fromTheMovieDBToMovie);
    // console.log(JSON.stringify(movie, null, 2));
    return movie;
  } catch (error) {
    console.error(error);
    throw "Cannot  load now playing movies";
  }
};
