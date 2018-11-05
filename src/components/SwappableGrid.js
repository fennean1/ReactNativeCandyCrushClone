/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  PanResponder,
  Image,
  TouchableHighlight,
  ImageBackground
} from "react-native";

import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";

import {getRandomInt,checkRowsForMatch,checkColsForMatch,
  getAllMatches,markAsMatch,condenseColumns,flattenArrayToPairs} from "../lib/GridApi"
import {BEAN_OBJS} from "../lib/Images"
import {TileData} from "../lib/TileData"
import Tile from "./Tile";


export default class SwappableGrid extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      tileDataSource: this.initializeDataSource(),
    };
  }

  swap(i,j,dx,dy){

    const swapStarter = this.state.tileDataSource[i][j];
    const swapEnder = this.state.tileDataSource[i + dx][j + dy];

    this.state.tileDataSource[i][j] = swapEnder;
    this.state.tileDataSource[i+dx][j+dy] = swapStarter;

    const animateSwap = Animated.parallel([
      Animated.timing(swapStarter.location, {
        toValue: {x: TILE_WIDTH*(i+dx),y: TILE_WIDTH*(j+dy)},
        duration: 120,
        useNativeDriver: true
      }),
      Animated.timing(swapEnder.location, {
        toValue: {x: TILE_WIDTH*i,y: TILE_WIDTH*j},
        duration: 120,
        useNativeDriver: true
      }),
    ])

    animateSwap.start(()=> {
        let allMatches = getAllMatches(this.state.tileDataSource)
        if (allMatches.length != 0) {
          this.processMatches(allMatches)
        }})
  }


  processMatches(matches) {

      let nextMatches = []

      this.setState((state => {
      // Create a copy to our existing tileDataSource
      let newTileDataSource = state.tileDataSource.slice()
      // Mark matches for update.
      markAsMatch(matches,newTileDataSource)
      // Repositioning tiles marked for update.
      condenseColumns(newTileDataSource)
      // Recoloring those tiles & reseting update status.
      this.recolorMatches(newTileDataSource)
      // Get the matches from our new state.
      nextMatches = getAllMatches(newTileDataSource)
      //
      return {tileDataSource: newTileDataSource}}),()=>{this.animateValuesToLocations()})

      // If the matches
      if (nextMatches.length != 0) {
        setTimeout(()=>{this.processMatches(nextMatches)},250)
      }
  }


  recolorMatches(tileData) {
    tileData.forEach(row => {
      row.forEach(e=> {
      if (e.markedAsMatch == true){
        let randIndex = getRandomInt(7);
        let randomBeanObj = BEAN_OBJS[randIndex]
        e.markedAsMatch = false
        e.imgObj = randomBeanObj
      }
    })
    });
  }

  onSwipe(gestureName, gestureState) {

      const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

      let initialGestureX = gestureState.x0;
      let initialGestureY = gestureState.y0;

      let i = Math.round((initialGestureX - this.gridOrigin[0] - 0.5 * TILE_WIDTH) / TILE_WIDTH);
      let j = Math.round((initialGestureY - this.gridOrigin[1] - 0.5 * TILE_WIDTH) / TILE_WIDTH);

      switch (gestureName) {
        case SWIPE_UP:
          this.swap(i,j,0,-1)
          break;
        case SWIPE_DOWN:
          this.swap(i,j,0,1)
          break;
        case SWIPE_LEFT:
          this.swap(i,j,-1,0)
          break;
        case SWIPE_RIGHT:
          this.swap(i,j,1,0)
          break;
      }
  }


  // SwappableGrid.js
renderTiles(tileData) {
    console.log("Render Tiles Called")
    let tiles = [];
    tileData.forEach((row, i) => {
      let rows = row.forEach((e, j) => {
       // e is a singular TileData class.
        tiles.push(
          <Tile
            location={e.location}
            scale={e.scale}
            key={e.key}
            img = {e.imgObj.image}
          />
        );
      });
    });
    return tiles
  }

  initializeDataSource() {
    // Grid that contains the keys that will be assigned to each tile via map
    let keys = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24]
    ];

    var tileData = keys.map((row, i) => {
      let dataRows = row.map((key, j) => {
        let int = getRandomInt(7)
        let randomBeanObj = BEAN_OBJS[int]
        let data = new TileData(randomBeanObj, key);
        return data;
      });
      return dataRows;
    });
    return tileData;
  }

  componentWillMount() {
    this.animateValuesToLocations();
  }

  onLayout(event) {
    this.gridOrigin = [event.nativeEvent.layout.x, event.nativeEvent.layout.y];
  }

  // Animates the values in the tile data source based on their index in the array.
  animateValuesToLocations() {
    this.state.tileDataSource.forEach((row, i) => {
      row.forEach((elem, j) => {
        Animated.timing(elem.location, {
          toValue: { x: TILE_WIDTH * i, y: TILE_WIDTH * j },
          duration: 250,
          useNativeDriver: true
        }).start();
      });
    });
  }

  render() {

    const config = {
      velocityThreshold: 0.11,
      directionalOffsetThreshold: 50
    };

    return (
          <GestureRecognizer
            onLayout={this.onLayout.bind(this)}
            config={config}
            style={styles.gestureContainer}
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
          >
            {this.renderTiles(this.state.tileDataSource)}
          </GestureRecognizer>
    );
  }
}

let Window = Dimensions.get("window");
let windowSpan = Math.min(Window.width, Window.height);
export const TILE_WIDTH = windowSpan / 6;

let colored = false

let blue = colored ? "#3c44d8" : null
let red = colored ? "#f24646" : null
let yellow = colored ? "#faff7f" : null
let green = colored ? "#168e3a" : null
let orange = colored ? "#ea0e62" : null
let pink = colored ? "#ff51f3" : null
let white = "#ffffff";

let styles = StyleSheet.create({
  backGroundImage: {
    flex: 1,
    width: 300,
    height: 300,
    backgroundColor: blue
  },
  gestureContainer: {
    flex: 1,
    width: TILE_WIDTH * 5,
    height: TILE_WIDTH * 5,
    position: "absolute",
    backgroundColor: green,
  },
});
