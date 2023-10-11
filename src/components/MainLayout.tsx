import { FC, Fragment, ReactNode } from "react";
import { routes } from "../routes/routes";
import { NavLink, useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="container mx-auto">
      <nav className="py-10 flex justify-between px-10">
        <h1 className="text-3xl">Fav<span className="font-bold">Movies</span></h1>
        <ul className="flex items-center">
          {routes.map((route, index) => (
            route.showInsideNav 
              ? <NavLink
                key={index}
                to={route.href}
                className={
                  "text-xl font-bold ml-10 hover:underline " + (
                    location.pathname === route.href
                      ? "text-amber-400"
                      : "text-gray-500"
                  )
                }
              >
                <span className="overflow-hidden text-ellipsis">{route.label}</span>
              </NavLink>
              : <Fragment key={index} />
          ))}
        </ul>
      </nav>
      <main className="px-10">
        { children }
      </main>
    </div>
  )
};