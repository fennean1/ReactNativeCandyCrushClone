/*
  @param {number[]} height
   @return {number}

var trap = function(height) {

    let returnValue = 0

    if (height.length != 0) {

    let maxIndex = height.length - 1
    let maximum = Math.max(...height)
    let heightReversed = height.slice().reverse()
    let indexOfForward = height.indexOf(maximum)
    let indexOfReversed = heightReversed.indexOf(maximum)
    let maxIndexOfMax = maxIndex - indexOfReversed
    let minIndexOfMax = indexOfForward

    //Forward

    let maxForHeights = 0
    let sumForHeights = 0

    // From Right
    for (var i = 0;i<minIndexOfMax;i++) {
        if (height[i] <= maxForHeights) {
            sumForHeights += maxForHeights - height[i]
        } else {
            maxForHeights = height[i]
        }
    }

    let maxForHeightsReversed = 0
    let sumForHeightsReversed = 0



    // From Left
    for (var j = maxIndex;j >= maxIndexOfMax;j--) {
        if (height[j] <= maxForHeightsReversed) {
            sumForHeightsReversed += maxForHeightsReversed - height[j]
        } else {
            maxForHeightsReversed = height[j]
        }
    }

    let sumInBetween = 0
    let spacesInBetween = 0

    // In between maxes
    for (var k = minIndexOfMax+1; k<maxIndexOfMax;k++) {
        sumInBetween  += height[k]
        spacesInBetween += 1
    }

    let middleSum = maximum*spacesInBetween - sumInBetween

    returnValue = sumForHeights + sumForHeightsReversed + middleSum
    }

    return returnValue

};

*/
