import { Size } from '@/shared';
import clsx from 'clsx';
import React from 'react';
import styles from './Toggle.module.scss';

interface Props {
	className?: string;
	label?: string;
	caption?: string;
	size?: Size.SM | Size.MD | Size.LG;
	disabled?: boolean;

	value: boolean;
	onChange?: (value: boolean) => void;
}

export const Toggle = React.forwardRef<HTMLInputElement, Props>(
	(
		{
			className,
			size = Size.SM,
			label,
			caption,
			disabled = false,
			value,
			onChange,
		},
		ref,
	) => {
		const [state, setState] = React.useState<boolean>(value);

		React.useEffect(() => {
			setState(value);
		}, [value]);

		const toggleState = () => {
			setState(!state);
			onChange && onChange(!state);
		};

		return (
			<label
				className={clsx([
					className,
					styles.wrapper,
					styles[size.toString()],
					caption && styles.withCaption,
					disabled && styles.disabled,
				])}
			>
				<div className={styles.content}>
					<input
						type='checkbox'
						checked={state}
						disabled={disabled}
						ref={(el) => {
							if (el) {
								if (typeof ref === 'function') {
									ref(el);
								} else if (ref) {
									ref.current = el;
								}
							}
						}}
						onChange={toggleState}
					/>
					<span className={styles.slider}></span>
				</div>

				{label && (
					<div className={styles.text}>
						<span className={styles.label}>{label}</span>
						{caption && (
							<span className={styles.caption}>{caption}</span>
						)}
					</div>
				)}
			</label>
		);
	},
);
