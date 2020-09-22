import {
    SET_POINTS,
    SET_ALLIES_POINTS,
    SET_AXIS_POINTS,
    RESET_POINTS
} from './types';

export const setPoints = (point) => dispatch => {
    dispatch({
        payload: point,
        type: SET_POINTS
    })
}


export const setFactionPoints = (faction, point) => dispatch => {
    faction === 'allies' ?
        dispatch({
            payload: point,
            type: SET_ALLIES_POINTS
        })
        :
        dispatch({
            payload: point,
            type: SET_AXIS_POINTS
        });
}

export const resetPoints = (faction) => dispatch => {
    dispatch({
        payload: faction,
        type: RESET_POINTS
    });
}