import isObjEmpty from "../isObjEmpty"

/**
 * Get Value from Javascript Objects using array of strings
 * @param object Object - {student : {name: 'test'}}
 * @param path string - ['student', 'name']
 * @param value any - Returns default value if values is undefined on object
 */
 export default function objGetArrayPath(obj: any, props: string[] = [], defaultValue = null): any {
	if (undefined == obj || isObjEmpty(obj)) return defaultValue;

	props.forEach((element) => {
		// console.log(element, obj)
		if (undefined == obj || isObjEmpty(obj) || !Object.prototype.hasOwnProperty.call(obj, element)) {
			obj = defaultValue;
			return;
		}
		obj = obj[element] ? obj[element] : defaultValue; // if obj[element]==null then return defaultValue
	});

	return obj;
}