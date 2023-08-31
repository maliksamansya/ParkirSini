import {applyMiddleware, createStore} from 'redux';
import mainReducer from "./reducers/mainReducer.js";
// import logger from "./middlewares/logger.js";
import thunk from "redux-thunk";

let store = createStore(mainReducer, applyMiddleware(thunk))

export default store
