import React from 'react';

import styles from './PageNotFound.module.scss'
import errorPNG from '../../Assets/favpng_symbol-download.png'

const PageNotFound:React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className="container">
                <h2>Page Not Found :(</h2>
                <img src={errorPNG} alt=""/>
            </div>
        </div>
    );
};

export default PageNotFound;