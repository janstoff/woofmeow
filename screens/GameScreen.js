import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions
} from "react-native";
import {
  white,
  usOpenBlue,
  gray,
  lightGray,
  secondaryBrandColor,
  primaryBrandColor
} from "../utils/colors";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import MatchCardsDeck from "../components/MatchCardsDeck";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const DATA = [
  {
    id: 1,
    text: "Jan",
    uri: "https://image.ibb.co/bEsDNJ/image_1.jpg",
    animal: "dog"
  },
  {
    id: 2,
    text: "Jan",
    uri: "https://image.ibb.co/e7YW9y/image_2.jpg",
    animal: "dog"
  },
  {
    id: 3,
    text: "Jan",
    uri: "https://image.ibb.co/bE1Uwd/image_3.jpg",
    animal: "dog"
  },
  {
    id: 4,
    text: "Jan",
    uri: "https://image.ibb.co/bHM19y/image_4.jpg",
    animal: "cat"
  },
  {
    id: 5,
    text: "Jan",
    uri: "https://image.ibb.co/mupzwd/image_5.jpg",
    animal: "dog"
  }
];

export default class GameScreen extends Component {
  static navigationOptions = { header: null };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Dog or Cat person?</Text>
        <MatchCardsDeck data={DATA} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryBrandColor
  },
  headerText: {
    textAlign: "center",
    color: "white",
    fontWeight: "200",
    fontSize: 40,
    marginTop: SCREEN_HEIGHT * 0.05
  }
});
