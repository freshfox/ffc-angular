


// Global test run path
const testRun = `tests/${Date.now()}`;

export function getFirestoreTestPath(path?: string) {
	if (path) {
		return `${testRun}/${path}`;
	}
	return testRun;
}

export function wait(ms: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
