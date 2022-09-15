/**
 *
 * @param value any - Check if values is Javascript Object or not
 * @returns bool - [TRUE | FALSE]
 */
 export default function isObj(value: any): boolean {
	const type = typeof value;
	return value !== null && (type === "object" || type === "function");
}
