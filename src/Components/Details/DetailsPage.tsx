import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import styles from './DetailsPage.module.scss'

import {detailsSelector, fetchDetails} from "../../redux/Slices/detailsSlice";
import {useAppDispatch} from "../../redux/store";

const DetailsPage:React.FC = () => {

    const dispatch = useAppDispatch()
    const {id} = useParams()
    const detailsItem = useSelector(detailsSelector)

    useEffect(() => {
        if(id !== undefined) {
            dispatch(fetchDetails(+id))
        }
    }, [])

    if (detailsItem){

        return (
            <>
                <h1 className={styles.title}>{detailsItem.title}</h1>
                <div className={styles.row}>
                    <div className={styles.poster}>
                        {!detailsItem.poster_path ? <Skeleton baseColor={"#5d5c5c"} highlightColor={"#858585"} className={styles.skeleton}/> : <img
                            src={detailsItem?.poster_path ? `https://image.tmdb.org/t/p/w300${detailsItem.poster_path}` : `https://ih1.redbubble.net/image.370389900.3139/flat,750x,075,f-pad,750x1000,f8f8f8.u4.jpg`}
                            alt={detailsItem.title}/>}
                    </div>
                    <div className={styles.info}>
                        <ul>
                            <li><strong>Original Title</strong>: {detailsItem.original_title}</li>
                            <li><strong>Genres</strong>: {detailsItem.genres.map( (item) => <span key={item.id} className={styles.pill + ' ' + styles.genrePill}>{item.name} </span>)}</li>
                            <li><strong>Countries</strong>: {detailsItem.production_countries.map( (item) => <span key={item.iso_3166_1} className={styles.pill}>{item.name} </span>)}</li>
                            <li><strong>IMDB ID</strong>: {detailsItem.imdb_id}</li>
                            <li><strong>Release Date</strong>: {detailsItem.release_date}</li>
                            <li><strong>Overview</strong>: {detailsItem.overview}</li>
                        </ul>
                    </div>
                </div>
            </>
        );
    }
    return (
        <div></div>
    )
};

export default DetailsPage;