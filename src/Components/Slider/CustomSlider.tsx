import React, {useRef} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {FetchedItemType} from "../Types/Types";
import SliderCard from "../SliderCard/SliderCard";
import {MdOutlineNavigateBefore, MdOutlineNavigateNext} from "react-icons/md";
import Skeleton from "react-loading-skeleton";

const CustomSlider:React.FC<{ movies: FetchedItemType[], isLoading: boolean }> = ({movies, isLoading}) => {

    const sliderRef = useRef<Slider | null>(null)

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    infinite: true,
                }
            },
            {
                breakpoint: 520,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                }
            }
        ]
    };

    return (
        <>
        <div className='slider__wrapper'>
            {!isLoading ?
                <>
                    <MdOutlineNavigateBefore onClick={() => sliderRef.current?.slickPrev()}/>
                        <Slider ref={sliderRef} className='slider' {...settings}>
                            {movies.slice(0, 10).map((movie) => {
                                return <SliderCard {...movie} key={movie.id}/>
                            })}
                        </Slider>
                    <MdOutlineNavigateNext onClick={() => sliderRef.current?.slickNext()}/>
                </>
                :
                <>
                    <MdOutlineNavigateBefore />
                    <div className="slider__skeleton-slider">
                        <div className="skeleton-slider__item"><Skeleton baseColor={"#5d5c5c"} highlightColor={"#858585"} width={'100%'} height={'100%'}/></div>
                        <div className="skeleton-slider__item"><Skeleton baseColor={"#5d5c5c"} highlightColor={"#858585"} width={'100%'} height={'100%'}/></div>
                        <div className="skeleton-slider__item"><Skeleton baseColor={"#5d5c5c"} highlightColor={"#858585"} width={'100%'} height={'100%'}/></div>
                    </div>
                    <MdOutlineNavigateNext />
                </>}
        </div>

</>

    );
};

export default CustomSlider;