import React, {useRef} from 'react';
import Slider from "react-slick";
import {MdOutlineNavigateBefore, MdOutlineNavigateNext} from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import {Swiper, SwiperSlide} from 'swiper/react'
import {FreeMode} from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './CustomSlider.module.scss'

import {FetchedItemType} from "../../Types/Types";
import SliderCard from "./SliderCard";

const CustomSlider:React.FC<{ movies: FetchedItemType[], isLoading: boolean }> = ({movies, isLoading}) => {

    const sliderRef = useRef<Slider | null>(null)

    {/*const settings = {*/}
    {/*    dots: false,*/}
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     variableWidth: true,
    //     arrows: false,
    //     responsive: [
    //         {
    //             breakpoint: 1200,
    {/*            settings: {*/}
    {/*                slidesToShow: 2,*/}
    //                 infinite: true,
    //             }
    //         },
    //         {
    //             breakpoint: 520,
    //             settings: {
    //                 slidesToShow: 1,
    //                 infinite: true,
    //             }
    //         }
    //     ]
    // };

    return (
        <>
        <div className={styles.wrapper}>
            {!isLoading ?
                <>
                    <Swiper freeMode={true} grabCursor={true} modules={[FreeMode]} className={styles.slider}
                            breakpoints={{
                                1200: {slidesPerView: 4, spaceBetween: 10},
                                760: {slidesPerView: 3, spaceBetween: 10},

                            }}>
                        {movies.slice(0, 10).map(movie => {
                            return <SwiperSlide key={movie.id}>
                                <SliderCard {...movie} />
                            </SwiperSlide>
                        })}
                    </Swiper>
                    {/*<MdOutlineNavigateBefore onClick={() => sliderRef.current?.slickPrev()}/>*/}
                    {/*    <Slider ref={sliderRef} className={styles.slider} {...settings}>*/}
                    {/*        {movies.slice(0, 10).map((movie) => {*/}
                    {/*            return <SliderCard {...movie} key={movie.id}/>*/}
                    {/*        })}*/}
                    {/*    </Slider>*/}
                    {/*<MdOutlineNavigateNext onClick={() => sliderRef.current?.slickNext()}/>*/}
                    {/*<Slider ref={sliderRef} className={styles.slider} {...settings}>*/}
                    {/*    {movies.slice(0, 10).map(item => {*/}
                    {/*        return (*/}
                    {/*            <div>*/}
                    {/*                <div style={{backgroundColor: 'red', margin: 'auto'}}>*/}
                    {/*                    <div >*/}
                    {/*                        <img src={item.poster_path?`https://image.tmdb.org/t/p/w200${item.poster_path}`:`https://ih1.redbubble.net/image.370389900.3139/flat,750x,075,f-pad,750x1000,f8f8f8.u4.jpg`} alt=""/>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        )*/}
                    {/*    })*/}
                    {/*    }*/}
                    {/*</Slider>*/}
                    </>
                :
                <>
                    <MdOutlineNavigateBefore />
                    <div className={styles.skeleton}>
                        <div className={styles.item}><Skeleton baseColor={"#5d5c5c"} highlightColor={"#858585"} width={'100%'} height={'100%'}/></div>
                        <div className={styles.item}><Skeleton baseColor={"#5d5c5c"} highlightColor={"#858585"} width={'100%'} height={'100%'}/></div>
                        <div className={styles.item}><Skeleton baseColor={"#5d5c5c"} highlightColor={"#858585"} width={'100%'} height={'100%'}/></div>
                    </div>
                    <MdOutlineNavigateNext />
                </>}
        </div>

</>

    );
};

export default CustomSlider;