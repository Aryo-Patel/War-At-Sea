import React, { useEffect } from 'react';


import { connect } from 'react-redux';
import { loadAllShips } from '../actions/ships';
const Header = ({ loadAllShips }) => {
    useEffect(() => {
        loadAllShips();
    }, []);
    return (
        <div className="header">
            <span className="first-half">
                <b>War At Sea</b>
            </span>
            <span className="second-half">
                {" "}List Generator
            </span>
            
        </div>
    )
}

export default connect(null, { loadAllShips })(Header);