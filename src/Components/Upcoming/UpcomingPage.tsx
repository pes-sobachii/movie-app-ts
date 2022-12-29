import React, {useEffect} from 'react';
import {currentPageSelector, fetchPopular, popularSelector, totalPagesSelector} from "../../redux/Slices/popularSlice";
import {useAppDispatch} from "../../redux/store";
import {useSelector} from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import Pagination from "../Pagination/Pagination";
import {
    currentUpcomingPageSelector,
    fetchUpcoming,
    totalUpcomingSlicePagesSelector, upcomingSelector
} from "../../redux/Slices/upcomingSlice";

const UpcomingPage = () => {

    const dispatch = useAppDispatch()
    const movies = useSelector(upcomingSelector)
    const totalPages = useSelector(totalUpcomingSlicePagesSelector)
    const currentPage = useSelector(currentUpcomingPageSelector)

    useEffect(() => {
        dispatch(fetchUpcoming(1))
    }, [])

    return (
        <div className="movie-page popular-page">
            <div className="container movie-page__container">
                <div className="subheader">
                    <h1 className="heading">Upcoming movies</h1>
                </div>
                    <div className="movie-grid">
                        {movies.map((movie) => (
                            <MovieCard {...movie} key={movie.id} />
                        ))}
                    </div>
                <Pagination page={currentPage} total_pages={totalPages} onClickHandler={(num:number) => dispatch(fetchUpcoming(num))}/>
            </div>
        </div>
    );
}

export default UpcomingPage;