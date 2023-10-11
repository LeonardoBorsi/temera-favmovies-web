export type Movie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  adult: boolean;
  video: boolean;
  original_language: string;
  original_title: string;
  genre_ids: number[];
}