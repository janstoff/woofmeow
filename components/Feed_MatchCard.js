import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	Text,
	Animated,
	PanResponder,
	Dimensions
} from 'react-native'
import { Button, Card } from 'react-native-elements'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import {
	primaryBrandColor,
	primaryColorLight,
	secondaryBrandColor,
	white,
	gray
} from '../utils/colors'

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25
const SWIPE_OUT_DURATION = 250

class MatchCard extends Component {
	static defaultProps = {
		//define default props here for reusable components not to throw errors
		//when props not yet passed in
		onSwipeRight: () => {},
		onSwipeLeft: () => {}
	}

	constructor(props) {
		super(props)

		const position = new Animated.ValueXY()

		const panResponder = PanResponder.create({
			//configurate PanResponder instance:
			onStartShouldSetPanResponder: () => true,
			onPanResponderGrant: () => this.props.switchScrollingOff(),
			onPanResponderMove: (event, gesture) => {
				position.setValue({ x: gesture.dx, y: gesture.dy })
			},
			onPanResponderRelease: (event, gesture) => {
				this.props.switchScrollingOn()
				if (gesture.dx > SWIPE_THRESHOLD) {
					this.forceSwipe('right')
				} else if (gesture.dx < -SWIPE_THRESHOLD) {
					this.forceSwipe('left')
				} else {
					this.resetPosition()
				}
			}
		})

		this.panResponder = panResponder //this.state = { panResponder } in official doc
		this.position = position
	}

	forceSwipe(direction) {
		const offScreenRespectiveSide =
			direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH

		Animated.timing(this.position, {
			toValue: { x: offScreenRespectiveSide, y: 0 },
			duration: SWIPE_OUT_DURATION
		}).start(() => this.onSwipeComplete(direction))
	}

	onSwipeComplete(direction) {
		const { card, onSwipeRight, onSwipeLeft } = this.props

		direction === 'right' ? onSwipeRight(card) : onSwipeLeft(card)
	}

	resetPosition() {
		Animated.spring(
			this.position, //starting position = current position
			{ toValue: { x: 0, y: 0 } } //end position = default position
		).start()
	}

	cardSwipeBehavior() {
		const rotationOnSwipe = this.position.x.interpolate({
			inputRange: [-SCREEN_WIDTH * 1.6, 0, SCREEN_WIDTH * 1.6], //*1.x to slow down rotation
			outputRange: ['-120deg', '0deg', '120deg']
		})

		return {
			...this.position.getLayout(), //use spread here in order to combine position and transform into 1 single object
			transform: [{ rotate: rotationOnSwipe }]
		}
	}

	render() {
		const { card } = this.props

		return (
			<Animated.View
				style={this.cardSwipeBehavior()}
				{...this.panResponder.panHandlers}>
				<Card key={card.id} title={card.text} image={{ uri: card.uri }}>
					<Text style={{ marginBottom: 10 }}>
						I can customize the card further.
					</Text>
					<Button
						icon={{ name: 'code' }}
						backgroundColor={secondaryBrandColor}
						title="View Now!"
					/>
				</Card>
			</Animated.View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: white
	},
  card: {
    shadowRadius: 2,
		shadowOpacity: 0.5,
		shadowColor: primaryBrandColor,
		shadowOffset: {
			width: 0,
			height: 3
		}
  }
})

export default connect(null, actions)(MatchCard)
