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
import {
	primaryBrandColor,
	primaryColorLight,
	secondaryBrandColor,
	white,
	gray
} from '../utils/colors'

class MatchCard extends Component {
	render() {
		const { card } = this.props

		return (
			<View>
				<Card key={card.id} title={card.text} image={{ uri: card.uri }} style={styles.card}>
					<Text style={{ marginBottom: 10 }}>
						I can customize the card further.
					</Text>
					<Button
						icon={{ name: 'code', color: gray }}
						color={gray}
						backgroundColor={secondaryBrandColor}
						title="View Now!"
					/>
				</Card>
			</View>
		)
	}
}

const styles = StyleSheet.create({
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

export default MatchCard
