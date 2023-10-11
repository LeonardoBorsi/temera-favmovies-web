import { FC } from "react";
import { Movie } from "../types/movie.type";
import { NavLink } from "react-router-dom";
import { IMAGE_BASE_URL } from "../consts";
import { format } from "date-fns";

const star = require('./../assets/star.png');

interface MovieGridProps {
  movies: Movie[];
}

export const MovieGrid: FC<MovieGridProps> = ({ movies }) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {movies.map((movie, index) => (
        <NavLink key={index} to={`/movie/${movie.id}`} className="py-2 flex flex-col items-center">
          <div className="relative inline-block">
            <img className="block rounded-lg" src={IMAGE_BASE_URL + movie.poster_path} alt={movie.title} />
            <div className="hover:opacity-100 opacity-0 bg-black/[.35] rounded-lg absolute top-0 left-0 h-full w-full flex flex-col justify-end transition-all">
              <div className="flex justify-between items-center font-bold text-shadow text-xl text-white pb-3 px-4">
                <div className="flex items-center">
                  <img src={star} width="17" height="17" alt="star" />
                  <span className="ml-1.5">{movie.vote_average}</span>
                </div>
                <span>{format(new Date(movie.release_date), 'yyyy')}</span>
              </div>
            </div>
          </div>
          <div className="mt-3 text-center">
            <span className="font-bold text-lg">{movie.title}</span>
          </div>
        </NavLink>
      ))}
    </div>
  )
};