import React from 'react';
import {NavLink, useLocation} from "react-router-dom";

const Header:React.FC<{ active:boolean, setActive: (value: boolean) => void }> = ({active, setActive}) => {

    const location = useLocation();
    const pathname = location.pathname;

    return (
        <header className='header'>
            <div className="container header__container">
                <NavLink to='/movie-app-ts/' className="header__logo">My<span>Movie</span>App</NavLink>
                <nav className="header__nav">
                    <ul className="header__nav-list">
                        <li className={"header__nav-item" + (pathname[pathname.length - 1] === '/' ? " nav-item__active" : '')}><NavLink to='/movie-app-ts/'>Main</NavLink></li>
                        <li className={"header__nav-item" + (pathname.includes('/search') ? " nav-item__active" : '')}><NavLink to='/movie-app-ts/search'>Search</NavLink></li>
                        <li className={"header__nav-item" + (pathname.includes('/popular') ? " nav-item__active" : '')}><NavLink to='/movie-app-ts/popular'>Popular</NavLink></li>
                        <li className={"header__nav-item" + (pathname.includes('/upcoming') ? " nav-item__active" : '')}><NavLink to='/movie-app-ts/upcoming'>Upcoming</NavLink></li>
                    </ul>
                </nav>
                <div onClick={() => setActive(!active)}  className="burger-icon">
                    <span/>
                </div>
            </div>
        </header>
    );
}

export default Header;