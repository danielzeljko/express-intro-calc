const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  return strNums.map(num=>Number(num))
}


module.exports = { convertStrNums };