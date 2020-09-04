import {
    LOAD_IN_SHIPS
} from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case LOAD_IN_SHIPS:
            state.push(...payload.allies);
            state.push(...payload.axis);
            return state;
        default:
            return state;
    }
}