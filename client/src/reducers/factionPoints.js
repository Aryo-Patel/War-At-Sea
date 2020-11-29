import {
    SET_ALLIES_POINTS,
    SET_AXIS_POINTS,
} from '../actions/types';

const initialState = {
    allies: 0,
    axis: 0
};

export default function (state = initialState, action) {
    const { payload, type } = action;
    switch (type) {
        case SET_ALLIES_POINTS:

            return {
                ...state,
                allies: state.allies + payload
            }
        case SET_AXIS_POINTS:
            return {
                ...state,
                axis: state.axis + payload
            }
        default:
            return state;
    }
}