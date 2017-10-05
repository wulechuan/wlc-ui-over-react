import React, { Component } from 'react'

export default class HeroValue extends Component {
	constructor () {
		super()
		this.state = {
			value1: null,
			value2: null,
			isShowingValueSlot1: true
		}
	}

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.state.isShowingValueSlot1) {
			nextState.value2 = nextProps.value
		} else {
			nextState.value1 = nextProps.value
		}
		nextState.isShowingValueSlot1 = !this.state.isShowingValueSlot1
		return true;
	}

	render() {
		return (
			<div className="hero-value">
				<h2>
					<span className={[
						'value-slot value-slot-1',
						this.state.isShowingValueSlot1 ? 'is-showing' : '' 
					].join(' ')}>{this.state.value1}</span>
					<span className={[
						'value-slot value-slot-2',
						!this.state.isShowingValueSlot1 ? 'is-showing' : '' 
					].join(' ')}>{this.state.value2}</span>
				</h2>
				<p className="description">{this.props.description}</p>
			</div>
		)
	}
}
