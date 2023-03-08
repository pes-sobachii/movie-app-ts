import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import qs from "qs";
import {useNavigate} from "react-router-dom";
import debounce from 'lodash.debounce'


import styles from './Search.module.scss'

import {
    fetchNowAired,
    fetchSearched,
    removeItems,
    searchedSelector,
    setCurrentPage,
    setStateQuery
} from "../../redux/Slices/searchSlice";
import Pagination from "../Pagination/Pagination";
import MoviesTable from "../MoviesTable/MoviesTable";
import {useAppDispatch} from "../../redux/store";


const Search: React.FC = () => {

    const [inputQuery, setInputQuery] = useState('')
    const dispatch = useAppDispatch()
    const { movies, isLoading, currentPage, totalPages, stateQuery, totalResults} = useSelector(searchedSelector)
    const navigate = useNavigate();

    const onInputChange = useCallback(debounce((str) => {
        if (str) {
            dispatch(setStateQuery(str))
        } else {
            dispatch(removeItems())
        }
    }, 1150), [])

    useEffect(() => {
        if (!stateQuery) {
            navigate('')
            dispatch(fetchNowAired())
        } else {
            const params = {
                currentPage,
                query: stateQuery
            };
            const queryString = qs.stringify(params, {skipNulls: true});
            navigate(`?${queryString}`);


            dispatch(fetchSearched({query: stateQuery, page: currentPage}))
        }
    }, [currentPage, stateQuery])

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1)) as unknown as { currentPage: number, query: string };
            setInputQuery(params.query)
            dispatch(setStateQuery(params.query));
            dispatch(setCurrentPage(Number(params.currentPage)),);
        }
    }, []);

    return (
        <>
            <div className={styles.subheader}>
                <h1 className={styles.heading}>Search</h1>
                <div className={styles.search}>
                    <input value={inputQuery} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setInputQuery(e.target.value)
                        onInputChange(e.target.value)
                    }} type="text"/>
                    <span className={styles.pill}>
                        {stateQuery ? `${totalResults} ${totalResults === 1 ? "Movie" : "Movies"}` : "Search"}
                    </span>
                </div>
            </div>
            <div className={styles.title}>
                {!stateQuery ? "Now Watching In Cinemas" : `Results of searching`}
            </div>
            {movies.length === 0 && !isLoading ?
                <div className={styles.plug}>It seems you entered an invalid value!</div> :
                <MoviesTable isLoading={isLoading} movies={movies}/>}
            {stateQuery && <Pagination page={currentPage} total_pages={totalPages}
                                       onClickHandler={(num: number) => dispatch(setCurrentPage(num))}/>}
        </>
    );
}

export default Search;