import { FC, useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "../consts";
import { Movie } from "../types/movie.type";
import { Loading } from "../components/Loading";
import { MovieGrid } from "../components/MovieGrid";

export const Favorites: FC = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const favorites = useMemo(() => {
    return (localStorage.getItem('favorites') || '').split(',').filter(id => id !== '');
  }, []);

  const fetchMovies = async () => {
    if (favorites.length) {
      setLoading(true);
      const movies = await Promise.all(favorites.map(fetchMovieDetail));
      setMovies(movies);
      setLoading(false);
    }
  };

  const fetchMovieDetail = async (id: string) => {
    const response = await fetch(
      `${API_BASE_URL}/${id}?api_key=a74169393e0da3cfbc2c58c5feec63d7`, 
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

    const movie: Movie = await response.json();
    return movie;
  };

  useEffect(() => {
    fetchMovies();
  },[favorites]);

  return (
    movies.length
      ? <div className="pt-10 pb-20">
        <MovieGrid movies={movies} />
      </div>
      : loading
        ? <div className="flex justify-center py-32">
          <Loading />
        </div>
        : <div className="pt-10 pb-20">
          <span className="text-lg">You haven't added any movies to your favorites yet</span>
        </div>
  )
};