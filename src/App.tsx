import React, {Suspense, useRef, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import './styles/style.scss';
import Header from "./Components/Header/Header";
import MainPage from "./Components/Main/MainPage";
import BurgerMenu from "./Components/Header/BurgerMenu";

const PopularPage = React.lazy(() => import('./Components/Popular/PopularPage'));
const Search = React.lazy(() => import('./Components/Search/Search'));
const UpcomingPage = React.lazy(() => import('./Components/Upcoming/UpcomingPage'));
const DetailsPage = React.lazy(() => import('./Components/Details/DetailsPage'));
const PageNotFound = React.lazy(() => import('./Components/404Page/PageNotFound'));

const App: React.FC = () => {

    const toHeader = useRef<HTMLHeadElement | null>(null)
    const [isBurgerActive, setBurgerActive] = useState(false)

  return (
    <div className="wrapper">

        <Header active={isBurgerActive} setActive={setBurgerActive}/>
        <Routes>
                <Route
                    path="/movie-app-ts/"
                    element={
                        <Suspense fallback={<></>}>
                            <MainPage />
                        </Suspense>
                    }
                />
                <Route
                    path="/movie-app-ts/popular"
                    element={
                        <Suspense fallback={<></>}>
                            <PopularPage />
                        </Suspense>
                    }
                />
                <Route
                    path="/movie-app-ts/search"
                    element={
                        <Suspense fallback={<></>}>
                            <Search />
                        </Suspense>
                    }
                />
                <Route
                    path="/movie-app-ts/upcoming"
                    element={
                        <Suspense fallback={<></>}>
                            <UpcomingPage />
                        </Suspense>
                    }
                />
                <Route
                    path="/movie-app-ts/search/:id"
                    element={
                        <Suspense fallback={<></>}>
                            <DetailsPage />
                        </Suspense>
                    }
                />
            <Route
                path="*"
                element={
                    <Suspense fallback={<></>}>
                        <PageNotFound />
                    </Suspense>
                }
            />
        </Routes>
        <BurgerMenu active={isBurgerActive} setActive={setBurgerActive}/>
    </div>
  );
}

export default App;
