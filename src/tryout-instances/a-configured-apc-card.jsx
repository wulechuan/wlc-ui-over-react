import React, { Component } from 'react';
import LetsCallItAPCCard from '../components/compounds/apc-card'

const howManyMilliSecondsMeansOneMinute = 2000
const fakeDataStream = {
    currentHour: Math.floor(Math.random()*24),
    errorRatio: 0.187,
    currentMinute: NaN,
    dataOfAllMinutes: [],

    init() {
        this._clearAllDataAndStartNewHour()
    },
    publishNewData() {
        this._renewMinutesDataTill(this.currentMinute+1)
    },
    _renewMinutesDataTill(newMinute) {
        if (this.currentMinute >= 60) {
            this._clearAllDataAndStartNewHour()
        }
        
        newMinute = newMinute % 61 // 取值范围是 [1, 60] 而不是 [0, 59]。
        if (newMinute === 0) {
            newMinute = 1
        }

        for (var i = this.currentMinute; i < newMinute; i++) {
            this.dataOfAllMinutes[i] = this._generateDataForOneMinute()
        }

        this.currentMinute = newMinute
    },
    _clearAllDataAndStartNewHour() {
        this.currentHour = (this.currentHour + 1) % 24
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
    }
}

export default class AnAutoRefreshingAPCCardWithSomeTips extends Component {
    constructor () {
        super()
        this.state = {
            fetchingDataIntervalIsOn: false,
            isFetchingData: false,
            heroValuePrefix: '',
            heroValue: '...',
            statusIdOfAllMinutes: []
        }
        this.fetchingDataIntervalTime = howManyMilliSecondsMeansOneMinute // milliseconds
        this.fetchingDataIntervalIndex = NaN
    }

    componentDidMount = () => {
        fakeDataStream.init()
        this.fetchingDataIntervalTime = this.props.fetchingDataIntervalTime
        this.startToFetchDataOnIntervals()
    }

    componentWillUnmount = () => {
        this.stopFetchingData()
    }

    startToFetchDataOnIntervals = () => {
        this.setState({
            fetchingDataIntervalIsOn: true
        })

        this.fetchingDataIntervalIndex = window.setInterval(
            this.fetchData,
            this.fetchingDataIntervalTime
        )
    }

    stopFetchingData = () => {
        window.clearInterval(this.fetchingDataIntervalIndex)

        this.setState({
            fetchingDataIntervalIsOn: false
        })
    }

    fetchData = () => {
        this.setState({
            isFetchingData: true
        })

        fakeDataStream.publishNewData()
        const fakePayload = fakeDataStream
        this.onDataReceived(fakePayload)
    }

    onDataReceived = (payload) => {
        this.setState({
            isFetchingData: false
        })

        this.updateData(payload.dataOfAllMinutes, payload.currentHour, payload.currentMinute)
    }

    updateData = (dataOfAllMinutes, currentHour, latestMinuteWithData) => {
        const heroValuePrefix = (currentHour < 10 ? ('0'+currentHour) : currentHour)
            + ':'
            + (latestMinuteWithData < 10 ? ('0'+latestMinuteWithData) : latestMinuteWithData)

            this.setState({
            heroValuePrefix,
            heroValue: dataOfAllMinutes[latestMinuteWithData - 1].value,
            statusIdOfAllMinutes: dataOfAllMinutes.map(data=> {
                return data.status
            })
        })
    }

    onMinuteClick = (wrappedEventObject) => {
        console.log(
            'No.', wrappedEventObject.minuteIndex, 'minute',
            '\nData of that minute:', fakeDataStream.dataOfAllMinutes[wrappedEventObject.minuteIndex],
            '\nReact event object:', wrappedEventObject.event
        )
    }

    render() {
        return (
            <div className="tryout-the-apc-card-component">
                <div className="info-tips">
                    <p>假设现实世界{
                        howManyMilliSecondsMeansOneMinute
                        }毫秒代表该控件的1分钟</p>
                    <p>hover可见尝试性的外貌</p>
                </div>

                <LetsCallItAPCCard
                    allMinutesStatusId={this.state.statusIdOfAllMinutes}
                    heroValuePrefix={this.state.heroValuePrefix}
                    heroValue={this.state.heroValue}
                    heroValueDescription="万圆整"
                    onMinuteClick={this.onMinuteClick}
                />
            </div>
        );
    }
}
