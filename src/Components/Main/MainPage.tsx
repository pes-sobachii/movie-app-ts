import React, {useEffect, useRef} from 'react';
import {fetchPopular, popularSelector} from "../../redux/Slices/popularSlice";
import {useAppDispatch} from "../../redux/store";
import {useSelector} from "react-redux";
import {fetchUpcoming, upcomingSelector} from "../../redux/Slices/upcomingSlice";
import CustomSlider from "../Slider/CustomSlider";
import {Link} from "react-router-dom";
import {fetchNowAired, searchedSelector} from "../../redux/Slices/searchSlice";
import WideSlider from "../WideSlider/WideSlider";
import {MdOutlineNavigateBefore, MdOutlineNavigateNext} from "react-icons/md";
import Slider from "react-slick";
import {IconContext} from "react-icons";

const MainPage = () => {

    useEffect(() => {
        dispatch(fetchPopular(1))
        dispatch(fetchUpcoming(1))
        dispatch(fetchNowAired())
    }, [])

    const dispatch = useAppDispatch()
    const popularMovies = useSelector(popularSelector)
    const upcomingMovies = useSelector(upcomingSelector)
    const nowAiredMovies = useSelector(searchedSelector)
    const elemToScrollTo = useRef<HTMLDivElement | null>(null)

    const onClickHandler = () => {elemToScrollTo.current?.scrollIntoView({inline: "end", behavior: "smooth"})}

    return (
        <IconContext.Provider value={{className: "wide-slider-button" }}>
            <div className="movie-page main-page">
                <div className="fullscreen">
                    <div className="fullscreen__overflow">
                        <div className="fullscreen__title">Search for thousands of movies</div>
                        <div className="fullscreen__subtitle">Subscription costs only 196.85$ per month</div>
                        <button className="fullscreen__button" onClick={onClickHandler}>Find a Film</button>
                        <div className="fullscreen__arrow" >
                            <div className="arrow arrow-first"></div>
                            <div className="arrow arrow-second"></div>
                        </div>
                    </div>
                </div>
                <div ref={elemToScrollTo} className="container">
                    <div className="main-page__slider main-page__wide-slider">
                        <h2 className="wide-slider__title slider__title">The most watched titles right now</h2>
                        <WideSlider movies={nowAiredMovies}/>
                    </div>
                    <hr/>
                    <div className="main-page__slider">
                        {popularMovies ? <CustomSlider movies={popularMovies}/> : <></>}
                        <div className="popular-slider__row slider__row">
                            <h2 className="popular-slider__title slider__title">Popular Movies</h2>
                            <p className="popular-slider__description slider__description">Discover the most searched movies on TMDB site. </p>
                            <Link className='popular-slider__link slider__link' to={'/popular'}>More...</Link>
                        </div>
                    </div>
                    <hr/>
                    <div className="main-page__slider">
                        <div className="upcoming-slider__row slider__row">
                            <h2 className="upcoming-slider__title slider__title">Upcoming Movies</h2>
                            <p className="upcoming-slider__description slider__description">Discover the most searched movies on TMDB site. </p>
                            <Link className='upcoming-slider__link slider__link' to={"/upcoming"}>More...</Link>
                        </div>
                        {upcomingMovies ? <CustomSlider movies={upcomingMovies}/> : <></>}
                    </div>
                </div>
            </div>
        </IconContext.Provider>
    );
};

export default MainPage;