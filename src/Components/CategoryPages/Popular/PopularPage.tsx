import React, {useEffect} from 'react';
import qs from "qs";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

import styles from '../CategoryPages.module.scss'

import {fetchPopular, popularSelector, setCurrentPage} from "../../../redux/Slices/popularSlice";
import {useAppDispatch} from "../../../redux/store";
import Pagination from "../../Pagination/Pagination";
import MoviesTable from "../../MoviesTable/MoviesTable";

const PopularPage: React.FC = () => {

    const navigate = useNavigate();
    const isMounted = React.useRef(false);
    const dispatch = useAppDispatch()
    const { items, isLoading, currentPage, totalPages} = useSelector(popularSelector)

    useEffect(() => {
        if (isMounted.current) {
            const params = {
                currentPage,
            };
            const queryString = qs.stringify(params, {skipNulls: true});
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
        <>
            <div className={styles.subheader}>
                <h1 className={styles.heading}>Popular movies</h1>
            </div>
            <MoviesTable isLoading={isLoading} movies={items}/>
            <Pagination page={currentPage} total_pages={totalPages}
                        onClickHandler={(num: number) => dispatch(setCurrentPage(num))}/>
        </>
    );
}

export default PopularPage;