import React, {useRef} from 'react';
import MovieCard from "../MovieCard/MovieCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {FetchedItemType} from "../Types/Types";
import SliderCard from "../SliderCard/SliderCard";
import {MdOutlineNavigateBefore, MdOutlineNavigateNext} from "react-icons/md";

const CustomSlider:React.FC<{ movies: FetchedItemType[] }> = ({movies}) => {

    const sliderRef = useRef<Slider | null>(null)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false,
    };

    return (
        <div className='slider__wrapper'>
            <MdOutlineNavigateBefore onClick={() => sliderRef.current?.slickPrev()} />
            <Slider ref={sliderRef} className='slider' {...settings}>
                {movies.slice(0, 10).map((movie) => {
                    return <SliderCard {...movie} key={movie.id}/>
                })}
            </Slider>
            <MdOutlineNavigateNext onClick={() => sliderRef.current?.slickNext()}/>
        </div>

    );
};

export default CustomSlider;