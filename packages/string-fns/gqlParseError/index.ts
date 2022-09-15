export default function gqlParseError(err: Error) {
  // let errstring = JSON.stringify(err, undefined, 2)
  let errstring = JSON.stringify(err)
  let errObj = JSON.parse(errstring)
  return errObj
}