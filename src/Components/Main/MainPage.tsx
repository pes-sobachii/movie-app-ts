import React, {useEffect, useRef} from 'react';
import {fetchPopular, isLoadingPopularSelector, popularSelector} from "../../redux/Slices/popularSlice";
import {useAppDispatch} from "../../redux/store";
import {useSelector} from "react-redux";
import {fetchUpcoming, isLoadingUpcomingPageSelector, upcomingSelector} from "../../redux/Slices/upcomingSlice";
import CustomSlider from "../Slider/CustomSlider";
import {Link} from "react-router-dom";
import {fetchNowAired, isLoadingSelector, searchedSelector} from "../../redux/Slices/searchSlice";
import WideSlider from "../WideSlider/WideSlider";
import {IconContext} from "react-icons";
import Fullscreen from "./Fullscreen/Fullscreen";
import styles from './MainPage.module.scss'

const MainPage:React.FC = () => {

    useEffect(() => {
        dispatch(fetchPopular(1))
        dispatch(fetchUpcoming(1))
        dispatch(fetchNowAired())
    }, [])

    const dispatch = useAppDispatch()
    const popularMovies = useSelector(popularSelector)
    const upcomingMovies = useSelector(upcomingSelector)
    const nowAiredMovies = useSelector(searchedSelector)
    const nowAiredIsLoading = useSelector(isLoadingSelector)
    const popularIsLoading = useSelector(isLoadingPopularSelector)
    const upcomingIsLoading = useSelector(isLoadingUpcomingPageSelector)
    const elemToScrollTo = useRef<HTMLDivElement | null>(null)

    const onClickHandler = () => {elemToScrollTo.current?.scrollIntoView({behavior: "smooth" })}

    return (
        <IconContext.Provider value={{className: "wide-slider-button"}}>
                <Fullscreen onClickHandler={onClickHandler} />
                <div className={styles.fullscreenPlaceholder}/>
                <div ref={elemToScrollTo} className={styles.wrapper}>
                    <div className={styles.sliderBlock + ' ' + styles.wideSlider}>
                        <h2>The most watched titles right now</h2>
                        <WideSlider isLoading={nowAiredIsLoading} movies={nowAiredMovies}/>
                    </div>
                    <hr/>
                    <div className={styles.sliderBlock + ' ' + styles.firstSlick}>
                        {popularMovies ? <CustomSlider isLoading={popularIsLoading} movies={popularMovies}/> : <></>}
                        <div className={styles.info}>
                            <h2 className={styles.infoTitle}>Popular Movies</h2>
                            <p className={styles.infoDescription}>Discover the most searched movies on TMDB site. Here you will definitely find an appropriate movie for you </p>
                            <Link to={'/movie-app-ts/popular'}>More...</Link>
                        </div>
                    </div>
                    <hr/>
                    <div className={styles.sliderBlock + ' ' + styles.secondSlick}>
                        <div className={styles.info}>
                            <h2 className={styles.infoTitle}>Upcoming Movies</h2>
                            <p className={styles.infoDescription}>The list of upcoming titles is regularly updated and contains relevant information. Be always aware of the trends!</p>
                            <Link to={"/movie-app-ts/upcoming"}>More...</Link>
                        </div>
                        {upcomingMovies ? <CustomSlider isLoading={upcomingIsLoading} movies={upcomingMovies}/> : <></>}
                    </div>
                </div>
        </IconContext.Provider>
    );
};

export default MainPage;