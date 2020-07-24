import React, { useState } from 'react';
import AddShips from './AddShips';

const AlliesList = props => {

    const [shipsLoaded, changeShips] = useState(false);

    function addAllies() {
        changeShips(!shipsLoaded);
    }
    return (
        <div className="allies-list-wrapper">
            <div className="allies-list-header-wrapper">
                <div className="text-wrapper">
                    <h4>Allies list</h4>
                    <p>0 / 0</p>
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

                <p onClick={e => addAllies(e)}>[{shipsLoaded ? '-' : '+'}] Add Unit</p>
                {shipsLoaded && (
                    <AddShips faction="allies" />
                )}

            </div>
        </div>
    )
}
export default AlliesList;