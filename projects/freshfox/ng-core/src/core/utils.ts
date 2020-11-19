export function ngForTrackByUid(index: number, item: { id: string }) {
	return !item ? null : item.id;
}

export function ngForTrackByProperty<T>(property: keyof T) {
	return (index: number, item: T) => {
		return !item ? null : item[property];
	};
}
