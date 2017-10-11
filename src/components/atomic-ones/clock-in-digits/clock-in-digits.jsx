import React, { Component } from 'react'

export default class ClockInDigits extends Component {
	render() {
		const LogStringPrefix = 'ClockInDigits:'

		const {
			minute,
			second,
			shouldHideSecond = false,
			shouldPadDigits = true,
			shouldUseAMPM = false,
			dividerChar = ':'
		} = this.props
		
		let {
			hour,
			copywritingOfAM = 'AM',
			copywritingOfPM = 'PM',
		} = this.props

		let hourString, minuteString, secondString, isAM

		const hourValusIsInvalid   = isNaN(parseInt(hour,   10))
		const minuteValusIsInvalid = isNaN(parseInt(minute, 10))
		const secondValusIsInvalid = isNaN(parseInt(second, 10)) && !shouldHideSecond
		
		if (hourValusIsInvalid || minuteValusIsInvalid || secondValusIsInvalid) {
			const logString0 = 'value is invalid.'
			hourValusIsInvalid   && console.error(LogStringPrefix, 'hour',   logString0)
			minuteValusIsInvalid && console.error(LogStringPrefix, 'minute', logString0)
			secondValusIsInvalid && console.error(LogStringPrefix, 'second', logString0)

			const CHAR_FOR_UNKNOWN_VALUE = '#'
			const DOUBLE_CHARS_FOR_UNKNOWN_VALUE = CHAR_FOR_UNKNOWN_VALUE.repeat(2)

			hourString = DOUBLE_CHARS_FOR_UNKNOWN_VALUE
			minuteString = DOUBLE_CHARS_FOR_UNKNOWN_VALUE
			secondString = DOUBLE_CHARS_FOR_UNKNOWN_VALUE
			copywritingOfAM = DOUBLE_CHARS_FOR_UNKNOWN_VALUE
			copywritingOfPM = DOUBLE_CHARS_FOR_UNKNOWN_VALUE
			isAM = false
		} else {
			if (shouldUseAMPM) {
				isAM = hour < 12
				hour = hour % 12
			}

			hourString = '' + hour
			minuteString = '' + minute
			secondString = '' + second

			if (shouldPadDigits) {
				if (hour   < 10) { hourString   = '0' + hourString }
				if (minute < 10) { minuteString = '0' + minuteString }
				if (second < 10) { secondString = '0' + secondString }
			}
		}

		const divider = <span className="clock-digits-divider">{dividerChar}</span>

		return (
			<span className="clock-in-digits">
				<span className="hour">{hourString}</span>
				{divider}
				<span className="minute">{minuteString}</span>
				{!shouldHideSecond && divider}
				{!shouldHideSecond && <span className="second">{secondString}</span>}
				{shouldUseAMPM && (<span className="am-pm">{isAM ? copywritingOfAM : copywritingOfPM}</span>)}
			</span>
		)
	}
}
