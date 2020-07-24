import {
    ADD_SHIP
} from './types';
export const addShips = shipList => dispatch => {
    dispatch({
        payload: shipList,
        type: ADD_SHIP
    });
};