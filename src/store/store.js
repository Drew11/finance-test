import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {tickersReducer} from "../reducers/tickers-reducer";

export const store = createStore(
    tickersReducer,
    null,
    applyMiddleware(thunk)
);

//store.subscribe(()=>console.log(store.getState()))
