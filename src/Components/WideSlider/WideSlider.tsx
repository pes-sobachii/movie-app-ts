import React, {useRef} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {FetchedItemType} from "../Types/Types";
import {MdOutlineNavigateBefore, MdOutlineNavigateNext} from "react-icons/md";
import {IconContext} from "react-icons";

const WideSlider:React.FC<{ movies: FetchedItemType[] }> = ({movies}) => {

    const sliderRef = useRef<Slider | null>(null)

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    };

    return (
        <div className='slider__wrapper'>
            <MdOutlineNavigateBefore onClick={() => sliderRef.current?.slickPrev()} />
            <Slider ref={sliderRef} className='wide-slider' {...settings}>
                {movies.slice(0, 10).map((movie) => {
                    return(
                        <div className='wide-slider-card'>
                            <div className="wide-slider-card__overflow">
                                <h3 className="wide-slider-card__title">{movie.title}</h3>
                            </div>
                            <img src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`:`https://ih1.redbubble.net/image.370389900.3139/flat,750x,075,f-pad,750x1000,f8f8f8.u4.jpg`} alt=""/>
                        </div>
                    )
                })}
            </Slider>
            <MdOutlineNavigateNext onClick={() => sliderRef.current?.slickNext()}/>
        </div>
    );
};

export default WideSlider;