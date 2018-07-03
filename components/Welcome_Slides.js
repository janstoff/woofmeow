import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import {
  white,
  black,
  secondaryBrandColor,
  primaryBrandColor
} from "../utils/colors";
import { Button } from "react-native-elements";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class Slides extends Component {
  render() {
    const { data, navigation, textColor } = this.props;

    return (
      <ScrollView
        horizontal //={true}
        pagingEnabled
        style={styles.container}
      >
        {data.map((slide, index) => {
          return (
            <View
              style={[styles.slide, { backgroundColor: slide.color }]}
              key={slide.text}
            >
              <Text style={[styles.text, { color: slide.textColor }]}>
                {slide.text}
              </Text>
              {index === 0 && (
                <Text style={[styles.swipeText, { color: slide.textColor }]}>
                  Swipe to continue...
                </Text>
              )}
              {index === data.length - 1 && (
                <Button
                  buttonStyle={styles.button}
                  title="Get Started!"
                  color={black}
                  onPress={() => navigation.navigate("Game")}
                />
              )}
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  slide: {
    flex: 1,
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    position: "absolute"
  },
  swipeText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: SCREEN_HEIGHT * 0.84
  },
  button: {
    backgroundColor: secondaryBrandColor,
    marginTop: SCREEN_HEIGHT * 0.35
  }
});

export default Slides;
