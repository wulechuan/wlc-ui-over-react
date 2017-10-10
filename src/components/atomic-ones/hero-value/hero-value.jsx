import React, { Component } from 'react'

export default class HeroValue extends Component {
	constructor () {
		super()

		this.valueOfAllSlots = [null, null]
		this.state = {
			value: null,
			indexOfShowingSlot: 0
		}
	}

	shouldComponentUpdate = (nextProps, nextState) => {
		const indexOfNextShowingValue = (this.state.indexOfShowingSlot + 1) % this.valueOfAllSlots.length;
		this.valueOfAllSlots[indexOfNextShowingValue] = nextProps.value
		nextState.indexOfShowingSlot = indexOfNextShowingValue
		return true;
	}

	render() {
		let today = new Date()
		today = [
			today.getFullYear(),
			today.getMonth() + 1,
			today.getDate()
		].join('.')
		return (
			<div className="hero-value">
				<p className="prefix">{this.props.prefix ? (today + ' - ' + this.props.prefix) : '...'}</p>
				<h2>{
					this.valueOfAllSlots.map((value, index0) => {
						const index1 = index0 + 1
						return (
							<span key={index1} className={[
								'value-slot',
								'value-slot'+index1,
								this.state.indexOfShowingSlot === index0 ? 'is-showing' : ''
							].join(' ')}>{value}</span>
						)
					})
				}</h2>
				<p className="description">{this.props.description}</p>
			</div>
		)
	}
}
