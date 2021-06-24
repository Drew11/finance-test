import React, {useState} from "react";
import TextField from '@material-ui/core/TextField';
import './control-panel.css'
import StopTwoToneIcon from "@material-ui/icons/StopTwoTone";
import PlayArrowTwoToneIcon from "@material-ui/icons/PlayArrowTwoTone";

function ControlPanel(props) {
    const [tickerName, setTickerName] = useState('');
    const [tickersTicks, setTickersTicks] = useState(true);

    const stopTickers = () => {
        props.socket.emit('stop');
        setTickersTicks(false);
    };

    const startTickers = () => {
        props.socket.emit('start');
        setTickersTicks(true);
    };

    const addTicker = (event) => {
        if (event.key === 'Enter') {
            props.addTicker(tickerName)
        }
    }
    const setDelay = (event) => {
        const delay = +event.target.value;
        if (event.key === 'Enter' && delay >= 1000) {
            props.socket.emit('set_delay', delay)
        }
    }
    return (
        <div className="control-panel-tickers">
            <div
                className="stop-start-tickers"
            >
                {tickersTicks ? 'Stop' : 'Start'}
                <div
                    className="stop-start-tickers-button"
                    onClick={tickersTicks ? stopTickers : startTickers}
                >
                    {
                        tickersTicks ? <StopTwoToneIcon
                            color='primary'

                            className='svg_icons'
                        /> : <PlayArrowTwoToneIcon
                            color='primary'
                            className='svg_icons'
                        />
                    }
                </div>
            </div>

            <TextField
                onChange={(evt) => setTickerName(evt.target.value)}
                onKeyDown={addTicker}
                fullWidth={false}
                placeholder="Add ticker"
                id="standard-basic"
            />

            <TextField
                onKeyDown={setDelay}
                fullWidth={false}
                placeholder="Set delay"
                type="number"
                InputProps={{
                    inputProps: {
                        min: 1000
                    }
                }}
                id="standard-basic"
            />
        </div>
    );
}

export default ControlPanel;