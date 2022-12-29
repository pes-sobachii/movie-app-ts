import React, {useEffect} from 'react';
import MovieCard from "../MovieCard/MovieCard";
import Pagination from "../Pagination/Pagination";
import {fetchPopular} from "../../redux/Slices/popularSlice";
import {detailsSelector, fetchDetails} from "../../redux/Slices/detailsSlice";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../redux/store";

const DetailsPage = () => {

    const dispatch = useAppDispatch()
    const {id} = useParams()
    const detailsItem = useSelector(detailsSelector)
    console.log(detailsItem)

    useEffect(() => {
        if(id !== undefined) {
            dispatch(fetchDetails(+id))
        }
    }, [])

    if (detailsItem){
        return (
            <div className="movie-page details-page">
                <div className="container">
                    <h1 className="details-page__title">{detailsItem.title}</h1>
                    <div className="details-page__row">
                        <div className="details-page__poster">
                            <img
                                src={detailsItem?.poster_path ? `https://image.tmdb.org/t/p/w300${detailsItem.poster_path}` : `https://ih1.redbubble.net/image.370389900.3139/flat,750x,075,f-pad,750x1000,f8f8f8.u4.jpg`}
                                alt=""/>
                        </div>
                        <div className="details-page__info">
                            {/*{detailsItem.overview}*/}
                            <ul>
                                <li><strong>Original Title</strong>: {detailsItem.original_title}</li>
                                <li><strong>Genres</strong>: {detailsItem.genres.map( (item) => <span className='genre-pill details-pill'>{item.name} </span>)}</li>
                                <li><strong>Countries</strong>: {detailsItem.production_countries.map( (item) => <span className='genre-pill details-pill'>{item.name} </span>)}</li>
                                <li><strong>IMDB ID</strong>: {detailsItem.imdb_id}</li>
                                <li><strong>Release Date</strong>: {detailsItem.release_date}</li>
                                <li><strong>Overview</strong>: {detailsItem.overview}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div></div>
    )
};

export default DetailsPage;