import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
import {
  white,
  black,
  primaryBrandColor,
  primaryColorLight,
  secondaryBrandColor,
  thirdBrandColor
} from "../utils/colors";
import { AppLoading } from "expo";
import Slides from "../components/Welcome_Slides";

const SLIDE_DATA = [
  {
    text: "Welcome! This is Woof vs. Meow!",
    color: primaryBrandColor,
    textColor: white
  },
  {
    text: "Check out your new colleages...",
    color: secondaryBrandColor,
    textColor: black
  },
  {
    text: "Decide: are they a DOG or a CAT person.",
    color: primaryBrandColor,
    textColor: white
  },
  {
    text: "Swipe in the corresponding direction!",
    color: secondaryBrandColor,
    textColor: black
  },
  {
    text: "They might try to trick you, though... ;)",
    color: primaryBrandColor,
    textColor: white
  }
];

export default class WelcomeScreen extends Component {
  static navigationOptions = { header: null };
  render() {
    return <Slides data={SLIDE_DATA} navigation={this.props.navigation} />;
  }
}
