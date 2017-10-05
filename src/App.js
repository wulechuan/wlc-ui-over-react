import React, { Component } from 'react';
import HeroValue from './components/hero-value'
import StatusesIn60Minutes from './components/statuses-in-60-minutes'


const fakeDataProvider = {
    howManyMilleSecondsMeansOneMinute: 1000,
    errorRatio: 0.087,
    currentMinute: NaN,
    fakeValueIntervalIndex: NaN,
    dataOfAllMinutes: [],
    onInterval: undefined,
    init(onInterval) {
        if (typeof onInterval === 'function') {
            this.onInterval = onInterval
        }

        this.fakeValueIntervalIndex = window.setInterval(
            this.publishNewData.bind(this),
            this.howManyMilleSecondsMeansOneMinute
        )

        this.clearAllDataAndStartNewHour()
        this.publishNewData()
    },
    destroy() {
        window.clearInterval(this.fakeValueIntervalIndex)
    },
    publishNewData() {
        this.renewMinutesDataTill(this.currentMinute+1)
        if (typeof this.onInterval === 'function') {
            this.onInterval(this.dataOfAllMinutes, this.currentMinute-1)
        }
    },
    clearAllDataAndStartNewHour() {
        this.currentMinute = 0;
        for (var i = 0; i < 60; i++) {
            this.dataOfAllMinutes[i] = {
                value: NaN,
                status: 0
            };
        }
    },
    generateDataForOneMinute() {
        const errorRatio = this.errorRatio
        return {
            value: generateFakeHeroValue(),
            status: generateFakeStatus()
        }

        function generateFakeHeroValue() {
            return Math.floor(Math.random()*3000 + 1000)
        }

        function generateFakeStatus() {
            return Math.random() > errorRatio ? 1 : 2
        }
    },
    renewMinutesDataTill(newMinute) {
        if (this.currentMinute >= 60) {
            this.clearAllDataAndStartNewHour()
            this.dataOfAllMinutes[0] = this.generateDataForOneMinute()
            this.currentMinute = 1;
        } else {
            for (var i = this.currentMinute; i < newMinute; i++) {
                this.dataOfAllMinutes[i] = this.generateDataForOneMinute()
            }
            this.currentMinute = newMinute
        }
    }
}


class App extends Component {
    constructor () {
        super()
        this.state = {
            heroValue: 'N/A',
            statusesOfAllMinutes: []
        }
    }

    componentDidMount = () => {
        fakeDataProvider.init((...arg) => {
            this.onDataReceived(...arg)
        })
    }

    componentWillUnmount = () => {
        fakeDataProvider.destroy()
    }

    onDataReceived = (...arg) => {
        this.updateData(...arg)
    }
    
    updateData = (dataOfAllMinutes, latestMinuteWithData) => {
        this.setState({
            heroValue: dataOfAllMinutes[latestMinuteWithData].value,
            statusesOfAllMinutes: dataOfAllMinutes.map(data=> {
                return data.status
            })
        })
    }

    render() {
        return (
            <div className="app">
                <p className="info">假设现实世界{fakeDataProvider.howManyMilleSecondsMeansOneMinute}毫秒代表该控件的1分钟</p>
                <p className="info">hover可见尝试性的外貌</p>
                <StatusesIn60Minutes
                    statuses={this.state.statusesOfAllMinutes}
                    allPossibleStatusClassNames={[
                        'status-no-data',
                        'status-ok',
                        'status-error'
                    ]}
                    abstract={
                        <HeroValue
                            value={this.state.heroValue}
                            description="圆整"
                        />
                    }
                />
            </div>
        );
    }
}

export default App;
