import React, { Component } from 'react'

export default class StatusesIn60Minutes extends Component {
	render() {
		const MINUTES_COUNT_PER_GROUP = 10
		const { statuses, allPossibleStatusClassNames }
			= this.props

		const statusesInGroups = []

		for (let i = 0; i < statuses.length; i+=MINUTES_COUNT_PER_GROUP) {
			statusesInGroups.push(
				statuses.slice(i, i+MINUTES_COUNT_PER_GROUP),
			)
		}

		return (
			<div className="statuses-in-60-minutes">
				<div className="abstract">{this.props.abstract}</div>
				<div className="all-minutes-wrapper">
					<div className="all-minutes">
						{
							statusesInGroups.map((minutesGroup, gi) => {
								return (
									<div className="minutes-group" data-group-index={gi+1} key={gi+1}>
									{
										minutesGroup.map(function(statusId, mi) {
											const minuteIndex = gi * MINUTES_COUNT_PER_GROUP + mi + 1
											return <StatusOfOneMinute
												key={minuteIndex}
												minute={minuteIndex}
												classNameOfStatus={allPossibleStatusClassNames[statusId]}
												statusId={statusId}
												/>
										}, this)
									}
									</div>
								)
							})
						}
					</div>
				</div>
			</div>
		)
	}
}

class StatusOfOneMinute extends Component {
	render() {
		return (
			<div
				data-minute={this.props.minute}
				className={[
					'minute',
					this.props.classNameOfStatus
				].join(' ')}
			>
				{/* {this.props.statusId} */}
			</div>
		)
	}
}

