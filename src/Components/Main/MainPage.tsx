import React, {useEffect, useRef} from 'react'
import {useSelector} from 'react-redux'
import {IconContext} from 'react-icons'
import {Link} from 'react-router-dom'

import styles from './MainPage.module.scss'

import {fetchNowAired, searchedSelector,} from '../../redux/Slices/searchSlice'
import {fetchPopular, popularSelector,} from '../../redux/Slices/popularSlice'
import {fetchUpcoming, upcomingSelector,} from '../../redux/Slices/upcomingSlice'
import {useAppDispatch} from '../../redux/store'
import CustomSlider from '../Slider/CustomSlider'
import WideSlider from '../WideSlider/WideSlider'
import Fullscreen from './Fullscreen/Fullscreen'

const MainPage: React.FC = () => {
	useEffect(() => {
		dispatch(fetchPopular(1))
		dispatch(fetchUpcoming(1))
		dispatch(fetchNowAired())
	}, [])

	const dispatch = useAppDispatch()
	const popularMovies = useSelector(popularSelector)
	const upcomingMovies = useSelector(upcomingSelector)
	const nowAiredMovies = useSelector(searchedSelector)
	const elemToScrollTo = useRef<HTMLDivElement | null>(null)

	const onClickHandler = () => {
		elemToScrollTo.current?.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<IconContext.Provider value={{ className: 'wide-slider-button' }}>
			<Fullscreen onClickHandler={onClickHandler} />
			<div className={styles.fullscreenPlaceholder} />
			<div ref={elemToScrollTo} className={styles.wrapper}>
				<div className={styles.sliderBlock + ' ' + styles.wideSlider}>
					<h2>The most watched titles right now</h2>
					<WideSlider isLoading={nowAiredMovies.isLoading} movies={nowAiredMovies.movies} />
				</div>
				<hr />
				<div className={styles.sliderBlock + ' ' + styles.firstSlick}>
					{popularMovies ? (
						<CustomSlider isLoading={popularMovies.isLoading} movies={popularMovies.items} />
					) : (
						<></>
					)}
					<div className={styles.info}>
						<h2 className={styles.infoTitle}>Popular Movies</h2>
						<p className={styles.infoDescription}>
							Discover the most searched movies on TMDB site. Here you will
							definitely find an appropriate movie for you{' '}
						</p>
						<Link to={'/movie-app-ts/popular'}>More...</Link>
					</div>
				</div>
				<hr />
				<div className={styles.sliderBlock + ' ' + styles.secondSlick}>
					<div className={styles.info}>
						<h2 className={styles.infoTitle}>Upcoming Movies</h2>
						<p className={styles.infoDescription}>
							The list of upcoming titles is regularly updated and contains
							relevant information. Be always aware of the trends!
						</p>
						<Link to={'/movie-app-ts/upcoming'}>More...</Link>
					</div>
					{upcomingMovies ? (
						<CustomSlider
							isLoading={upcomingMovies.isLoading}
							movies={upcomingMovies.items}
						/>
					) : (
						<></>
					)}
				</div>
			</div>
		</IconContext.Provider>
	)
}

export default MainPage
