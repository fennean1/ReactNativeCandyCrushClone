import {
  Animated,
} from "react-native";


export class TileData {
  constructor(imgObj, key) {
    this.key = key;
    this.markedAsMatch = false
    this.location = new Animated.ValueXY();
    this.imgObj = imgObj;
    this.scale = new Animated.Value(1);
  }
}


/*

export function TileData(imgObj,key) {
  this.key = key;
  this.location = new Animated.ValueXY();
  this.obj = imgObj;
  this.scale = new Animated.Value(1);
}

*/
