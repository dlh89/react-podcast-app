import React from 'react';
import SearchBar from '../components/SearchBar';
import { NavLink } from 'react-router-dom';


const Navbar = () => (
    <div className="nav">
        <div className="nav__container">
            <ul className="nav__list">
                <li className="nav__item"><NavLink to="/" className="nav__link" activeClassName="nav__link--active" exact={true}>Home</NavLink></li>
                <li className="nav__item"><NavLink to="/search" className="nav__link" activeClassName="nav__link--active">Search</NavLink></li>            
            </ul>
            <SearchBar />
        </div>
    </div>
)

export default Navbar;