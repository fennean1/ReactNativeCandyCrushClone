
import {TILE_WIDTH} from "../components/SwappableGrid"

export const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};


export const isMatch = (objOne,objTwo) => {

  if (objOne != null && objTwo != null) {
    if (objOne.image == objTwo.image) {
      return true
    } else if (objOne.isJar && objTwo.isJar) {
      return true
    } else {
      return false
    }
  } else {
  return false
}
}


// Iterates through each row to look for a match.
export const checkRowsForMatch = (tileData) => {
    // Store the array of matches
    let matches = []

    for (var j = 0; j < 5; j++) {
      // Stores potential match.
      let potentialMatch = [[0,j]]
      let currentImageObj = tileData[0][j].imgObj

      for (var i = 0; i < 5; i++) {

      let nextTileObj = (i+1) == 5 ? null : tileData[i+1][j].imgObj

      if (isMatch(currentImageObj,nextTileObj)) {
        // If next image is the same as the one we're currently checking, push it.
        potentialMatch.push([i+1,j])

      } else {
        if (potentialMatch.length >= 3) {
          matches.push(potentialMatch)
        }
          // Reset the potential match.
          let firstElement = [i+1,j]
          potentialMatch = [firstElement]
          currentImageObj = (i+1) == 5 ? null : tileData[i+1][j].imgObj
      }
    }
  }
  return matches
}

// Iterates through each row to look for a match.
export const checkColsForMatch = (tileData) => {
    // Store the array of matches
    let matches = []

    for (var i = 0; i < 5; i++) {
      // Stores potential match.
      let potentialMatch = []
      for (var j = 0; j < 4; j++) {

      let currentTile = tileData[i][j];
      let nextTile = tileData[i][j+1]

      if (isMatch(currentTile.imgObj,nextTile.imgObj)) {
        // If the current image is equal to the one following it, push it.
        potentialMatch.push([i,j])

        // If we're at the end of the row we have to add the nextTile index because there won't be another iteration of the loop.
        if (j == 3){
          potentialMatch.push([i,j+1])
          if (potentialMatch.length >= 3) {
            matches.push(potentialMatch)
          }
        }

      } else {
        potentialMatch.push([i,j])
        if (potentialMatch.length >= 3) {
          matches.push(potentialMatch)
        }
          // Reset the potential match.
          potentialMatch = []
      }
    }
  }
  return matches
}


export const getAllMatches = (tileData) => {

  let rowMatches = checkRowsForMatch(tileData)
  let colMatches = checkColsForMatch(tileData)

  return [...rowMatches,...colMatches]

}


export const markAsMatch = (matches,tileData) => {
  matches.forEach(match => {
    match.forEach(e => {
    let i = e[0]
    let j = e[1]
    console.log("i,j",i,j)
    tileData[i][j].markedAsMatch = true})
  })
}

export const condenseColumns = (tileData) => {

    let spotsToFill = 0;
    // NOTE: HARDCODED!
    for (let i = 0; i < 5; i++) {
      spotsToFill = 0;

      // Iterate through each column
      for (let j = 4; j >= 0; j--) {

        // Check to see if the element is a spot that needs filling.
        if (tileData[i][j].markedAsMatch == true) {
          // Increment the spots to fill...since we found a spot to fill.
          spotsToFill++;
          // Place the location above the top of the screen for when it "falls"
          tileData[i][j].location.setValue({
            x: TILE_WIDTH * i,
            y: -4 * TILE_WIDTH
          });

          tileData[i][j].scale.setValue(1);

        } else if (spotsToFill > 0) {
          // Move bean downward
          const currentSpot = tileData[i][j];
          const newSpot = tileData[i][j + spotsToFill];

          tileData[i][j] = newSpot;
          tileData[i][j + spotsToFill] = currentSpot;
        }
      }
    }
  }
