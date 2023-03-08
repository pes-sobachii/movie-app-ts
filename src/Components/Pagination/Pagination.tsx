import React from 'react'

import styles from './Pagination.module.scss'

const Pagination: React.FC<{
	total_pages: number
	page: number
	onClickHandler: any
}> = ({ total_pages, page, onClickHandler }) => {
	let totalPages = Math.min(total_pages, 500)
	let numbers = []

	for (let i = 0; i < totalPages; i++) {
		numbers.push(i + 1)
	}

	if (page > 4) {
		numbers = numbers.splice(page - 4, 9)
	} else if (page <= 4) {
		numbers = numbers.splice(0, 9)
	} else {
		numbers = numbers.splice(490, 9)
	}

	if (total_pages < 2) {
		return <></>
	}

	return (
		<div className={styles.pagination}>
			{page > 4 ? (
				<>
					<span
						onClick={() => onClickHandler(1)}
						className={
							styles.number + (page === 1 ? ' ' + styles.activePage : '')
						}
					>
						1
					</span>
					<span className={styles.number}> ... </span>
				</>
			) : (
				''
			)}
			{numbers.map((num) => (
				<span
					onClick={() => onClickHandler(num)}
					key={num}
					className={
						styles.number + (page === num ? ' ' + styles.activePage : '')
					}
				>
					{num}
				</span>
			))}
			{page < totalPages - 4 ? (
				<>
					<span className={styles.number}> ... </span>
					<span
						onClick={() => onClickHandler(totalPages)}
						className={
							styles.number +
							(page === totalPages ? ' ' + styles.activePage : '')
						}
					>
						{totalPages}
					</span>
				</>
			) : (
				''
			)}
		</div>
	)
}

export default Pagination
