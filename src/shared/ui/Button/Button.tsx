import { Color, Size } from '@/shared';
import clsx from 'clsx';
import React from 'react';
import { Frame, FrameProps } from '../Frame/Frame';
import styles from './Button.module.scss';

type ButtonColor =
	| Color.Primary
	| Color.Secondary
	| Color.Tertiary
	| Color.Quaternary;

interface Props extends FrameProps, React.HTMLAttributes<HTMLButtonElement> {
	color?: ButtonColor;
	text?: string;
	customContent?: React.ReactNode;
	disabled?: boolean;
}

export const Button: React.FC<Props> = ({
	customContent,
	imageUrl,
	startIcon,
	text,
	endIcon,
	tag,
	size = Size.MD,
	color = Color.Primary,
	disabled = false,
	...params
}) => {
	return (
		<button
			{...params}
			disabled={disabled}
			className={clsx([
				styles.button,
				styles[size.toString()],
				styles[color.toString()],
			])}
		>
			{customContent ? (
				customContent
			) : (
				<Frame
					size={size}
					imageUrl={imageUrl}
					startIcon={startIcon}
					children={<span className={styles.text}>{text}</span>}
					endIcon={endIcon}
					tag={tag}
				/>
			)}
		</button>
	);
};
