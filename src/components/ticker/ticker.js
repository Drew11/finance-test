import React, {useEffect, useState} from "react";
import Chart from '../chart/chart';
import Button from '@material-ui/core/Button';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import './ticker.css'

function Ticker(props) {
    const [graph, setGraph] = useState([]);

    useEffect(() => {
        setGraph(prevState => [...prevState,
            {
                price: props.item.price,
                last_trade_time: props.item.last_trade_time
            }]
        )
    }, [props.item])


    if (graph.length > 20) {
        const arr = graph.slice(1, graph.length);
        setGraph(arr)
    }

    const deleteTicker = () => {
        props.removeTicker(props.item.ticker)
    };

    return (
        <li className="ticker">
            <div className="ticker-name">
                <h3>{props.item.ticker}</h3>
            </div>
            <div>
                {"price"}
                {props.item.price}
            </div>
            <Chart data={graph}/>
            <Button
                variant="contained"
                onClick={deleteTicker}
            >
                <DeleteTwoToneIcon/>
            </Button>
        </li>

    );
}

export default Ticker;