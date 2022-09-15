/**
 * Will return:
 * False for: for all strings with chars
 * True for: false, null, undefined, 0, 0.0, "", " ".
 *
 * @param str
 * @returns {boolean}
 */
 export default function isBlank(str: any){
  return (!!!str || /^\s*$/.test(str));
}

// tests
// console.log("isBlank TRUE variants:");
// console.log(isBlank(false));
// console.log(isBlank(undefined));
// console.log(isBlank(null));
// console.log(isBlank(0));
// console.log(isBlank(0.0));
// console.log(isBlank(""));
// console.log(isBlank(" "));

// console.log("isBlank FALSE variants:");
// console.log(isBlank("0"));
// console.log(isBlank("0.0"));
// console.log(isBlank(" 0"));
// console.log(isBlank("0 "));
// console.log(isBlank("Test string"));
// console.log(isBlank("true"));
// console.log(isBlank("false"));
// console.log(isBlank("null"));
// console.log(isBlank("undefined"));
