import React from 'react';
import styles from './Fullscreen.module.scss'

const Fullscreen:React.FC<{onClickHandler: () => void}> = ({onClickHandler}) => {
    return (
        <div className={styles.fullscreen}>
            <div className={styles.overflow}>
                <div className={styles.title}>Search for thousands of movies</div>
                <div className={styles.subtitle}>Subscription costs only 196.85$ per month</div>
                <button className={styles.button} onClick={onClickHandler}>Start exploring</button>
                <div  >
                    <div className={styles.arrowFirst + ' ' + styles.arrow}></div>
                    <div className={styles.arrowSecond + ' ' + styles.arrow}></div>
                </div>
            </div>
        </div>
    );
};

export default Fullscreen;