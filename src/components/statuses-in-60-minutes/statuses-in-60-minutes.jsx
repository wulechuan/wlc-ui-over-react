import React, { Component } from 'react'

export default class StatusesIn60Minutes extends Component {
	constructor () {
		super()

		this.instanceId = 'statuses-in-60-minutes-'+Math.random().toFixed(10).slice(2)
		
		this.allMinutesPossibleStyles = [
			{ name: '默认样式', cssClassName: 'style-default'},
			{ name: 'BPC经典样式', cssClassName: 'style-bpc-classic'}
		]

		this.state = {
			allMinutesStyle: 0
		}
	}

	handleStyleSwitchChange = (event) => {
		const inputElement = event.target
		this.setState({
			allMinutesStyle: inputElement.checked ? 1 : 0
		})
	}

	render() {
		// const MINUTES_COUNT_PER_GROUP = 10
		const { minutesStatus, allPossibleStatusCssClassNames }
			= this.props

		// const minutesStatusInGroups = []

		// for (let i = 0; i < statuses.length; i+=MINUTES_COUNT_PER_GROUP) {
		// 	minutesStatusInGroups.push(
		// 		minutesStatus.slice(i, i+MINUTES_COUNT_PER_GROUP),
		// 	)
		// }

		return (
			<div className={[
					'statuses-in-60-minutes',
					this.allMinutesPossibleStyles[this.state.allMinutesStyle].cssClassName
				].join(' ')}>
				<div className="controls">
					<input type="checkbox" id={this.instanceId}
						onChange={this.handleStyleSwitchChange}
					/><label htmlFor={this.instanceId}>采用经典样式</label>
				</div>
				<div className="abstract">{this.props.abstract}</div>
				<div className="all-minutes-wrapper">
					<div className="all-minutes">
						{
							minutesStatus.map(function(statusId, mi) {
								const minuteIndex = mi + 1
								return <StatusOfOneMinute
									key={minuteIndex}
									minute={minuteIndex}
									classNameOfStatus={allPossibleStatusCssClassNames[statusId]}
									statusId={statusId}
								/>
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

