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
    }, [currPoints, setPoints]);


    function generateShips() {
        let alliesNegativeCounter = 0;
        shipsInPlay.allies.forEach(ship => {
            if (ship.locked === false) {
                let shipFound = allShips.filter(allShip => allShip.name === ship.name);
                alliesNegativeCounter -= shipFound[0].points;
                alliesPoints -= shipFound[0].points;
            }
        });
        let axisNegativeCounter = 0;
        shipsInPlay.axis.forEach(ship => {
            if (ship.locked === false) {
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
            shipList = allShips.filter(ship => {
                let shipNation = ship.nation;
                let axisNations = ['Italy', 'Finland', 'Japan', 'Germany', 'Axis Neutral/Instalations'];
                return axisNations.indexOf(shipNation) === -1;
            });
        }
        else {
            shipList = allShips.filter(ship => {
                return userSelection.allies.indexOf(ship.nation) !== -1;
            });
        }

        let iterCount = 0;
        while (alliesPoints < points && shipList.length > 0 && iterCount < allShips.length * 10) {
            iterCount++;
            let index = Math.floor(Math.random() * shipList.length);
            if (alliesPoints + shipList[index].points > points) {
                shipList.splice(index, 1);
            }
            else {
                //check if in shipsInPlay already
                let currQuant = 0;
                let shipExistence = shipsInPlay.allies.filter(ship => ship.name === shipList[index].name);

                if (shipExistence.length > 0) {
                    currQuant = shipExistence.length;
                }

                //see if currentQuant = max from all ships
                //if so remove it from ship list
                //otherwise add one to the shipsInPlay quantity
                let shipMax = allShips.filter(ship => ship.name === shipList[index].name);
                shipMax = shipMax[0].number_available;

                if (shipMax === currQuant) {
                    shipList.splice(index, 1);
                }
                else {
                    if (currQuant === 0) {
                        loadOneShip(shipList[index].name, 'allies');
                        setFactionPoints('allies', shipList[index].points);
                        alliesPoints += shipList[index].points;
                        shipsInPlay.allies.push({
                            name: shipList[index].name,
                            secretName: shipList[index].name + ' 0',
                            locked: false
                        });
                    } else {
                        loadOneShip(shipList[index].name, 'allies');
                        setFactionPoints('allies', shipList[index].points);
                        alliesPoints += shipList[index].points;
                        shipsInPlay.allies.push({
                            name: shipList[index].name,
                            secretName: shipList[index].name + ` ${currQuant}`,
                            locked: false
                        });
                    }
                }
            }

        }
        //update shipsInPlay
        if (userSelection.axis[0] === 'All') {
            shipList = allShips.filter(ship => {
                let shipNation = ship.nation;
                let axisNations = ['Italy', 'Finland', 'Japan', 'Germany', 'Axis Neutral/Instalations'];
                return axisNations.indexOf(shipNation) !== -1;
            });
        }
        else {
            shipList = allShips.filter(ship => {
                return userSelection.axis.indexOf(ship.nation) !== -1;
            });
        }

        iterCount = 0;
        while (axisPoints < points && shipList.length > 0 && iterCount < allShips.length * 10) {
            iterCount++;
            let index = Math.floor(Math.random() * shipList.length);
            if (axisPoints + shipList[index].points > points) {
                shipList.splice(index, 1);
            }
            else {
                //check if in shipsInPlay already
                let currQuant = 0;
                let shipExistence = shipsInPlay.axis.filter(ship => ship.name === shipList[index].name);

                if (shipExistence.length > 0) {
                    currQuant = shipExistence.length;
                }

                //see if currentQuant = max from all ships
                //if so remove it from ship list
                //otherwise add one to the shipsInPlay quantity
                let shipMax = allShips.filter(ship => ship.name === shipList[index].name);
                shipMax = shipMax[0].number_available;

                if (shipMax === currQuant) {
                    shipList.splice(index, 1);
                }
                else {
                    if (currQuant === 0) {
                        loadOneShip(shipList[index].name, 'axis');
                        setFactionPoints('axis', shipList[index].points);
                        axisPoints += shipList[index].points;
                        shipsInPlay.axis.push({
                            name: shipList[index].name,
                            secretName: shipList[index].name + ' 0',
                            locked: false
                        });
                    } else {
                        loadOneShip(shipList[index].name, 'axis');
                        setFactionPoints('axis', shipList[index].points);
                        axisPoints += shipList[index].points;
                        shipsInPlay.axis.push({
                            name: shipList[index].name,
                            secretName: shipList[index].name + ` ${currQuant}`,
                            locked: false
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