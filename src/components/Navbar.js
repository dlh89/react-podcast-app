import React from 'react';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';


const Navbar = () => (
    <div className="container">
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>            
            <SearchBar />
        </ul>
    </div>
)

export default Navbar;