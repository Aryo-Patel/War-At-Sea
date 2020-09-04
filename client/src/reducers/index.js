//importing the combine reducers ability from redux
import { combineReducers } from 'redux';

import userSelection from './userSelections'
import points from './points';
import factionPoints from './factionPoints';
import shipsInPlay from './shipsInPlay';
import allShips from './allShips';
export default combineReducers({
    userSelection,
    points,
    factionPoints,
    shipsInPlay,
    allShips
}); 