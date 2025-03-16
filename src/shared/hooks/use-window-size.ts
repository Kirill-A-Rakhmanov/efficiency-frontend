import { useState } from 'react';
import { useEventListener } from './use-event-listener';

interface WindowSize {
	width: number;
	height: number;
}

export const useWindowSize = (): WindowSize => {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEventListener('resize', () => {
		setWindowSize({ width: window.innerWidth, height: window.innerHeight });
	});

	return windowSize;
};
