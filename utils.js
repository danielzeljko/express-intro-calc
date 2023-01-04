const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {

  // return strNums.map(num=>Number(num))
  const nums = [];

  for (const num of strNums) {
    if (isNaN(parseInt(num))) throw new BadRequestError(`${num} is not a number.`);

    nums.push(parseInt(num));
  }

  return nums;
}


module.exports = { convertStrNums };