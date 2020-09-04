import React, { useState, useEffect } from 'react';

import { setPoints } from '../actions/points';
import { connect } from 'react-redux';
import { loadOneShip, updateOneShip, removeShips } from '../actions/ships';
import { setFactionPoints } from '../actions/points';
//import shipsInPlay from '../reducers/shipsInPlay';

const Points = ({ setPoints, allShips, userSelection, alliesPoints, axisPoints, points, shipsInPlay, loadOneShip, updateOneShip, setFactionPoints, removeShips }) => {
    const [currPoints, updatePoints] = useState('');

    function changePoints(e) {

        if (e && e.target.value) {
            updatePoints(e.target.value);
            points = e.target.value;
        }
        else if (e && !e.target.value) {
            updatePoints('');
            points = 0;
        }
    }
    useEffect(() => {
        setPoints(currPoints);
    }, [currPoints]);


    function generateShips() {
        let alliesNegativeCounter = 0;
        shipsInPlay.allies.forEach(ship => {
            if (ship.locked == false) {
                let shipFound = allShips.filter(allShip => allShip.name === ship.name);
                alliesNegativeCounter -= shipFound[0].points;
                alliesPoints -= shipFound[0].points;
            }
        });
        let axisNegativeCounter = 0;
        shipsInPlay.axis.forEach(ship => {
            if (ship.locked == false) {
                let shipFound = allShips.filter(allShip => allShip.name === ship.name);
                axisNegativeCounter -= shipFound[0].points;
                axisPoints -= shipFound[0].points;
            }
        });
        setFactionPoints('allies', alliesNegativeCounter);
        setFactionPoints('axis', axisNegativeCounter);
        removeShips();
        //update shipsInPlay
        let shipList;
        if (userSelection.allies[0] === 'All') {
            console.log('in this check');
            shipList = allShips.filter(ship => {
                let shipNation = ship.nation;
                let axisNations = ['Italy', 'Finland', 'Japan', 'Germany'];
                return axisNations.indexOf(shipNation) === -1;
            });
        }
        else {
            shipList = allShips.filter(ship => {
                return userSelection.allies.indexOf(ship.nation) !== -1;
            });
        }

        let iterCount = 0;
        console.log(alliesPoints);
        while (alliesPoints < points && shipList.length > 0 && iterCount < allShips.length * 10) {
            iterCount++;
            let index = Math.floor(Math.random() * shipList.length);
            if (alliesPoints + shipList[index].points > points) {
                shipList.splice(index, 1);
            }
            else {
                //check if in shipsInPlay already
                let currQuant = 0;
                let shipExistence = shipsInPlay.allies.filter(ship => ship.name == shipList[index].name);
                console.log(shipsInPlay.allies);
                console.log(shipList[index].name);
                console.log(shipExistence);
                if (shipExistence.length > 0) {
                    currQuant = shipExistence[0].quantity;
                }

                //see if currentQuant = max from all ships
                //if so remove it from ship list
                //otherwise add one to the shipsInPlay quantity
                let shipMax = allShips.filter(ship => ship.name == shipList[index].name);
                shipMax = shipMax[0].number_available;

                if (shipMax == currQuant) {
                    shipList.splice(index, 1);
                }
                else {
                    if (currQuant === 0) {
                        loadOneShip(shipList[index].name, 'allies');
                        setFactionPoints('allies', shipList[index].points);
                        alliesPoints += shipList[index].points;
                        shipsInPlay.allies.push({
                            name: shipList[index].name,
                            quantity: 1,
                            locked: false
                        });
                    } else {
                        updateOneShip(shipList[index].name, 'allies');
                        setFactionPoints('allies', shipList[index].points);
                        alliesPoints += shipList[index].points;

                        shipsInPlay.allies.forEach(ship => {
                            if (ship.name === shipList[index].name) {
                                ship.quantity = ship.quantity + 1;
                            }
                        });
                    }
                }
            }

        }
    }
    function resetShips(e) {
        removeShips();

        /*
        All the unwanted ships should be removed, so you can reset the point total to zero and then 
        add in the points of the ships that are still in play

        */
        setFactionPoints('allies', -alliesPoints);
        setFactionPoints('axis', -axisPoints);

        let alliesAddAmount = 0;
        let axisAddAmount = 0;
        shipsInPlay.allies.forEach(ship => {
            let shipFound = allShips.filter(allShip => allShip.name === ship.name);

            alliesAddAmount += shipFound[0].points;

        });
        shipsInPlay.axis.forEach(ship => {
            let shipFound = allShips.filter(allShip => allShip.name === ship.name);
            axisAddAmount += shipFound[0].points;
        });
        setFactionPoints('allies', alliesAddAmount);
        setFactionPoints('axis', axisAddAmount);
        // let alliesSubtractAmount = points;
        // let axisSubtractAmount = points;
        // shipsInPlay.allies.forEach(ship => {
        //     let shipFound = allShips.filter(allShip => allShip.name === ship.name);
        //     alliesSubtractAmount += shipFound.points;
        // });
        // shipsInPlay.axis.forEach(ship => {
        //     let shipFound = allShips.filter(allShip => allShip.name === ship.name);
        //     axisSubtractAmount += shipFound.points;
        // });
        // console.log(points - alliesSubtractAmount);
        // setFactionPoints('allies', points - alliesSubtractAmount);
        // setFactionPoints('axis', points - axisSubtractAmount);
        // let alliesNegativeCounter = 0;
        // shipsInPlay.allies.forEach(ship => {
        //     if (ship.locked == false) {
        //         let shipFound = allShips.filter(allShip => allShip.name === ship.name);
        //         alliesNegativeCounter -= shipFound[0].points;
        //         alliesPoints -= shipFound[0].points;
        //     }
        // });
        // let axisNegativeCounter = 0;
        // shipsInPlay.axis.forEach(ship => {
        //     if (ship.locked == false) {
        //         let shipFound = allShips.filter(allShip => allShip.name === ship.name);
        //         axisNegativeCounter -= shipFound[0].points;
        //         axisPoints -= shipFound[0].points;
        //     }
        // });
        // setFactionPoints('allies', alliesNegativeCounter);
        // setFactionPoints('axis', axisNegativeCounter);

    }
    return (
        <div className="points-wrapper">
            <input type="number" value={currPoints} name="points" onChange={e => changePoints(e)} className="point-wrapper-placeholder" placeholder="Point Limit" />
            <button className="RANDOM" onClick={e => generateShips(e)}>RANDOM</button>
            <button className="RESET" onClick={e => resetShips(e)}>RESET</button>
        </div>
    )
}
const mapStateToProps = state => ({
    points: state.points,
    allShips: state.allShips,
    userSelection: state.userSelection,
    alliesPoints: state.factionPoints.allies,
    axisPoints: state.factionPoints.axis,
    shipsInPlay: state.shipsInPlay
})
export default connect(mapStateToProps, { setPoints, loadOneShip, updateOneShip, setFactionPoints, removeShips })(Points);