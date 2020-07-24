//import the actions
import {
    ADD_SHIP
} from '../actions/types';

const initialState = {
    allies: [],
    axis: []
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_SHIP:
            state.axis = [];
            state.allies = [];
            payload.forEach(ship => {
                if (ship.faction === 'axis') {
                    if (ship.country === 'All') {
                        state = {
                            ...state,
                            axis: ['All']
                        }
                    }
                    else {
                        state = {
                            ...state,
                            axis: [...state.axis, ship.country]
                        }
                    }
                }
                else {
                    if (ship.country === 'All') {
                        state = {
                            ...state,
                            allies: ['All']
                        }
                    }
                    else {
                        state = {
                            ...state,
                            allies: [...state.allies, ship.country]
                        }
                    }
                }
            });
            return state;
        default:
            return {
                ...state
            }
    }
}