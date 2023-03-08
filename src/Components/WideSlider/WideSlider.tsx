import React, {useRef} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {FetchedItemType} from "../../Types/Types";
import {MdOutlineNavigateBefore, MdOutlineNavigateNext} from "react-icons/md";
import {Link} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import styles from './WideSlider.module.scss'

const WideSlider:React.FC<{ movies: FetchedItemType[], isLoading: boolean }> = ({movies, isLoading}) => {

    const sliderRef = useRef<Slider | null>(null)

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false,
        arrows: false,
        adaptiveHeight: true,
    };

    return (
        <div className={styles.wrapper}>
            <MdOutlineNavigateBefore onClick={() => sliderRef.current?.slickPrev()} />
            <Slider ref={sliderRef} className={styles.wideSlider} {...settings}>
                {isLoading ? [...new Array(20)].map((v, i) => <div className={styles.wideSkeleton}/>) : movies.slice(0, 10).map((movie) => {
                    return(
                        <Link key={movie.id} to={`/movie-app-ts/search/${movie.id}`} className={styles.card}>
                            <div className={styles.overflow}>
                                <h3 className={styles.cardTitle}>{movie.title}</h3>
                            </div>
                            <img src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`:`https://ih1.redbubble.net/image.370389900.3139/flat,750x,075,f-pad,750x1000,f8f8f8.u4.jpg`} alt=""/>
                        </Link>
                    )
                })}
            </Slider>
            <MdOutlineNavigateNext onClick={() => sliderRef.current?.slickNext()}/>
        </div>
    );
};

export default WideSlider;