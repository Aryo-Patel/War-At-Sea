import React from 'react';

const Points = props => {
    return (
        <div className="points-wrapper">
            <input type="number" className="point-wrapper-placeholder" placeholder="Point Limit" />
            <button className="RANDOM">RANDOM</button>
            <button className="RESET">RESET</button>
        </div>
    )
}

export default Points;