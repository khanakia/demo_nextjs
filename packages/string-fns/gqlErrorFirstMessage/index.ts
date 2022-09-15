import gqlParseError from "../gqlParseError"
import objGetPath from "../objGetPath"
import capitalize from "../capitalize"

/**
 * Get First Error message as string from graphql-request or @types/ApolloError
 * @param err : Error
 * @returns string
 */
export default function gqlErrorFirstMessage(err: Error, option?: {capitalize?: boolean}): String {
  let e = gqlParseError(err)

  const errorPaths = [
    "graphQLErrors.0.message", // All the validation error will occur here
    "networkError.result.errors[0].message",
    "response.errors.0.message",
    "networkError.result.message",  // for rest api
    "message",
    
  ];
  const path = errorPaths.find((path) => objGetPath(e, path));

  let msg = objGetPath(e, path);
  if(option?.capitalize) return capitalize(msg);
  return msg
}