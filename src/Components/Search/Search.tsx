import React, {useCallback, useEffect, useState} from 'react';
import {useAppDispatch} from "../../redux/store";
import {useSelector} from "react-redux";
import {
    currentSearchPageSelector,
    fetchNowAired,
    fetchSearched,
    isLoadingSelector,
    querySelector,
    removeItems,
    searchedSelector,
    setCurrentPage,
    setStateQuery,
    totalSearchPagesSelector,
    totalSearchResultsSelector
} from "../../redux/Slices/searchSlice";
import debounce from 'lodash.debounce'
import Pagination from "../Pagination/Pagination";
import MoviesTable from "../MoviesTable/MoviesTable";
import qs from "qs";
import {useNavigate} from "react-router-dom";

const Search:React.FC = () => {

    const [inputQuery, setInputQuery] = useState('')
    const dispatch = useAppDispatch()
    const totalPages = useSelector(totalSearchPagesSelector)
    const currentPage = useSelector(currentSearchPageSelector)
    const isLoading = useSelector(isLoadingSelector)
    const movies = useSelector(searchedSelector)
    const totalResults = useSelector(totalSearchResultsSelector)
    const stateQuery = useSelector(querySelector)
    const navigate = useNavigate();

    const onInputChange = useCallback(debounce((str) => {
        if (str) {
            dispatch(setStateQuery(str))
        } else {
            dispatch(removeItems())
        }
    }, 1150), [])

    useEffect(() => {
            if(!stateQuery){
                navigate('')
                dispatch(fetchNowAired())
            } else {
                    const params = {
                        currentPage,
                        query: stateQuery
                    };
                    const queryString = qs.stringify(params, { skipNulls: true });
                    navigate(`?${queryString}`);


                dispatch(fetchSearched({query: stateQuery, page: currentPage}))
            }
    }, [currentPage, stateQuery])

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1)) as unknown as {currentPage: number, query: string};
            setInputQuery(params.query)
            dispatch(setStateQuery(params.query));
            dispatch(setCurrentPage(Number(params.currentPage)),);
        }
    }, []);

    return (
        <div className="movie-page">
            <div className="container movie-page__container">
                <div className="subheader">
                    <h1 className="heading">Search</h1>
                    <div className="header-input">
                        <input value={inputQuery} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            setInputQuery(e.target.value)
                            onInputChange(e.target.value)
                        }} type="text"/>
                        <span className="count-pill">
                            {stateQuery ? `${totalResults} ${totalResults === 1 ? "Movie" : "Movies"}` : "Search"}
                        </span>
                    </div>
                </div>
                <div className="movie-page__description">
                    {!stateQuery ? "Now Watching In Cinemas" : `Results of searching`}
                </div>
                {movies.length === 0 && !isLoading ? <div className="error-plug plug">It seems you entered an invalid value!</div> : <MoviesTable isLoading={isLoading} movies={movies}/>}
                {stateQuery && <Pagination page={currentPage} total_pages={totalPages}
                             onClickHandler={(num: number) => dispatch(setCurrentPage(num))}/>}
            </div>
        </div>
    );
}

export default Search;