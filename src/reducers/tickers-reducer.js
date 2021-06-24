import {SET_TICKERS} from "../types/types";

export function tickersReducer (state, action) {
    switch (action.type) {
        case SET_TICKERS:
            return action.payload
        default:
            return  state
    }
}
