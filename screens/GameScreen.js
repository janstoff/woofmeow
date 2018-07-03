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
import MatchCardsContainer from "../components/Feed_MatchCardsContainer";
import MatchCardsDeck from "../components/Feed_MatchCardsDeck_Tinder";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const DATA = [
  {
    id: 1,
    text: "Jan",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg",
    animal: "dog"
  },
  {
    id: 2,
    text: "Jan",
    uri: "http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg",
    animal: "dog"
  },
  {
    id: 3,
    text: "Jan",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg",
    animal: "dog"
  }
];

export default class GameScreen extends Component {
  static navigationOptions = { header: null };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: primaryBrandColor }}>
        <Text style={styles.headerText}>Dog or Cat person?</Text>
        <MatchCardsDeck data={DATA} />
        <Text style={styles.footerText}>left for Dog | right for Cat </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryBrandColor
  },
  headerText: {
    textAlign: "center",
    color: "white",
    fontWeight: "600",
    fontSize: 20,
    marginTop: SCREEN_HEIGHT * 0.1
  },
  footerText: {
    textAlign: "center",
    color: "white",
    fontWeight: "200",
    fontSize: 20,
    marginTop: SCREEN_HEIGHT * 0.6
  }
});
