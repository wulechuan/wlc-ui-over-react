import React, { Component } from 'react';
import HeroValue from '../../atomic-ones/hero-value'
import StatusesIn60Minutes from '../../atomic-ones/statuses-in-60-minutes'

export const APC_CARD_ALL_POSSIBLE_STYLES = [
    { name: '默认样式', cssClassName: 'style-default'},
    { name: '紧凑样式', cssClassName: 'style-compact'},
    { name: 'BPC经典样式', cssClassName: 'style-domino-row'}
]

// export const statusesIn60MinutesAllPossibleStatusCssClassNames = [
//     'status-no-data',
//     'status-ok',
//     'status-error'
// ]

export const statusesIn60MinutesAllPossibleStatusCssClassNames = undefined

export default class APCCard extends Component {
    constructor () {
        super()

        this.instanceId = 'apc-card-'+Math.random().toFixed(10).slice(2)
        this.state = {
            currentStyleCssClassName: APC_CARD_ALL_POSSIBLE_STYLES[0].cssClassName,
            heroValue: 'N/A',
            allMinutesStatusId: []
        }
    }

    decideStyleForStatusesIn60Minutes = (selfStyleName) => {
        switch (selfStyleName) {
            case 'style-compact':
                return 'style-default all-minutes-should-be-blurry'

            case 'style-domino-row':
                return 'domino-row'

            case 'style-default':
            default:
                return 'style-default'
        }
    }

	handleStyleSwitchChange = (event) => {
        const selectElement = event.target
		this.setState({
            currentStyleCssClassName: selectElement.value
		})
	}

    render() {
        const { heroValue, heroValueDescription, allMinutesStatusId }
            = this.props

        return (
			<div className={[
					'apc-card',
					this.state.currentStyleCssClassName
				].join(' ')}>

				<div className="controls">
                    <select type="checkbox" id={this.instanceId+'-style-selector'}
						onChange={this.handleStyleSwitchChange}
					>{
                        APC_CARD_ALL_POSSIBLE_STYLES.map(style => {
                            return <option
                                key={style.cssClassName}
                                value={style.cssClassName}
                            >{style.name}</option>
                        })
                    }</select>
				</div>

				<div className="abstract">
                    <HeroValue
                        value={heroValue}
                        description={heroValueDescription}
                    />
                </div>

				<StatusesIn60Minutes
                    styleCssClassName={this.decideStyleForStatusesIn60Minutes(this.state.currentStyleCssClassName)}
                    allPossibleStatusCssClassNames={statusesIn60MinutesAllPossibleStatusCssClassNames}
                    allMinutesStatusId={allMinutesStatusId}
				/>
			</div>
		)
    }
}
