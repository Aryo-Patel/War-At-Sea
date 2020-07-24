//imports from npm
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

//importing the root reducer
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];

const store = createStore(rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))); //boiler plate to get redux and redux devtools up and running
export default store;