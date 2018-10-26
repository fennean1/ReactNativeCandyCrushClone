// Beans
export const PINK_BEAN = require("../assets/PinkJellyBean.png");
export const PURPLE_BEAN = require("../assets/PurpleJellyBean.png");
export const BLUE_BEAN = require("../assets/BlueJellyBean.png");
export const ORANGE_BEAN = require("../assets/OrangeJellyBean.png");
export const GREEN_BEAN = require("../assets/GreenJellyBean.png");
export const YELLOW_BEAN = require("../assets/YellowJellyBean.png");
export const  RED_BEAN = require("../assets/RedJellyBean.png");

export const BEANS = [PINK_BEAN,PURPLE_BEAN,BLUE_BEAN,ORANGE_BEAN,GREEN_BEAN,YELLOW_BEAN,RED_BEAN]

// Colors
const COLORS = {
  BLUE: 0,
  RED: 1,
  YELLOW: 2,
  PINK: 3,
  PURPLE: 4,
  ORANGE: 5,
  GREEN: 6,
}

export const PINK_BEAN_OBJ =  {
  image: PINK_BEAN,
  color: COLORS.PINK,
  isJar: false
}

export const BLUE_BEAN_OBJ=  {
  image: BLUE_BEAN,
  color: COLORS.BLUE,
  isJar: false
}

export const RED_BEAN_OBJ =  {
  image: RED_BEAN,
  color: COLORS.RED,
  isJar: false
}

export const PURPLE_BEAN_OBJ =  {
  image: PURPLE_BEAN,
  color: COLORS.PURPLE,
  isJar: false
}

export const YELLOW_BEAN_OBJ =  {
  image: YELLOW_BEAN,
  color: COLORS.YELLOW,
  isJar: false
}

export const GREEN_BEAN_OBJ =  {
  image: GREEN_BEAN,
  color: COLORS.GREEN,
  isJar: false
}

export const ORANGE_BEAN_OBJ =  {
  image: ORANGE_BEAN,
  color: COLORS.ORANGE,
  isJar: false
}

export const BEAN_OBJS = [PINK_BEAN_OBJ,PURPLE_BEAN_OBJ,BLUE_BEAN_OBJ,ORANGE_BEAN_OBJ,GREEN_BEAN_OBJ,YELLOW_BEAN_OBJ,RED_BEAN_OBJ]
