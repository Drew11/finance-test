import {SET_TICKERS} from "../types/types";

export const setTicker = (tickers) => {
    return {
        type: SET_TICKERS,
        payload: tickers
    }
};

export const loadInitialDataSocket =(socket)=> {
    return (dispatch) => {
        socket.on("connect", () => {
            console.log(socket.id);
        })
        socket.emit('start');
        socket.on('ticker', function(tickers) {
            dispatch(setTicker(tickers))
        });
    }
}

