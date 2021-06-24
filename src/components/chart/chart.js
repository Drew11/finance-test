import React, {PureComponent} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

export default class Chart extends PureComponent {
    render() {
        return (
            <ResponsiveContainer width="50%" height={250}>
                <BarChart
                    width={500}
                    height={300}
                    data={this.props.data}
                    margin={{
                        top: 40,
                        right: 30,
                        left: 20,
                        bottom: 10,
                    }}
                    barSize={15}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="last_trade_time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="price" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}


