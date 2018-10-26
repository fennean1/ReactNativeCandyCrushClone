import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  PanResponder,
  Image
} from "react-native";

export default class Tile extends Component<{}> {

  render() {
    return <Animated.Image source = {this.props.img} style={[
          styles.tile,
          { transform: [{ translateX: this.props.location.x }, { translateY: this.props.location.y }, { scale: this.props.scale}] }
        ]}
/>
  }
}

let Window = Dimensions.get("window");
let windowSpan = Math.min(Window.width, Window.height);
let TILE_WIDTH = windowSpan / 6;

let styles = StyleSheet.create({
  tile: {
    width: TILE_WIDTH,
    height: TILE_WIDTH,
    position: "absolute"
  }
});

module.exports = Tile
