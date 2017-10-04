import React, { Component } from 'react';
import StatusesIn60Minutes from './components/statuses-in-60-minutes'

class App extends Component {
    render() {
        let currentMinute = Math.ceil(Math.random()*60)
        const statusOfAllMinutes = []
        for (var i = 0; i < 60; i++) {
            statusOfAllMinutes[i] = i > currentMinute ? 0 : (1 + Math.floor(Math.random()*2));
        }

        return (
            <div className="app">
                <StatusesIn60Minutes
                    statuses={statusOfAllMinutes}
                    allPossibleStatusClassNames={[
                        'status-no-data',
                        'status-ok',
                        'status-error'
                    ]}
                />
            </div>
        );
    }
}

export default App;
