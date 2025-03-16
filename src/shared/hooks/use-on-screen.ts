import { useEffect, useState } from 'react';

export const useOnScreen = (
	ref: React.RefObject<Element>,
	rootMargin: string = '0px',
): boolean => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (!ref.current) return;

		const observer = new IntersectionObserver(
			([entry]) => setIsVisible(entry.isIntersecting),
			{ rootMargin },
		);

		observer.observe(ref.current);

		return () => {
			if (ref.current) observer.unobserve(ref.current);
		};
	}, [ref, rootMargin]);

	return isVisible;
};
