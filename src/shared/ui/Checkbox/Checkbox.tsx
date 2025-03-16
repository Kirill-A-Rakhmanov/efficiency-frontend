import { Shape, Size } from '@/shared';
import clsx from 'clsx';
import React from 'react';
import styles from './Checkbox.module.scss';

import CheckIcon from '@/assets/icons/check.svg';
import MinusIcon from '@/assets/icons/minus.svg';

type Tristate = boolean | 'intermediate';

interface Props {
	className?: string;
	label?: string | React.ReactNode;
	caption?: string;
	size?: Size.SM | Size.MD;
	shape?: Shape;
	disabled?: boolean;

	value?: Tristate;
	onChange?: (value: Tristate) => void;
	tristate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, Props>(
	(
		{
			className,
			size = Size.MD,
			shape = Shape.Square,
			label,
			caption,
			tristate = false,
			disabled = false,
			value = false,
			onChange,
		},
		ref,
	) => {
		const [state, setState] = React.useState<boolean | 'intermediate'>(
			value,
		);

		React.useEffect(() => {
			setState(value);
		}, [value]);

		const toggleState = () => {
			let newState: boolean | 'intermediate';

			if (tristate) {
				newState =
					state === false
						? true
						: state === true
							? 'intermediate'
							: false;
			} else {
				newState = !state;
			}

			setState(newState);
			onChange && onChange(newState);
		};

		return (
			<label
				className={clsx([
					className,
					styles.wrapper,
					styles[size.toString()],
					styles[shape.toString()],
					caption && styles.withCaption,
					disabled && styles.disabled,
				])}
			>
				<div className={styles.content}>
					<input
						type='checkbox'
						checked={state === true}
						disabled={disabled}
						ref={(el) => {
							if (el) {
								el.indeterminate = state === 'intermediate';
								if (typeof ref === 'function') {
									ref(el);
								} else if (ref) {
									ref.current = el;
								}
							}
						}}
						onChange={toggleState}
					/>
					<div className={styles.checkbox}>
						{state === true && (
							<CheckIcon className={styles.icon} />
						)}
						{state === 'intermediate' && (
							<MinusIcon className={styles.icon} />
						)}
					</div>
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
