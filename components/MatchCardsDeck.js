import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  Animated,
  PanResponder,
  Dimensions,
  UIManager,
  LayoutAnimation
} from "react-native";
import { Button, Card } from "react-native-elements";
import MatchCard from "./MatchCard";
import {
  primaryBrandColor,
  primaryColorLight,
  secondaryBrandColor,
  white,
  gray
} from "../utils/colors";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 250;

class MatchCardsDeck extends Component {
  static defaultProps = {
    //define default props here for reusable components not to throw errors
    //when props not yet passed in
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  };

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      //configurate PanResponder instance:
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe("left");
        } else {
          this.resetPosition();
        }
      }
    });

    this.panResponder = panResponder; //this.state = { panResponder } in official doc
    this.position = position;
    this.state = { index: 0 };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      //if the set of data changes show the new data starting at index 0
      this.setState({ index: 0 });
    }
  }

  componentWillUpdate() {
    //whenever the component updates we will animate the change with a general spring()
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    //android specific compatibility code (if the function exists, call it with true)

    LayoutAnimation.spring();
  }

  forceSwipe(direction) {
    const offScreenRespectiveSide =
      direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;

    Animated.timing(this.position, {
      toValue: { x: offScreenRespectiveSide, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction) {
    const { onSwipeRight, onSwipeLeft, data } = this.props;
    const currentCard = data[this.state.index];

    this.position.setValue({ x: 0, y: 0 }); //reset starting position for new (next) card
    this.setState({ index: this.state.index + 1 }); //set index to access new (next) card

    direction === "right"
      ? onSwipeRight(currentCard)
      : onSwipeLeft(currentCard);
  }

  resetPosition() {
    Animated.spring(
      this.position, //starting position = current position
      { toValue: { x: 0, y: 0 } } //end position = default position
    ).start();
  }

  topCardBehavior() {
    const rotationOnSwipe = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.6, 0, SCREEN_WIDTH * 1.6], //*1.x to slow down rotation
      outputRange: ["-120deg", "0deg", "120deg"]
    });

    return {
      ...this.position.getLayout(), //use spread here in order to combine position and transform into 1 single object
      transform: [{ rotate: rotationOnSwipe }]
    };
  }

  renderNoMoreMatchesInfo() {
    return (
      <View>
        <TextInput />
        <Button
          backgroundColor={secondaryBrandColor}
          title="Send your result"
        />
      </View>
    );
  }

  renderCards() {
    const { data, renderCard } = this.props;

    if (this.state.index >= data.length) {
      return this.renderNoMoreMatchesInfo();
    }

    return data
      .map((card, thatcardsIndex) => {
        if (thatcardsIndex < this.state.index) {
          //i.e. if that card has already been swiped
          return null;
        }

        if (thatcardsIndex === this.state.index) {
          return (
            <Animated.View
              key={card.id}
              style={[this.topCardBehavior(), styles.card]}
              {...this.panResponder.panHandlers}
            >
              <MatchCard card={card} />
            </Animated.View>
          );
        }

        return (
          <Animated.View
            key={card.id}
            style={[
              styles.card,
              { top: 2 * (thatcardsIndex - this.state.index) }
            ]}
          >
            <MatchCard card={card} forceSwipe={this.forceSwipe} />
          </Animated.View>
        );
      })
      .reverse();
  }

  render() {
    return <View style={styles.container}>{this.renderCards()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: secondaryBrandColor,
    width: SCREEN_WIDTH * 0.96,
    height: SCREEN_HEIGHT * 0.7,
    padding: 10,
    marginTop: SCREEN_HEIGHT * 0.05,
    marginBottom: SCREEN_HEIGHT * 0.1,
    marginLeft: SCREEN_WIDTH * 0.02
  },
  finalCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: secondaryBrandColor,
    marginLeft: SCREEN_WIDTH * 0.04
    // width: SCREEN_WIDTH * 0.96,
    // height: SCREEN_HEIGHT * 0.7,
    // padding: 10,
    // marginBottom: SCREEN_HEIGHT * 0.1
  }
});

export default MatchCardsDeck;
