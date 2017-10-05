import React, { Component } from 'react';
import HeroValue from './components/hero-value'
import StatusesIn60Minutes from './components/statuses-in-60-minutes'

class App extends Component {
    constructor () {
        super()
        this.state = {
            heroValue: 'N/A'
        }
    }

    updateHeroValue(newValue) {
        this.setState({
            heroValue: newValue
        })
    }

    render() {
        let currentMinute = 19 + Math.ceil(Math.random()*20)
        const statusOfAllMinutes = []
        for (var i = 0; i < 60; i++) {
            statusOfAllMinutes[i] = i > currentMinute ? 0 : (Math.random() > 0.93 ? 2 : 1);
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
                    abstract={
                        <HeroValue
                            value={this.state.heroValue}
                            description="Very Important!"
                        />
                    }
                />
            </div>
        );
    }
}

export default App;
