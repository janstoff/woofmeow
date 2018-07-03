import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./redux/Store.js";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Constants } from "expo";
import { createStackNavigator } from "react-navigation";
import {
  primaryBrandColor,
  secondaryBrandColor,
  primaryColorLight,
  white
} from "./utils/colors";

import GameScreen from "./screens/GameScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

const Screens = createStackNavigator({
  // Welcome: { screen: WelcomeScreen },
  Game: { screen: GameScreen }
});

function CustomStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomStatusBar
          backgroundColor={primaryBrandColor}
          barStyle="light-content"
        />
        <Screens />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryBrandColor
  }
});
