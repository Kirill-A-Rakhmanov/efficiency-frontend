import { Color, Size } from '@/shared';
import clsx from 'clsx';
import React from 'react';
import styles from './Button.module.scss';

export type ButtonColor =
	| Color.Primary
	| Color.Secondary
	| Color.Tertiary
	| Color.Quaternary;

interface IButtonProps {
	className?: string;
	color?: ButtonColor;
	size?: Size;
	startIcon?: React.ReactNode;
	text?: string;
	endIcon?: React.ReactNode;
}

export const Button: React.FC<React.PropsWithChildren<IButtonProps>> = ({
	className,
	endIcon,
	startIcon,
	color = Color.Primary,
	text,
	size = Size.MD,
	children,
}) => {
	return (
		<button
			className={clsx([
				className,
				styles.button,
				styles[size.toString()],
				styles[color.toString()],
			])}
		>
			{startIcon && startIcon}
			{text && <span className={styles.text}>{text}</span>}
			{children && children}
			{endIcon && endIcon}
		</button>
	);
};
