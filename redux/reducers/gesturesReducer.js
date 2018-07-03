import {
	SWITCH_SCROLLING_OFF,
	SWITCH_SCROLLING_ON
} from '../actions/gesturesActions'

export default function(state = { scrolling: true }, action) {
	switch (action.type) {
		case SWITCH_SCROLLING_OFF:
			return { scrolling: false }
		case SWITCH_SCROLLING_ON:
			return { scrolling: true }
		default:
			return state
	}
}
