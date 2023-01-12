import React from 'react';
import {Link} from "react-router-dom";
import styles from './Header.module.scss'

const BurgerMenu:React.FC<{active: boolean, setActive: (value: boolean) => void }> = ({active, setActive}) => {

    const onClickHandler:() => void = () => setActive(!active)

    const links:{path: string, title: string}[] = [
        {title: 'Main', path: `/movie-app-ts/`},
        {title: 'Search', path: `/movie-app-ts/search`},
        {title: 'Popular', path: `/movie-app-ts/popular`},
        {title: 'Upcoming', path: `/movie-app-ts/upcoming`}
    ]

    return (
        <div className={styles.menu + (active ? ' ' + styles.visible : "")}>
            <div className={styles.container}>
                <ul>
                    {links.map((item) => {
                        return <li key={item.title} className={styles.item}><Link onClick={onClickHandler} to={item.path}>{item.title}</Link></li>
                    })}
                </ul>
            </div>
        </div>
    );
};

export default BurgerMenu;