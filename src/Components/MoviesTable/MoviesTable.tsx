import React from 'react'
import Skeleton from 'react-loading-skeleton'

import styles from './MoviesTable.module.scss'

import MovieCard from './MovieCard'
import { FetchedItemType } from '../../Types/Types'


const MoviesTable: React.FC<{
	isLoading: boolean
	movies: FetchedItemType[]
}> = ({ isLoading, movies }) => {
	return (
		<div className={styles.grid}>
			{isLoading
				? [...new Array(20)].map((v, i) => (
						<Skeleton
							key={i}
							baseColor={'#5d5c5c'}
							highlightColor={'#858585'}
							height={300}
							width={200}
						/>
				  ))
				: movies.map((movie) => <MovieCard {...movie} key={movie.id} />)}
		</div>
	)
}

export default MoviesTable
