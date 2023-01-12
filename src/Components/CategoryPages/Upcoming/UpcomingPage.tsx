import React, {useEffect} from 'react';
import {useAppDispatch} from "../../../redux/store";
import {useSelector} from "react-redux";
import Pagination from "../../Pagination/Pagination";
import {
    currentUpcomingPageSelector,
    fetchUpcoming,
    isLoadingUpcomingPageSelector,
    setCurrentPage,
    totalUpcomingSlicePagesSelector,
    upcomingSelector
} from "../../../redux/Slices/upcomingSlice";
import MoviesTable from "../../MoviesTable/MoviesTable";
import qs from 'qs';
import {useNavigate} from "react-router-dom";
import styles from '../CategoryPages.module.scss'

const UpcomingPage: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const movies = useSelector(upcomingSelector)
    const totalPages = useSelector(totalUpcomingSlicePagesSelector)
    const currentPage = useSelector(currentUpcomingPageSelector)
    const isLoading = useSelector(isLoadingUpcomingPageSelector)
    const isMounted = React.useRef(false);

    useEffect(() => {
        if (isMounted.current) {
            const params = {
                currentPage,
            };
            const queryString = qs.stringify(params, {skipNulls: true});
            navigate(`?${queryString}`);
        }
        dispatch(fetchUpcoming(currentPage))
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
                <h1 className={styles.heading}>Upcoming movies</h1>
            </div>
            <MoviesTable isLoading={isLoading} movies={movies}/>
            <Pagination page={currentPage} total_pages={totalPages}
                        onClickHandler={(num: number) => dispatch(setCurrentPage(num))}/>
        </>
    );
}

export default UpcomingPage;