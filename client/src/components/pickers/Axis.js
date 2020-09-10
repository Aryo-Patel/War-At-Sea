import React from 'react';

const Axis = props => {


    return (
        <div className="axis-wrapper">
            <div className="axis-text-wrapper">
                <h4 className="axis-text">Axis Faction</h4>
            </div>
            <div className="axis-items">
                <label className="container" id="all">
                    <input type="radio" />
                    <span className="checkmark"></span>
                    All
                </label>
                <label className="container" id="italy">
                    <input type="radio" />
                    <span className="checkmark"></span>
                    Italy
                </label>
                <label className="container" id="finland">
                    <input type="radio" />
                    <span className="checkmark"></span>
                    Finland
                </label>
                <label className="container" id="japan">
                    <input type="radio" />
                    <span className="checkmark"></span>
                    Japan
                </label>
                <label className="container" id="germany">
                    <input type="radio" />
                    <span className="checkmark"></span>
                    Germany
                </label>
                <label className="container" id="neutral">
                    <input type="radio" />
                    <span className="checkmark"></span>
                    Axis Neutral / Instalations
                </label>
            </div>
        </div>
    );
}
export default Axis;