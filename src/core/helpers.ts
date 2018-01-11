export class Helpers {

	/**
	 * Returns a deep object given a string. zoo['animal.type']
	 * @param obj
	 * @param path
	 */
	static getValueDeep(obj, path) {
		if (!obj || !path) {
			return obj;
		}

		let current = obj;
		const split = path.split('.');

		if (split.length) {
			for (let i = 0, len = split.length; i < len; i++) {
				current = current[split[i]];
			}
		}

		return current;
	}

}
