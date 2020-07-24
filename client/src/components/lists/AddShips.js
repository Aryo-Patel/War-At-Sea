import React, { useEffect, useState, Fragment } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import axios from 'axios';
const AddShips = ({ allies, axis, faction }) => {
    const [ships, updateShips] = useState([]);
    const [displayShips, updateDisplay] = useState([]);
    let displayArray = {};
    useEffect(() => {
        async function getShips() {
            let data;
            faction === 'axis' ? data = axis : data = allies;
            let shipArray = await axios.post('/ships/selected', { ships: data, faction }, { headers: { 'Content-Type': 'application/json' } });

            updateShips(shipArray.data);
        }
        getShips();
    }, []);
    useEffect(() => {
        console.log(displayShips);
    }, [displayShips]);
    useEffect(() => {
        updateDisplayArray();
    }, [ships]);
    let i = 0;

    function updateDisplayArray() {
        ships.forEach(ship => {
            if (Object.keys(displayArray).indexOf(ship.nation) == -1) {
                displayArray[ship.nation] = [{
                    name: ship.name,
                    number_available: ship.number_available,
                    points: ship.points
                }];

            }
            else {
                console.log(displayArray);
                displayArray[ship.nation].push({
                    name: ship.name,
                    number_available: ship.number_available,
                    points: ship.points
                })
            }
        });
        console.log(displayArray);
        let tempArr = [];
        Object.keys(displayArray).forEach(nation => {

            tempArr.push({
                nation,
                ships: displayArray[nation]
            })
        });
        updateDisplay([...displayShips, ...tempArr]);

    }
    function displayShip() {

    }
    return (
        <div id="add-ship">
            <p id="minimize"> [+]</p>
            <p id="close">X</p>
            <div id="ship-content">
                {faction === 'allies' ? (
                    displayShips.map(nation => {

                        return (
                            <div className="ship-wrapper">
                                <p key={i++} className="header-text">{nation.nation}</p>
                                {nation.ships.map(ship => (
                                    <div className="ship-content-holder" onClick={e => displayShip()}>
                                        <p key={i++} className="ship">{ship.name}</p>
                                        <p key={i++} className="number-available">{ship.number_available}</p>
                                        <p key={i++} className="point-value">{ship.points}</p>
                                    </div>
                                ))}
                            </div>

                        )
                    })
                ) :
                    (
                        displayShips.map(nation => {

                            return (
                                <Fragment>
                                    <p key={i++} className="header-text">{nation.nation}</p>
                                    {nation.ships.map(ship => (
                                        <p key={i++} className="ship">{ship.name}</p>
                                    ))}
                                </Fragment>

                            )
                        })
                    )}
            </div>
        </div>
    )
}

AddShips.propTypes = {
    allies: PropTypes.array,
    axis: PropTypes.array
}

const mapStateToProps = state => ({

    allies: state.userSelection.allies,
    axis: state.userSelection.axis
})

export default connect(mapStateToProps, {})(AddShips);