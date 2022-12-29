import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import './style.scss';
import Header from "./Components/Header/Header";
import PopularPage from "./Components/Popular/PopularPage";
import Search from "./Components/Search/Search";
import Preloader from "./Components/Preloader/Preloader";
import UpcomingPage from "./Components/Upcoming/UpcomingPage";
import DetailsPage from "./Components/Details/DetailsPage";
import MainPage from "./Components/Main/MainPage";

const App: React.FC = () => {

  return (
    <div className="wrapper">
        <Header />
        <Routes>
            <Route path="/">
                <Route
                    path=""
                    element={
                        <Suspense fallback={<Preloader />}>
                            <MainPage />
                        </Suspense>
                    }
                />
                <Route
                    path="popular"
                    element={
                        <Suspense fallback={<Preloader />}>
                            <PopularPage />
                        </Suspense>
                    }
                />
                <Route
                    path="search"
                    element={
                        <Suspense fallback={<Preloader />}>
                            <Search />
                        </Suspense>
                    }
                />
                <Route
                    path="upcoming"
                    element={
                        <Suspense fallback={<Preloader />}>
                            <UpcomingPage />
                        </Suspense>
                    }
                />
                <Route
                    path=":id"
                    element={
                        <Suspense fallback={<Preloader />}>
                            <DetailsPage />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    </div>
  );
}

export default App;
