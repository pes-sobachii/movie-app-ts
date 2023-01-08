import React, {useEffect} from 'react';
import {
    currentPageSelector,
    fetchPopular,
    isLoadingPopularSelector,
    popularSelector,
    setCurrentPage,
    totalPagesSelector
} from "../../redux/Slices/popularSlice";
import {useAppDispatch} from "../../redux/store";
import {useSelector} from "react-redux";
import Pagination from "../Pagination/Pagination";
import 'react-loading-skeleton/dist/skeleton.css'
import MoviesTable from "../MoviesTable/MoviesTable";
import qs from "qs";
import {useNavigate} from "react-router-dom";

const PopularPage:React.FC = () => {

    const navigate = useNavigate();
    const isMounted = React.useRef(false);
    const dispatch = useAppDispatch()
    const movies = useSelector(popularSelector)
    const totalPages = useSelector(totalPagesSelector)
    const currentPage = useSelector(currentPageSelector)
    const isLoading = useSelector(isLoadingPopularSelector)

    useEffect(() => {
        if (isMounted.current) {
            const params = {
                currentPage,
            };
            const queryString = qs.stringify(params, { skipNulls: true });
            navigate(`?${queryString}`);
        }
        dispatch(fetchPopular(currentPage))
        isMounted.current = true;
    }, [currentPage])

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            dispatch(
                setCurrentPage(Number(params.currentPage)),
            );
        }
        isMounted.current = true;
    }, []);

    return (
        <div className="movie-page popular-page">
            <div className="container movie-page__container">
                <div className="subheader">
                    <h1 className="heading">Popular movies</h1>
                </div>
                <MoviesTable isLoading={isLoading} movies={movies}/>
                <Pagination page={currentPage} total_pages={totalPages} onClickHandler={(num:number) => dispatch(setCurrentPage(num))}/>
            </div>
        </div>
    );
}

export default PopularPage;