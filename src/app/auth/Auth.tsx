'use client';

import { Size, Toggle } from '@/shared';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styles from './Auth.module.scss';

interface FormValues {
	checkbox: boolean;
}

export function Auth() {
	const { register, handleSubmit, reset, control } = useForm<FormValues>({
		mode: 'onChange',
		defaultValues: {
			checkbox: false,
		},
	});

	const [isLoginForm, setIsLoginForm] = React.useState(false);

	// const { push } = useRouter();
	//
	// const { mutate } = useMutation({
	// 	mutationKey: ['auth'],
	// 	mutationFn: (data: IAuthForm) =>
	// 		AuthService.main(isLoginForm ? 'login' : 'register', data),
	// 	onSuccess() {
	// 		toast.success('Successfully login!');
	// 		reset();
	// 		push(DASHBOARD_PAGES.HOME);
	// 	},
	// });

	// const onSubmit: SubmitHandler<IAuthForm> = data => {
	// 	mutate(data);
	// };

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		console.log(data);
	};

	const [value, setValue] = React.useState<boolean>(false);

	return (
		<div className={styles.wrapper}>
			<form
				className={styles.form}
				onSubmit={handleSubmit(onSubmit)}
				style={{ background: 'white' }}
			>
				<div className={styles.actions}>auth</div>
				<Controller
					name='checkbox'
					control={control}
					render={({ field }) => (
						<Toggle
							disabled={true}
							size={Size.SM}
							label='Label'
							caption='Caption'
							className={styles.checkbox}
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
				<Controller
					name='checkbox'
					control={control}
					render={({ field }) => (
						<Toggle
							size={Size.MD}
							label='Label'
							caption='Caption'
							className={styles.checkbox}
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
				<Controller
					name='checkbox'
					control={control}
					render={({ field }) => (
						<Toggle
							size={Size.LG}
							label='Label'
							caption='Caption'
							className={styles.checkbox}
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
				<button type='submit'>Отправить</button>
			</form>
		</div>
	);
}
