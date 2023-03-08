import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './Header.module.scss'
import BurgerMenu from './BurgerMenu'
import { useScrollBlock } from '../../Hooks/blockScroll'

const Header: React.FC = () => {
	const location = useLocation()
	const pathname = location.pathname
	const [isBurgerActive, setBurgerActive] = useState(false)
	const [blockScroll, allowScroll] = useScrollBlock()

	useEffect(() => {
		if (isBurgerActive) {
			blockScroll()
		} else {
			allowScroll()
		}
	}, [isBurgerActive])

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<NavLink to='/movie-app-ts/' className={styles.logo}>
					My<span>Movie</span>App
				</NavLink>
				<nav className={styles.nav}>
					<ul className={styles.list}>
						<li
							className={
								styles.item +
								(pathname[pathname.length - 1] === '/'
									? ' ' + styles.active
									: '')
							}
						>
							<NavLink to='/movie-app-ts/'>Main</NavLink>
						</li>
						<li
							className={
								styles.item +
								(pathname.includes('/search') ? ' ' + styles.active : '')
							}
						>
							<NavLink to='/movie-app-ts/search'>Search</NavLink>
						</li>
						<li
							className={
								styles.item +
								(pathname.includes('/popular') ? ' ' + styles.active : '')
							}
						>
							<NavLink to='/movie-app-ts/popular'>Popular</NavLink>
						</li>
						<li
							className={
								styles.item +
								(pathname.includes('/upcoming') ? ' ' + styles.active : '')
							}
						>
							<NavLink to='/movie-app-ts/upcoming'>Upcoming</NavLink>
						</li>
					</ul>
				</nav>
				<div
					onClick={() => {
						document.body.style.overflowY = isBurgerActive ? 'scroll' : 'hidden'
						setBurgerActive(!isBurgerActive)
					}}
					className={styles.burger}
				>
					<span />
				</div>
			</div>
			<BurgerMenu active={isBurgerActive} setActive={setBurgerActive} />
		</header>
	)
}

export default Header
