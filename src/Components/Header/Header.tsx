import React from 'react';
import {NavLink, useLocation} from "react-router-dom";

function Header() {

    const location = useLocation();
    const pathname = location.pathname;

    return (
        <header className='header'>
            <div className="container header__container">
                <NavLink to='/' className="header__logo">My<span>Movie</span>App</NavLink>
                <nav className="header__nav">
                    <ul className="header__nav-list">
                        <li className={"header__nav-item" + (pathname === '/' ? " nav-item__active" : '')}><NavLink to='/'>Main</NavLink></li>
                        <li className={"header__nav-item" + (pathname === '/search' ? " nav-item__active" : '')}><NavLink to='/search'>Search</NavLink></li>
                        <li className={"header__nav-item" + (pathname === '/popular' ? " nav-item__active" : '')}><NavLink to='/popular'>Popular</NavLink></li>
                        <li className={"header__nav-item" + (pathname === '/upcoming' ? " nav-item__active" : '')}><NavLink to='/upcoming'>Upcoming</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;