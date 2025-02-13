'use client';

import { AuthService, IAuthForm } from '@/entities';
import { DASHBOARD_PAGES } from '@/shared';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import styles from './Ayth.module.scss';

export function Auth() {
	const { register, handleSubmit, reset } = useForm<IAuthForm>({
		mode: 'onChange',
	});

	const [isLoginForm, setIsLoginForm] = React.useState(false);

	const { push } = useRouter();

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) =>
			AuthService.main(isLoginForm ? 'login' : 'register', data),
		onSuccess() {
			toast.success('Successfully login!');
			reset();
			push(DASHBOARD_PAGES.HOME);
		},
	});

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data);
	};

	return <div className={styles.wrapper}>
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.actions}>
				auth
			</div>
		</form>
	</div>;
}
