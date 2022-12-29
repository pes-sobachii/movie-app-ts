import React from 'react';

const Pagination:React.FC<{ total_pages: number, page: number, onClickHandler: any }> = ({total_pages, page, onClickHandler}) => {
    let totalPages = Math.min(total_pages, 500)
    let numbers = []

    for (let i = 0; i < totalPages; i++) {
        numbers.push(i+1)
    }

    if (page > 4){
        numbers = numbers.splice(page - 4, 9)
    } else if (page <= 4){
        numbers = numbers.splice(0, 9)
    } else {
        numbers = numbers.splice(490, 9)
    }

    return (
        <div className='pagination'>
            {page > 4 ? <><span onClick={() => onClickHandler(1)} className={'pagination-number' + (page === 1 ? ' active-page' : '')}>1</span><span className='pagination-number'> ... </span></> : ''}
            {numbers.map(num => <span onClick={() => onClickHandler(num)} key={num} className={'pagination-number' + (page === num ? ' active-page' : '')}>{num}</span>)}
            {page < totalPages - 4 ? <><span className='pagination-number'> ... </span><span onClick={() => onClickHandler(totalPages)} className={'pagination-number' + (page === totalPages ? ' active-page' : '')}>{totalPages}</span></> : ''}
        </div>
    );
}

export default Pagination;