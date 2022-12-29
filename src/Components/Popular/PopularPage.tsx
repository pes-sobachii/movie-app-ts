import React, {useEffect} from 'react';
import {currentPageSelector, fetchPopular, popularSelector, totalPagesSelector} from "../../redux/Slices/popularSlice";
import {useAppDispatch} from "../../redux/store";
import {useSelector} from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import Pagination from "../Pagination/Pagination";

const PopularPage = () => {

    const dispatch = useAppDispatch()
    const movies = useSelector(popularSelector)
    const totalPages = useSelector(totalPagesSelector)
    const currentPage = useSelector(currentPageSelector)

    useEffect(() => {
        dispatch(fetchPopular(1))
    }, [])

    return (
        <div className="movie-page popular-page">
            <div className="container movie-page__container">
                <div className="subheader">
                    <h1 className="heading">Popular movies</h1>
                </div>
                    <div className="movie-grid">
                        {movies.map((movie) => (
                            <MovieCard {...movie} key={movie.id} />
                        ))}
                    </div>
                <Pagination page={currentPage} total_pages={totalPages} onClickHandler={(num:number) => dispatch(fetchPopular(num))}/>
            </div>
        </div>
    );
}

export default PopularPage;