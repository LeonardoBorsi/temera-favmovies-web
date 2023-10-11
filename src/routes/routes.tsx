import { ReactElement } from "react";
import { TopRated } from "./top-rated";
import { Favorites } from "./favorites";
import { MovieDetail } from "./movie-detail";

interface Route {
  label: string;
  href: string;
  component: ReactElement;
  showInsideNav?: boolean;
}

export const routes: Route[] = [
  { label: "Top Rated", href: "/", component: <TopRated />, showInsideNav: true },
  { label: "Favorites", href: "/favorites", component: <Favorites />, showInsideNav: true },
  { label: "Movie Detail", href: "/movie/:id", component: <MovieDetail /> }
]
