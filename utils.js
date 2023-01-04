const { BadRequestError } = require("./expressError");
const fsP = require("fs/promises");

// TODO: Research Number.isNaN() vs isNaN()

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

/** Exports conversions to a file. By default it will be saved in root directory. */

async function writeToFile(result, path="./saved.json", encoding='utf8') {
  try{
    await fsP.writeFile(path, JSON.stringify(result), encoding)
  } catch(err){
    console.error(err);
    process.exit(1);
  }
}


module.exports = { convertStrNums, writeToFile };