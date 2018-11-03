
import {TILE_WIDTH} from "../components/SwappableGrid"

export const flattenArrayToPairs = arr => {
  let flatterArray = [];

  arr.map((row, i) => {
    row.map((e, j) => {
      flatterArray.push(e);
    });
  });

  if (Array.isArray(flatterArray[0]) == false) {
    return arr;
  }

  return flattenArrayToPairs(flatterArray);
};

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

    // Iterate through the rows from top to bottom.
    for (var j = 0; j < 5; j++) {
      // Record the first index in the row.
      let firstIndex = [0,j]
      // Add the index to our potentialMatch
      let potentialMatch = [firstIndex]
      // Record the imgage object corresponding to the first element in our potentialMatch
      let currentImageObj = tileData[0][j].imgObj

      // Traverse the elements of the row.
      for (var i = 0; i < 5; i++) {

      // Get the object stored in the next tile. Set to null if the next index is out of range.
      let nextTileObj = (i+1) < 5 ? tileData[i+1][j].imgObj: null

      if (isMatch(currentImageObj,nextTileObj)) {
        // Add the next index to our potential Match.
        potentialMatch.push([i+1,j])

      } else {
        // Check to see if the potentialMatch is greater than 3.
        if (potentialMatch.length >= 3) {
          matches.push(potentialMatch)
        }
          // Reset the first index.
          firstIndex = [i+1,j]
          // Add it to the potentialMatch
          potentialMatch = [firstIndex]
          // Reset the current imageObj to that of the next image.
          currentImageObj = (i+1) < 5 ? tileData[i+1][j].imgObj: null
      }
    }
  }
  return matches
}

// Iterates through each row to look for a match.
export const checkColsForMatch = (tileData) => {
    // Store the array of matches
    let matches = []

    // Iterate through the rows from top to bottom.
    for (var i = 0; i < 5; i++) {
      // Record the first index in the row.
      let firstIndex = [i,0]
      // Add the index to our potentialMatch
      let potentialMatch = [firstIndex]
      // Record the imgage object corresponding to the first element in our potentialMatch
      let currentImageObj = tileData[i][0].imgObj

      // Traverse the elements of the row.
      for (var j = 0; j < 5; j++) {

      // Get the object stored in the next tile. Set to null if the next index is out of range.
      let nextTileObj = (j+1) < 5 ? tileData[i][j+1].imgObj: null

      if (isMatch(currentImageObj,nextTileObj)) {
        // Add the next index to our potential Match.
        potentialMatch.push([i,j+1])

      } else {
        // Check to see if the potentialMatch is greater than 3.
        if (potentialMatch.length >= 3) {
          matches.push(potentialMatch)
        }
          // Reset the first index.
          firstIndex = [i,j+1]
          // Add it to the potentialMatch
          potentialMatch = [firstIndex]
          // Reset the current imageObj to that of the next image.
          currentImageObj = (j+1) < 5 ? tileData[i][j+1].imgObj: null
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
    // Get number of rows and number of columns.
    let numOfRows = tileData[0].length
    let numOfCols = tileData.length

    let spotsToFill = 0;

    for (let i = 0; i < numOfRows; i++) {
      spotsToFill = 0;

      // Iterate through each column
      for (let j = numOfCols-1; j >= 0; j--) {

        // Check to see if the element is a spot that needs filling.
        if (tileData[i][j].markedAsMatch == true) {
          // Increment the spots to fill since we found a spot to fill.
          spotsToFill++;
          // Place the location above the top of the screen for when it "falls"
          tileData[i][j].location.setValue({
            x: TILE_WIDTH * i,
            y: -4 * TILE_WIDTH
          });

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
