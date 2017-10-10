import React, { Component } from 'react'

export const STATUSES_IN_60_MINUTES_ALL_POSSIBLE_STATUS_CSS_CLASS_NAMES_DEFAULT = [
    'status-no-data',
    'status-ok',
    'status-error'
]

export default class StatusesIn60Minutes extends Component {
	render() {
		const {
			styleCssClassName,
			allMinutesStatusId,
			allPossibleStatusCssClassNames = STATUSES_IN_60_MINUTES_ALL_POSSIBLE_STATUS_CSS_CLASS_NAMES_DEFAULT
		} = this.props

		return (
			<div className={[
				'statuses-in-60-minutes',
				styleCssClassName
				].join(' ')}>
				<div className="all-minutes">{
					allMinutesStatusId.map(function(statusId, mi) {
						const minuteIndex = mi + 1
						return <StatusOfOneMinute
							key={minuteIndex}
							minuteIndex={minuteIndex}
							statusId={statusId}
							allPossibleStatusCssClassNames={allPossibleStatusCssClassNames}
						/>
					})
				}</div>
			</div>
		)
	}
}

class StatusOfOneMinute extends Component {
	render() {
		const { minuteIndex, statusId, allPossibleStatusCssClassNames } = this.props
		return (
			<div
				data-minute={minuteIndex}
				className={[
					'minute',
					allPossibleStatusCssClassNames[statusId]
				].join(' ')}
			></div>
		)
	}
}
