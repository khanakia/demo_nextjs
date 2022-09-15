/**
 * Convert dot notation "app.appName" to array of strings ['app', 'appName']
 * @param path: string - "app.appName"
 * @returns strings[] - ['app', 'appName']
 */
 export default function getPathSegments(path: string): string[] {
	const pathArray = path.split(".");
	const parts: string[] = [];

	for (let i = 0; i < pathArray.length; i++) {
		let p = pathArray[i];

		while (p[p.length - 1] === "\\" && pathArray[i + 1] !== undefined) {
			p = p.slice(0, -1) + ".";
			p += pathArray[++i];
		}

		parts.push(p);
	}

	const disallowedKeys = ["__proto__", "prototype", "constructor"];

	const isValidPath = (pathSegments: any) => !pathSegments.some((segment: any) => disallowedKeys.includes(segment));

	if (!isValidPath(parts)) {
		return [];
	}

	return parts;
}