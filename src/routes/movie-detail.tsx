import { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../types/movie.type";
import { API_BASE_URL, IMAGE_BASE_URL } from "../consts";
import { format } from "date-fns";
import { Loading } from "../components/Loading";

const star = require('./../assets/star.png');
const calendar = require('./../assets/calendar.png');


export const MovieDetail: FC = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState<boolean>(() => {
    const favorites = localStorage.getItem('favorites');
    if (!favorites || !id) {
      return false;
    }
    return favorites.split(',').includes(id);
  });
  const [movie, setMovie] = useState<Movie>();

  const fetchMovieDetail = async () => {
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
    setMovie(movie);
  };

  useEffect(() => {
    fetchMovieDetail();
  },[]);

  const addToFavorites = useCallback(() => {
    const favorites = localStorage.getItem('favorites') || '';
    localStorage.setItem('favorites', favorites === '' ? `${id}` : `${favorites},${id}`);
    setIsFavorite(true);
  },[id]);

  const removeFromFavorites = useCallback(() => {
    const favorites = (localStorage.getItem('favorites') || '').split(',');
    const updatedFavorites = favorites.filter(fav => fav !== id).join(',');
    localStorage.setItem('favorites', updatedFavorites);
    setIsFavorite(false);
  },[id]);

  return (
    movie
      ? <div className="grid grid-cols-10 pb-20">
        <div className="col-span-10 md:col-span-5 lg:col-span-3 flex justify-center">
          <img src={IMAGE_BASE_URL + movie.poster_path} alt={movie?.title} />
        </div>
        <div className="col-span-10 md:col-span-5 lg:col-span-7 px-0 md:pl-10">
          <div className="pt-4 md:pt-0">
            <h2 className="text-4xl font-bold">{movie.title}</h2>
          </div>
          <div className="flex items-center pt-4 font-bold text-gray-500 text-lg">
            <div className="flex items-center">
              <img src={star} width="18" height="18" alt="star" />
              <span className="ml-1.5">{movie.vote_average}</span>
            </div>
            <div className="flex items-center ml-5">
              <img src={calendar} width="17" height="17" alt="release date" />
              <span className="ml-2">{format(new Date(movie.release_date), 'dd MMMM yyyy')}</span>
            </div>
          </div>
          <div className="pt-4">
            <p>{movie.overview}</p>
          </div>
          <div className="pt-10 flex items-center justify-center">
            <button
              onClick={ isFavorite ? removeFromFavorites : addToFavorites }
              className={
                "text-white font-bold rounded-full py-3 px-14 "
                + ( isFavorite ? "bg-red-500 hover:bg-red-600" : "bg-amber-400 hover:bg-amber-500" )
              }
            >
              { isFavorite ? 'Remove from Favorites' : 'Add to Favorites'} 
            </button>
          </div>
        </div>
      </div>
      : <div className="flex justify-center py-32">
        <Loading />
      </div>
  )
};