import React, { useEffect, useState, Fragment } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { loadOneShip, updateOneShip } from '../../actions/ships';
import { setFactionPoints } from '../../actions/points';
import axios from 'axios';
const AddShips = ({ allies, axis, faction, shipsInPlay, allShips, loadOneShip, updateOneShip, setFactionPoints, alliesPoints, axisPoints, maxPoints }) => {
    const [ships, updateShips] = useState([]);
    const [displayShips, updateDisplay] = useState([]);
    let displayArray = {};

    let axis_nations = ['Italy, Finland, Japan, Germany, Axis Neutral/Installations'];
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
    function displayShip(e, nation) {
        console.log(nation);
        let relevantShips = displayShips.filter(ship => {
            if (ship.nation === nation) {
                return ship;
            }
        });

        relevantShips = relevantShips[0].ships;

        //find the individual ship
        let shipName = e.target.parentNode.querySelector('[name=ship]').textContent;

        //check to see whether the ship is in ships in play
        let shipInPlay = shipsInPlay.filter(ship => ship.name === shipName);
        console.log(shipInPlay);
        //update redux to include that ship in the ships in play if necessary
        if (shipInPlay.length === 0) {


            let shipPoints = allShips.filter(ship => ship.name === shipName);
            console.log(shipPoints);
            let faction;
            if (axis_nations.indexOf(shipPoints.nation) == -1) {
                faction = 'allies'
            }
            else {
                faction = 'axis';
            }

            shipPoints = shipPoints[0].points;
            if (alliesPoints + shipPoints <= maxPoints) {
                loadOneShip(shipName, faction);
                setFactionPoints(faction, shipPoints);
            }


        }
        else {
            let currQuant = shipInPlay[0].quantity;

            let maxQuant = allShips.filter(ship => ship.name === shipName);
            console.log(maxQuant);
            maxQuant = maxQuant[0].number_available;

            if (currQuant < maxQuant) {
                let shipPoints = allShips.filter(ship => ship.name === shipName);

                let faction;
                if (axis_nations.indexOf(shipPoints.nation) == -1) {
                    faction = 'allies'
                }
                else {
                    faction = 'axis';
                }

                shipPoints = shipPoints[0].points;
                if (alliesPoints + shipPoints <= maxPoints) {
                    updateOneShip(shipName, faction);
                    setFactionPoints(faction, shipPoints);
                }
            }
            else {

            }
        }

        //extract the point total, subtract one from the total amount present

    }
    return (
        <div id="add-ship">
            {/* <p id="minimize"> [+]</p>
            <p id="close">X</p> */}
            <div id="ship-content">
                {faction === 'allies' ? (
                    displayShips.map(nation => {
                        console.log(nation);
                        return (
                            <div className="ship-wrapper">
                                <p key={i++} className="header-text">{nation.nation}</p>
                                {nation.ships.map(ship => {
                                    console.log(shipsInPlay);
                                    let shipExistence = shipsInPlay.filter(DBShip => DBShip.name === ship.name);

                                    let total = shipExistence.length > 0 ? ship.number_available - shipExistence[0].quantity : ship.number_available;
                                    return (
                                        total > 0 ? (
                                            <div className="ship-content-holder" onClick={e => displayShip(e, nation.nation)}>
                                                <p key={i++} name="ship" className="ship">{ship.name}</p>
                                                <p key={i++} name="number-available" className="number-available">
                                                    {total}
                                                </p>
                                                <p key={i++} name="point-value" className="point-value">{ship.points}</p>
                                            </div>
                                        )
                                            :
                                            <Fragment></Fragment>
                                    )
                                }
                                )}
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
    axis: state.userSelection.axis,
    allShips: state.allShips,
    shipsInPlay: [...state.shipsInPlay.allies, ...state.shipsInPlay.axis],
    alliesPoints: state.factionPoints.allies,
    axisPoints: state.factionPoints.axis,
    maxPoints: state.points
})

export default connect(mapStateToProps, { loadOneShip, updateOneShip, setFactionPoints })(AddShips);