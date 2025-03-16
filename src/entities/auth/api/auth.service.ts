import { IAuthForm, IAuthResponse } from '@/entities';
import { axiosClassic, TokenService } from '@/shared';

export const AuthService = {
	async main(type: 'login' | 'register', data: IAuthForm) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			data,
		);

		if (response.data.accessToken)
			TokenService.saveAccessTokenToStorage(response.data.accessToken);

		return response;
	},

	async logout() {
		const response = await axiosClassic.post<boolean>('/auth/logout');

		if (response.data) TokenService.removeAccessTokenFromStorage();

		return response;
	},
};
