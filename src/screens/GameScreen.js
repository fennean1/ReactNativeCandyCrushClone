import React, { Component } from "react";
import ReactNative from "react-native";
import SwappableGrid from "../components/SwappableGrid";
import Dimensions from "Dimensions";

import ImageTypes from "../lib/Images";

let playButton = require("../assets/PlayButton.png");

const {
  View,
  Text,
  TouchableHighlight,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
  Animated
} = ReactNative;


let justClouds = require("../assets/CloudsBackground.png");

class GameScreen extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ImageBackground source={justClouds} style={styles.backGroundImage}>
          <SwappableGrid/>
      </ImageBackground>
    );
  }
}

let Window = Dimensions.get("window");
let windowSpan = Math.min(Window.width, Window.height);
let colored = true;
let TILE_WIDTH = windowSpan / 6;

let windowWidth = Window.width;
let windowHeight = Window.height;

let blue = colored ? "#3c44d8" : "#ffffff";
let red = colored ? "#f24646" : "#ffffff";
let yellow = colored ? "#faff7f" : "#ffffff";
let green = colored ? "#168e3a" : "#ffffff";
let orange = colored ? "#ea0e62" : "#ffffff";
let pink = colored ? "#ff51f3" : "#ffffff";
let white = "#ffffff";

let styles = StyleSheet.create({
  backGroundImage: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

});

module.exports = GameScreen;
