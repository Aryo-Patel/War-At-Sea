import React, { useState } from 'react';
import AddShips from './AddShips';
import ShipsShown from './ShipsShown';
import { connect } from 'react-redux';

const AxisList = ({ points }) => {
    const [shipsLoaded, changeShips] = useState(false);

    function addAxis() {
        changeShips(!shipsLoaded);
    }
    return (
        <div className="axis-list-wrapper">
            <div className="axis-list-header-wrapper">
                <div className="text-wrapper">
                    <h4>Axis list</h4>
                    <p>0 / {points}</p>
                </div>
                <div className="save-options">
                    <i className="fa fa-print"></i>
                    <i className="fa fa-file-pdf-o"></i>
                </div>
            </div>
            <div className="line">
                <hr />
            </div>
            <div className="add-unit">
                <ShipsShown faction='axis' />
                <p onClick={e => addAxis(e)}>[{shipsLoaded ? '-' : '+'}] Add Unit</p>
                {shipsLoaded && (
                    <AddShips faction="axis" />
                )}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    points: state.points
})

export default connect(mapStateToProps, {})(AxisList);