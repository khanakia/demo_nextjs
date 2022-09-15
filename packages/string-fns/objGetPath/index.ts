import isObj from "../isObj"
import getPathSegments from "../getPathSegments"
import objGetArrayPath from "../objGetArrayPath"

/**
 * Get Value from Javascript Objects using dot notation
 * @param object Object - {student : {name: 'test'}}
 * @param path string - 'student.name'
 * @param value any - Returns default value if values is undefined on object
 */
 export default function objGetPath(object: any, path: any, value: any = null): any {
	if (!isObj(object) || typeof path !== "string") {
		// return value === undefined ? object : value;
		return value;
	}

	const pathArray: string[] = getPathSegments(path);
	if (pathArray.length === 0) {
		return;
	}
	// console.log(pathArray)

	return objGetArrayPath(object, pathArray, value);
}
