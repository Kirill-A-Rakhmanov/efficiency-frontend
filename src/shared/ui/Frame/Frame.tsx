import { Size } from '@/shared/constants';
import clsx from 'clsx';
import React from 'react';
import styles from './Frame.module.scss';

export interface FrameProps {
	imageUrl?: string;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	tag?: React.ReactNode; // todo: сделать Tag и добавить его пропсы сюда

	size?: Size;
}

export const Frame: React.FC<React.PropsWithChildren<FrameProps>> = ({
	imageUrl,
	startIcon,
	endIcon,
	tag,
	size = Size.MD,
	children,
}) => {
	return (
		<div className={clsx([styles.wrapper, styles[size.toString()]])}>
			{(imageUrl || startIcon) && (
				<div className={styles.start}>
					{imageUrl && (
						<div className={styles.image}>
							<img src={imageUrl} />
						</div>
					)}
					{startIcon && startIcon}
				</div>
			)}
			{children}
			{(endIcon || tag) && (
				<div className={styles.end}>
					{endIcon && endIcon}
					{tag && tag}
				</div>
			)}
		</div>
	);
};
