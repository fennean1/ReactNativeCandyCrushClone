import React from "react";
import ReactNative from "react-native";

var GameScreen = require("../screens/GameScreen");

import { createStackNavigator } from "react-navigation";

const Game = ({navigation}) => {
  return <GameScreen navigation={navigation}  />;
};

const AppNavigator = createStackNavigator({
  Root: {
    screen: Game,
    navigationOptions: {
      header: null
    }
  }
});

module.exports = AppNavigator;
