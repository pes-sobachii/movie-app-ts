import React, {useCallback, useEffect, useState} from 'react';
import {useAppDispatch} from "../../redux/store";
import {useSelector} from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import {
    fetchSearched,
    isLoadingSelector,
    searchedSelector,
    removeItems,
    currentSearchPageSelector, totalSearchPagesSelector, fetchNowAired, totalSearchResultsSelector
} from "../../redux/Slices/searchSlice";
import debounce from 'lodash.debounce'
import Preloader from "../Preloader/Preloader";
import Pagination from "../Pagination/Pagination";
import { Link as ScrollLink } from "react-scroll" ;

const Search = () => {

    const [query, setQuery] = useState('')
    const [wasSearched, setWasSearched] = useState(false)
    const dispatch = useAppDispatch()
    const totalPages = useSelector(totalSearchPagesSelector)
    const currentPage = useSelector(currentSearchPageSelector)
    const isLoading = useSelector(isLoadingSelector)
    const movies = useSelector(searchedSelector)
    const totalResults = useSelector(totalSearchResultsSelector)

    const onInputChange = useCallback(debounce((str) => {
        if (str) {
            setWasSearched(true)
            dispatch(fetchSearched({query: str, page: 1}))
        } else{
            setWasSearched(false)
            dispatch(removeItems())
        }
    }, 1150), [])

    useEffect(() => {
        if(!wasSearched){
            dispatch(fetchNowAired())
        }
    }, [wasSearched])

    return (
        <div className="movie-page">
            <div className="container movie-page__container">
                <div className="subheader">
                    <h1 className="heading">Search</h1>
                    <div className="header-input">
                        <input value={query} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            setQuery(e.target.value)
                            onInputChange(e.target.value)
                        }} type="text"/>
                        <span className="count-pill">
                            {wasSearched ? `${totalResults} ${totalResults === 1 ? "Movie" : "Movies"}` : "Search"}
                        </span>
                    </div>
                </div>
                <div className="movie-page__description">
                    {!wasSearched ? "Now Watching In Cinemas" : `Results of searching`}
                </div>

                {isLoading ? (
                    <Preloader />
                ) : movies.length === 0 ? <div className="error-plug plug">It seems you entered an invalid value!</div> : <div className="movie-grid">
                    {movies.map((movie) => (
                        <MovieCard {...movie} key={movie.id} />
                    ))}
                </div>}
                {/*{!wasSearched ? <div className="search-plug plug">Enter a value!</div> : isLoading ? (*/}
                {/*    <Preloader />*/}
                {/*) : movies.length === 0 ? <div className="error-plug plug">It seems you entered an invalid value!</div> : <div className="movie-grid">*/}
                {/*    {movies.map((movie) => (*/}
                {/*        <SliderCard {...movie} key={movie.id} />*/}
                {/*    ))}*/}
                {/*</div>}*/}
                {wasSearched && <Pagination page={currentPage} total_pages={totalPages}
                             onClickHandler={(num: number) => dispatch(fetchSearched({query, page: num}))}/>}
            </div>
        </div>
    );
}

export default Search;