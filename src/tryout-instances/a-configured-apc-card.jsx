import React, { Component } from 'react';
import APCCard from '../components/compounds/apc-card'

const fakeDataStream = {
    howManyMilleSecondsMeansOneMinute: 2000,
    errorRatio: 0.187,
    currentMinute: NaN,
    fakeValueIntervalIndex: NaN,
    dataOfAllMinutes: [],
    onInterval: undefined,

    init(onInterval) {
        if (typeof onInterval === 'function') {
            this.onInterval = onInterval
        }

        this.fakeValueIntervalIndex = window.setInterval(
            this._publishNewData.bind(this),
            this.howManyMilleSecondsMeansOneMinute
        )

        this._clearAllDataAndStartNewHour()
        this._publishNewData()
    },
    destroy() {
        window.clearInterval(this.fakeValueIntervalIndex)
    },
    _publishNewData() {
        this._renewMinutesDataTill(this.currentMinute+1)
        if (typeof this.onInterval === 'function') {
            this.onInterval(this.dataOfAllMinutes, this.currentMinute-1)
        }
    },
    _clearAllDataAndStartNewHour() {
        this.currentMinute = 0;
        for (var i = 0; i < 60; i++) {
            this.dataOfAllMinutes[i] = {
                value: NaN,
                status: 0
            };
        }
    },
    _generateDataForOneMinute() {
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
    _renewMinutesDataTill(newMinute) {
        if (this.currentMinute >= 60) {
            this._clearAllDataAndStartNewHour()
            this.dataOfAllMinutes[0] = this._generateDataForOneMinute()
            this.currentMinute = 1;
        } else {
            for (var i = this.currentMinute; i < newMinute; i++) {
                this.dataOfAllMinutes[i] = this._generateDataForOneMinute()
            }
            this.currentMinute = newMinute
        }
    }
}

class AnAPCCard extends Component {
    constructor () {
        super()
        this.state = {
            heroValue: 'N/A',
            statusIdOfAllMinutes: []
        }
    }

    componentDidMount = () => {
        fakeDataStream.init((...arg) => {
            this.onDataReceived(...arg)
        })
    }

    componentWillUnmount = () => {
        fakeDataStream.destroy()
    }

    onDataReceived = (...arg) => {
        this.updateData(...arg)
    }

    updateData = (dataOfAllMinutes, latestMinuteWithData) => {
        this.setState({
            heroValue: dataOfAllMinutes[latestMinuteWithData].value,
            statusIdOfAllMinutes: dataOfAllMinutes.map(data=> {
                return data.status
            })
        })
    }

    render() {
        return (
            <div className="tryout-the-apc-card-component">
                <div className="info-tips">
                    <p className="info">假设现实世界{
                        fakeDataStream.howManyMilleSecondsMeansOneMinute
                        }毫秒代表该控件的1分钟</p>
                    <p className="info">hover可见尝试性的外貌</p>
                </div>

                <APCCard
                    allMinutesStatusId={this.state.statusIdOfAllMinutes}
                    heroValue={this.state.heroValue}
                    heroValueDescription="万圆整"
                />
            </div>
        );
    }
}

export default AnAPCCard;
