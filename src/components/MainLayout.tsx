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
      <nav className="pt-10 pb-0 sm:pt-10 sm:pb-10 flex flex-col sm:flex-row justify-between px-10">
        <h1 className="text-3xl">Fav<span className="font-bold">Movies</span></h1>
        <ul className="flex items-center justify-center mt-10 sm:mt-0">
          {routes.map((route, index) => (
            route.showInsideNav 
              ? <NavLink
                key={index}
                to={route.href}
                className={
                  "text-xl font-bold ml-5 mr-5 sm:mr-0 sm:ml-10 hover:underline " + (
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