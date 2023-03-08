import React from 'react'
import { Link } from 'react-router-dom'

import { FetchedItemType } from '../../Types/Types'
import styles from './MoviesTable.module.scss'

const MovieCard: React.FC<FetchedItemType> = ({
	poster_path,
	title,
	overview,
	vote_average,
	id,
}) => {
	return (
		<Link to={`/movie-app-ts/search/${id}`} className={styles.card}>
			<div className={styles.overlay}>
				<h3>{title}</h3>
				<p>{overview}</p>
			</div>

			<div
				className={
					styles.rateCircle +
					' ' +
					(vote_average >= 8
						? styles.good
						: vote_average > 4
						? styles.normal
						: styles.bad)
				}
			>
				{vote_average}
			</div>

			<img
				src={
					poster_path
						? `https://image.tmdb.org/t/p/w200${poster_path}`
						: `https://ih1.redbubble.net/image.370389900.3139/flat,750x,075,f-pad,750x1000,f8f8f8.u4.jpg`
				}
				alt={`${title} Poster`}
			/>
		</Link>
	)
}

export default MovieCard
