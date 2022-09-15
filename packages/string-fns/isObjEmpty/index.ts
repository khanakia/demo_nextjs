/**
 * Check if Object is empty or not
 * @param obj Object
 * @returns bool - [TRUE | FALSE]
 */
 export default function isEmpty(obj: any): boolean {
	if (undefined == obj) return true;
	for (var prop in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, prop)) return false;
	}
	return JSON.stringify(obj) === JSON.stringify({});
}
