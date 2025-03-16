import React from 'react';

export const useArray = <T>(defaultValue: T[]) => {
	const [array, setArray] = React.useState<T[]>(defaultValue);

	function push(element: T) {
		setArray(a => [...a, element]);
	}

	function filter<S extends T>(
		callback: (value: T, index: number, array: T[]) => value is S,
	) {
		setArray(a => a.filter(callback));
	}

	function update(index: number, newElement: T) {
		setArray(a => [
			...a.slice(0, index),
			newElement,
			...a.slice(index + 1, a.length),
		]);
	}

	function remove(index: number) {
		setArray(a => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
	}

	function clear() {
		setArray([]);
	}

	return { array, set: setArray, push, filter, update, remove, clear };
};
