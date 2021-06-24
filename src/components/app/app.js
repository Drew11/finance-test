import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import Ticker from '../ticker/ticker'
import './app.css';
import {io} from "socket.io-client";
import {loadInitialDataSocket} from "../../actions/action";
import ControlPanel from "../control-panel/control-panel";

const socket = io("https://finance-test-server.herokuapp.com/");

function App() {
    const tickers = useSelector(state => state);
    const dispatch = useDispatch();
    const [removedTickers, setRemovedTickers] = useState([]);

    const removeTicker = (ticker) => {
        setRemovedTickers(prevState => ([...prevState, ticker]))
    };

    const addTicker = (tickerName) => {
        setRemovedTickers(prevState => prevState.filter(ticker => ticker.toLocaleLowerCase() !== tickerName.toLocaleLowerCase()))
    };

    useEffect(() => {
        dispatch(loadInitialDataSocket(socket));
    }, []);

    useEffect(() => {
        socket.emit('filter-tickers', removedTickers);
    }, [removedTickers]);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Test task</h1>
            </header>
            <main>
                <ControlPanel
                    socket={socket}
                    addTicker={addTicker}
                >
                </ControlPanel>
                <ul>
                    {tickers && tickers.map(item =>
                        <Ticker
                            key={item.ticker}
                            item={item}
                            removeTicker={removeTicker}
                        />)}
                </ul>
            </main>
        </div>
    );
}

export default App;
