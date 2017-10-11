import React, { Component } from 'react';
import LetsCallItAPCCard from '../components/compounds/apc-card'

let howManyRealWorldMilliSecondsMeansOneMinute = 2000
const howManyVirtualSecondsToFetchDataOnce = 5

const fakeDataStream = {
    errorRatio: 0.187,
    currentDate: '',
    currentHour: NaN,
    currentMinute: NaN,
    currentSecond: NaN,
    dataOfAllMinutes: [],

    init() {
        const now = new Date()
		this.currentDate = [
			now.getFullYear(),
			now.getMonth() + 1,
			now.getDate()
        ].join('.')

        this.currentHour = now.getHours()
        // this.currentHour = Math.floor(Math.random()*24)
        this._clearAllDataAndStartNewHour(this.currentHour)
        
        this.currentMinute = 0
        const newMinute = now.getMinutes()
        this.currentSecond = now.getSeconds()
        this._renewSomeFakeDataTillThisMinute(newMinute)
    },
    provideLatestData() {
        this.currentSecond += howManyVirtualSecondsToFetchDataOnce

        if (this.currentSecond >= 60) {
            this._renewSomeFakeDataTillThisMinute(this.currentMinute + 1)
            this.currentSecond = this.currentSecond % 60
        }

        return this
    },
    _renewSomeFakeDataTillThisMinute(newMinute) {
        if (this.currentMinute >= 60) {
            this._clearAllDataAndStartNewHour(this.currentHour + 1)
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
    _clearAllDataAndStartNewHour(newHour) {
        for (var i = 0; i < 60; i++) {
            this.dataOfAllMinutes[i] = {
                value: NaN,
                status: 0
            };
        }

        this.currentHour = newHour % 24
        this.currentMinute = 0
        this.currentSecond = 0
    },
    _generateDataForOneMinute() {
        const errorRatio = this.errorRatio
        return {
            value: generateFakeHeroValue(),
            status: generateFakeStatus()
        }

        function generateFakeHeroValue() {
            return Math.floor(Math.random() * 13515 / 114 + 319)
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
            date: '',
            hour: NaN,
            minute: NaN,
            second: NaN,
            heroValue: '...',
            statusIdOfAllMinutes: []
        }

        this.fetchingDataIntervalIndex = NaN
        this.fetchingDataIntervalTime = NaN
    }

    componentDidMount = () => {
        fakeDataStream.init()
        howManyRealWorldMilliSecondsMeansOneMinute = this.props.howManyRealWorldMilliSecondsMeansOneMinute
        this.fetchingDataIntervalTime = howManyRealWorldMilliSecondsMeansOneMinute / 60 * howManyVirtualSecondsToFetchDataOnce
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
        // this.setState({
        //     isFetchingData: true
        // })
        
        this.onDataReceived(fakeDataStream.provideLatestData())
    }

    onDataReceived = (payload) => {
        const {
            currentDate: date,
            currentHour: hour,
            currentMinute: latestMinuteWithData,
            dataOfAllMinutes
        } = payload

        let second = Math.floor(payload.currentSecond)

        this.setState({
            // isFetchingData: false,            
            date,
            hour,
            minute: latestMinuteWithData,
            second,
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
        let timeScale = howManyRealWorldMilliSecondsMeansOneMinute
        let timeScaleUnit = '毫秒'

        if (timeScale >= 1000) {
            timeScale = timeScale / 1000
            timeScaleUnit = '秒'

            if (timeScale >= 60) {
                timeScale = timeScale / 60
                timeScaleUnit = '分钟'

                if (timeScale >= 60) {
                    timeScale = timeScale / 60
                    timeScaleUnit = '小时'
                }
            }
        }

        const timeScaleString = timeScale.toFixed(2) + timeScaleUnit

        return (
            <div className="tryout-the-apc-card-component">
                <div className="info-tips">
                    <p>假设现实世界{timeScaleString}代表该控件的1分钟</p>
                    <p>hover可见尝试性的外貌</p>
                </div>

                <LetsCallItAPCCard
                    allMinutesStatusId={this.state.statusIdOfAllMinutes}
                    date={this.state.date}
                    hour={this.state.hour}
                    minute={this.state.minute}
                    second={this.state.second}
                    heroValue={this.state.heroValue}
                    heroValueDescription="万圆整"
                    onMinuteClick={this.onMinuteClick}
                />
            </div>
        );
    }
}
