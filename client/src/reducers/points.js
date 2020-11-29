import {
    SET_POINTS
} from '../actions/types';

const initialState = 0;

export default function (state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case SET_POINTS:
            if (payload === '') {
                return 0;
            }
            else {
                return Number(payload);
            }


        default:
            return state;
    }
}