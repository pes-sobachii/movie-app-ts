import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import './styles/style.scss'
import Header from './Components/Header/Header'
import MainPage from './Components/Main/MainPage'

const PopularPage = React.lazy(
	() => import('./Components/CategoryPages/Popular/PopularPage')
)
const Search = React.lazy(() => import('./Components/Search/Search'))
const UpcomingPage = React.lazy(
	() => import('./Components/CategoryPages/Upcoming/UpcomingPage')
)
const DetailsPage = React.lazy(() => import('./Components/Details/DetailsPage'))
const PageNotFound = React.lazy(
	() => import('./Components/404Page/PageNotFound')
)

const App: React.FC = () => {
	return (
		<div className='wrapper'>
			<Header />
			<div className='movie-page'>
				<div className='container'>
					<Routes>
						<Route
							path='/movie-app-ts/'
							element={
								<Suspense fallback={<></>}>
									<MainPage />
								</Suspense>
							}
						/>
						<Route
							path='/movie-app-ts/popular'
							element={
								<Suspense fallback={<></>}>
									<PopularPage />
								</Suspense>
							}
						/>
						<Route
							path='/movie-app-ts/search'
							element={
								<Suspense fallback={<></>}>
									<Search />
								</Suspense>
							}
						/>
						<Route
							path='/movie-app-ts/upcoming'
							element={
								<Suspense fallback={<></>}>
									<UpcomingPage />
								</Suspense>
							}
						/>
						<Route
							path='/movie-app-ts/search/:id'
							element={
								<Suspense fallback={<></>}>
									<DetailsPage />
								</Suspense>
							}
						/>
						<Route
							path='*'
							element={
								<Suspense fallback={<></>}>
									<PageNotFound />
								</Suspense>
							}
						/>
					</Routes>
				</div>
			</div>
		</div>
	)
}

export default App
