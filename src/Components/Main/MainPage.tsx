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

    const onClickHandler = () => {elemToScrollTo.current?.scrollIntoView({inline: "end", behavior: "smooth"})}

    return (
        <IconContext.Provider value={{className: "wide-slider-button"}}>
            <div className="movie-page main-page">
                <div className="fullscreen">
                    <div className="fullscreen__overflow">
                        <div className="fullscreen__title">Search for thousands of movies</div>
                        <div className="fullscreen__subtitle">Subscription costs only 196.85$ per month</div>
                        <button className="fullscreen__button" onClick={onClickHandler}>Start exploring</button>
                        <div className="fullscreen__arrow" >
                            <div className="arrow arrow-first"></div>
                            <div className="arrow arrow-second"></div>
                        </div>
                    </div>
                </div>
                <div ref={elemToScrollTo} className="container">
                    <div className="main-page__slider main-page__wide-slider">
                        <h2 className="wide-slider__title slider__title">The most watched titles right now</h2>
                        <WideSlider isLoading={nowAiredIsLoading} movies={nowAiredMovies}/>
                    </div>
                    <hr/>
                    <div className="main-page__slider first-slick">
                        {popularMovies ? <CustomSlider isLoading={popularIsLoading} movies={popularMovies}/> : <></>}
                        <div className="info">
                            <h2 className="info__title">Popular Movies</h2>
                            <p className="info__description">Discover the most searched movies on TMDB site. Here you will definitely find an appropriate movie for you </p>
                            <Link className='info__link' to={'/movie-app-ts/popular'}>More...</Link>
                        </div>
                    </div>
                    <hr/>
                    <div className="main-page__slider second-slick">
                        <div className="info">
                            <h2 className="info__title">Upcoming Movies</h2>
                            <p className="info__description">The list of upcoming titles is regularly updated and contains relevant information. Be always aware of the trends!</p>
                            <Link className='info__link' to={"/movie-app-ts/upcoming"}>More...</Link>
                        </div>
                        {upcomingMovies ? <CustomSlider isLoading={upcomingIsLoading} movies={upcomingMovies}/> : <></>}
                    </div>
                </div>
            </div>
        </IconContext.Provider>
    );
};

export default MainPage;