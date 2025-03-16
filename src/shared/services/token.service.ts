import { IAuthResponse } from '@/entities';
import Cookies from 'js-cookie';
import { makeApiRequest, RequestMethod } from '../api/api';

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken',
}

export class TokenService {
	getAccessTokenFromCookie = () => {
		const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
		return accessToken || null;
	};

	removeAccessTokenFromStorage = () => {
		Cookies.remove(EnumTokens.ACCESS_TOKEN);
	};

	async refreshTokens() {
		//todo: переделать тип ответа на undefined (в ответе должна быть пара новых токенов)
		const res = await makeApiRequest<undefined, IAuthResponse>(
			RequestMethod.Post,
			'/auth/login/access-token',
			undefined,
			false,
		);

		if (res.isSuccessful()) {
			this.saveAccessTokenToStorage(res.data.accessToken);
		}

		return res;
	}

	private saveAccessTokenToStorage = (accessToken: string) => {
		Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
			domain: 'localhost',
			sameSite: 'strict',
			expires: 1,
		});
	};
}
export const tokenService = new TokenService();
