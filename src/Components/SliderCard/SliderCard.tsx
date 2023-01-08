import React from 'react';
import {FetchedItemType} from "../Types/Types";
import {Link} from "react-router-dom";

const SliderCard:React.FC<FetchedItemType> = ({poster_path, title, id}) => {
    return (
        <Link to={`/movie-app-ts/search/${id}`} className="slider-card">
                <img
                    src={poster_path?`https://image.tmdb.org/t/p/w200${poster_path}`:`https://ih1.redbubble.net/image.370389900.3139/flat,750x,075,f-pad,750x1000,f8f8f8.u4.jpg`}
                    alt={`${title} Poster`}
                />
        </Link>
    );
}

export default SliderCard;