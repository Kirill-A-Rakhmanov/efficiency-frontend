import { useEffect, useRef } from 'react';

export const useEventListener = <K extends keyof WindowEventMap>(
	eventType: K,
	callback: (event: WindowEventMap[K]) => void,
	element: Window | HTMLElement | null = window,
) => {
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		if (!element) return;

		const handler = (event: Event) =>
			callbackRef.current(event as WindowEventMap[K]);

		element.addEventListener(eventType, handler);
		return () => element.removeEventListener(eventType, handler);
	}, [eventType, element]);
};
