import React, { Component } from 'react'

export default class HeroValue extends Component {
	render() {
		return (
			<div className="hero-value">
				<h2>{this.props.value}</h2>
				<p>{this.props.description}</p>
			</div>
		)
	}
}
