import {
    LOAD_ONE_SHIP, UPDATE_ONE_SHIP, REMOVE_SHIP, TOGGLE_LOCK, REMOVE_ONE_SHIP
} from '../actions/types';

const initialState = {
    axis: [],
    allies: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REMOVE_ONE_SHIP:
            let removeOneShipArr = state;
            console.log(payload.name);
            removeOneShipArr.allies = removeOneShipArr.allies.filter(ship => ship.secretName !== payload.name);
            removeOneShipArr.axis = removeOneShipArr.axis.filter(ship => ship.secretName !== payload.name);

            if (!removeOneShipArr.allies) {
                removeOneShipArr.allies = [];
            }
            if (!removeOneShipArr.axis) {
                removeOneShipArr.axis = [];
            }
            return removeOneShipArr;
        case REMOVE_SHIP:
            let removeArr = state;
            removeArr.allies = removeArr.allies.filter(ship => ship.locked == true);
            removeArr.axis = removeArr.axis.filter(ship => ship.locked == true);
            if (!removeArr.allies) {
                removeArr.allies = [];
            }
            if (!removeArr.axis) {
                removeArr.axis = [];
            }
            return removeArr;
        case TOGGLE_LOCK:
            let toggleArr = state;
            if (payload.faction == 'allies') {
                toggleArr.allies = toggleArr.allies.map(ship => {
                    if (ship.secretName == payload.ship) {
                        return {
                            ...ship,
                            locked: !ship.locked
                        }
                    }
                    else {
                        return {
                            ...ship
                        }
                    }
                });
            }
            else {
                toggleArr.axis = toggleArr.axis.map(ship => {
                    if (ship.secretName == payload.ship) {
                        return {
                            ...ship,
                            locked: !ship.locked
                        }
                    }
                    else {
                        return {
                            ...ship
                        }
                    }
                });
            }
            return toggleArr;
        case LOAD_ONE_SHIP:
            if (payload.faction == 'axis') {
                let secretName = payload.ship;
                secretName += ' ' + state.axis.filter(ship => ship.name === payload.ship).length;
                return {
                    ...state,
                    axis: [...state.axis, { name: payload.ship, secretName, locked: false }]
                }
            }
            else {
                let secretName = payload.ship;
                secretName += ' ' + state.allies.filter(ship => ship.name === payload.ship).length;
                return {
                    ...state,
                    allies: [...state.allies, { name: payload.ship, secretName, locked: false }]
                }
            }

        case UPDATE_ONE_SHIP:
            let stateArr = state;
            stateArr.allies = stateArr.allies.map(ship => {
                if (ship.name !== payload.ship) {
                    return ship
                }
                else {
                    let newQuant = ship.quantity + 1;
                    return {
                        ...ship,
                        quantity: newQuant
                    }
                }
            });
            stateArr.axis = stateArr.axis.map(ship => {
                if (ship.name !== payload.ship) {
                    return ship
                }
                else {
                    let newQuant = ship.quantity + 1;
                    return {
                        ...ship,
                        quantity: newQuant
                    }
                }
            });

            return stateArr;
        default:
            return state
    }
}