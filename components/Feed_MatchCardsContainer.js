import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	ScrollView,
	TouchableOpacity,
	Text,
	Animated,
	Dimensions,
	UIManager,
	LayoutAnimation
} from 'react-native'
import { Button, Card } from 'react-native-elements'
import { connect } from 'react-redux'
import {
	primaryBrandColor,
	primaryColorLight,
	secondaryBrandColor,
	white,
	gray
} from '../utils/colors'
import MatchCard from '../components/Feed_MatchCard'

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25
const SWIPE_OUT_DURATION = 250

class MatchCardsContainer extends Component {
	componentWillUpdate() {
		//whenever the component updates we will animate the change with a general spring()
		UIManager.setLayoutAnimationEnabledExperimental &&
			UIManager.setLayoutAnimationEnabledExperimental(true)
		//android specific compatibility code (if the function exists, call it with true)

		LayoutAnimation.spring()
	}

	renderNoMoreMatchesInfo() {
		return (
			<Card title="No more Games!">
				<Text style={{ marginBottom: 10 }}>
					There are currently no more games in your area.
				</Text>
				<Button
					backgroundColor={secondaryBrandColor}
					title="Increase Search Radius"
				/>
			</Card>
		)
	}

	render() {
		const { data, scrolling } = this.props

		return (
			<ScrollView
					style={styles.container}
					scrollEnabled={scrolling}
				>
				{data.map(card => <MatchCard key={card.id} card={card} />)}
				{this.renderNoMoreMatchesInfo()}
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: white
	},
	buttonContainer: {
		backgroundColor: secondaryBrandColor,
		paddingVertical: 15,
		shadowRadius: 2,
		shadowOpacity: 0.5,
		shadowColor: gray,
		shadowOffset: {
			width: 0,
			height: 3
		}
	},
	buttonText: {
		textAlign: 'center',
		color: white,
		fontWeight: '600'
	}
})

function mapStateToProps({ gestures }) {
	return {
		scrolling: gestures.scrolling
	}
}

export default connect(mapStateToProps)(MatchCardsContainer)
