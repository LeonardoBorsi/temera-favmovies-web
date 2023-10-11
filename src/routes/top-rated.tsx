import { FC, useCallback, useEffect, useState } from "react";
import { Movie } from "../types/movie.type";
import { Loading } from "../components/Loading";
import { MovieGrid } from "../components/MovieGrid";
import { API_BASE_URL } from "../consts";
import { TopRatedResponse } from "../types/top-rated-response.type";

export const TopRated: FC = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchMovies = async () => {
    setLoading(true);
    const response = await fetch(
      `${API_BASE_URL}/top_rated?api_key=a74169393e0da3cfbc2c58c5feec63d7&page=${page}`, 
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const jsonResponse: TopRatedResponse = await response.json();
    setMovies([...movies, ...jsonResponse.results]);
    setLoading(false);
  };

  const onLoadMore = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  useEffect(() => {
    fetchMovies()
  }, [page]);

  return (
    movies.length
      ? <div className="pt-10">
        <MovieGrid movies={movies} />
        <div className="pt-10 pb-20 flex items-center justify-center">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="bg-gray-200 hover:bg-gray-300 font-bold rounded-full py-3 px-14"
          >
            { loading ? <Loading /> : 'Load More'}
          </button>
        </div>
      </div>
      : <div className="flex justify-center py-32">
        <Loading />
      </div>
  )
};