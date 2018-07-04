import React, { Component } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
// import { Button, Card } from "react-native-elements";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  primaryBrandColor,
  secondaryBrandColor,
  white,
  gray
} from "../utils/colors";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class MatchCard extends Component {
  render() {
    const { card, forceSwipe } = this.props;

    return (
      <Container>
        <Content>
          <Card>
            <CardItem style={styles.container}>
              <Text style={styles.name}>{card.text}</Text>
            </CardItem>
            <CardItem style={styles.container}>
              <Image
                source={{ uri: card.uri }}
                style={{
                  height: SCREEN_HEIGHT * 0.5,
                  width: SCREEN_WIDTH * 0.8
                }}
              />
            </CardItem>
            <CardItem style={styles.container}>
              <Left>
                <Button transparent disabled onClick={() => forceSwipe("left")}>
                  <MaterialCommunityIcons
                    name="gesture-swipe-left"
                    size={30}
                    color={primaryBrandColor}
                  />
                  <Text style={styles.swipeTextDog}>Dog</Text>
                </Button>
              </Left>
              <Right>
                <View style={{ backgroundColor: primaryBrandColor }}>
                  <Button
                    transparent
                    disabled
                    onClick={() => forceSwipe("right")}
                  >
                    <Text style={styles.swipeTextCat}>Cat</Text>
                    <MaterialCommunityIcons
                      name="gesture-swipe-right"
                      size={30}
                      color={secondaryBrandColor}
                    />
                  </Button>
                </View>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: secondaryBrandColor
  },
  card: {
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowColor: primaryBrandColor,
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  name: {
    color: gray,
    fontSize: 30,
    fontWeight: "400"
  },
  swipeTextDog: {
    color: primaryBrandColor,
    fontSize: 30,
    fontWeight: "200"
  },
  swipeTextCat: {
    color: secondaryBrandColor,
    fontSize: 30,
    fontWeight: "200"
  }
});

export default MatchCard;
