import {
    ADD_SHIP,
    LOAD_IN_SHIPS,
    LOAD_ONE_SHIP,
    UPDATE_ONE_SHIP,
    REMOVE_SHIP,
    TOGGLE_LOCK,
    REMOVE_ONE_SHIP
} from './types';

const axios = require('axios');

export const addShips = shipList => dispatch => {
    dispatch({
        payload: shipList,
        type: ADD_SHIP
    });
};

export const loadOneShip = (ship, faction) => dispatch => {
    dispatch({
        payload: {
            ship,
            faction
        },
        type: LOAD_ONE_SHIP
    })
}

export const updateOneShip = (ship, faction) => dispatch => {
    dispatch({
        payload: {
            ship,
            faction
        },
        type: UPDATE_ONE_SHIP
    })
}
export const removeShips = () => dispatch => {
    dispatch({
        payload: {
        },
        type: REMOVE_SHIP
    })
}
export const toggleLock = (ship, faction) => dispatch => {
    dispatch({
        payload: {
            ship,
            faction
        },
        type: TOGGLE_LOCK
    });
}
export const loadAllShips = () => async (dispatch) => {
    let shipsAllies = await axios.post('/ships/selected', { faction: 'allies', ships: ['All'] }, { headers: { "Content-Type": 'application/json' } });
    let shipsAxis = await axios.post('/ships/selected', { faction: 'axis', ships: ['All'] }, { headers: { "Content-Type": 'application/json' } });

    shipsAllies = shipsAllies.data;
    shipsAxis = shipsAxis.data;

    dispatch({
        payload: {
            axis: shipsAxis,
            allies: shipsAllies
        },
        type: LOAD_IN_SHIPS
    })
}

export const removeOneShip = (shipInfo) => async dispatch => {
    console.log(shipInfo);
    dispatch({
        payload: shipInfo,
        type: REMOVE_ONE_SHIP
    })
}