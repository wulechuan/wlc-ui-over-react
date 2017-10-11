import React, { Component } from 'react'

export default class HeroValue extends Component {
	constructor () {
		super()

		this.slotsCountMin = 2               // 目前CSS仅支持2，更多数量则动画效果不太妙
		this.slotsCount = this.slotsCountMin // 目前CSS仅支持2，更多数量则动画效果不太妙
		this.valueOfAllSlots = []
		this.state = {
			value: null,
			indexOfShowingSlot: 0
		}
	}

	shouldComponentUpdate = (nextProps, nextState) => {
		const slotsCountNew = parseInt(nextProps.slotsCount, 10)
		if (!isNaN(slotsCountNew)) {
			this.slotsCount = Math.max(slotsCountNew, this.slotsCountMin)
			this.valueOfAllSlots.length = this.slotsCount
		}

		const indexOfNextShowingValue = (this.state.indexOfShowingSlot + 1) % this.slotsCount;
		this.valueOfAllSlots[indexOfNextShowingValue] = nextProps.value
		nextState.indexOfShowingSlot = indexOfNextShowingValue

		return true;
	}

	render() {
		return (
			<div className="hero-value">
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
