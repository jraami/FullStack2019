import React from 'react';
import './App.css';

const getStore = () => {
    const store = this.props.store
    return store
}

const Button = ({ handleClick, text }) => (
    <div>
        <button onClick={handleClick}>{text}</button>
    </div>
)

const Statistics = (stats) => {
    return (
        <div>
            <table>
                <tbody>
                    <Statistic text="Good" value={stats.stats.good} />
                    <Statistic text="Neutral" value={stats.stats.ok} />
                    <Statistic text="Bad" value={stats.stats.bad} />
                    <Statistic text="Average" value={stats.stats.average} />
                    <Statistic text="Positive %" value={stats.stats.percentage} />
                </tbody>
            </table>
        </div>
    )
}

const Statistic = ({ text, value }) => {
    console.log('text: ' + text)
    console.log('value: ' + value)
    return (
        <tr>
            <th>{text}: </th>
            <th>{value.toFixed(2)}</th>
        </tr>

    )
}

class App extends React.Component {

    handleClick = (value) => (e) => {
        var action = {
            type: 'ZERO'
        }
        switch (value) {
            case 1:
                action = {
                    type: 'GOOD'
                }
                this.props.store.dispatch((action))
                return
            case 0:
                action = {
                    type: 'OK'
                }
                this.props.store.dispatch((action))
                return
            case -1:
                action = {
                    type: 'BAD'
                }
                this.props.store.dispatch((action))
                return
        }

    }

    render() {
        const state = this.props.store.getState()

        const summary = () => {
            console.log(state)
            if (state.counter == 0) {
                return (
                    <div>

                        <p>No feedbacks given yet. Be first to rate your experience at UniCafe!</p>
                    </div>
                )
            }
            return (
                <Statistics stats={state} />
            )
        }
        return (
            <div>
                <div>
                    <Button handleClick={this.handleClick(1)} text="Good" />
                    <Button handleClick={this.handleClick(0)} text="Neutral" />
                    <Button handleClick={this.handleClick(-1)} text="Bad" />
                </div>
                {summary()}
            </div>
        )
    }
}


export default App;
