import axios, { CreateAxiosDefaults } from 'axios';
import { tokenService } from '../services';
import { getErrorMessage } from './get-error-message';

const options: CreateAxiosDefaults = {
	baseURL: 'http://localhost:3000/api',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
};

export const axiosClassic = axios.create(options);
export const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use(config => {
	const accessToken = tokenService.getAccessTokenFromCookie();

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config;

		if (
			(error?.response?.status === 401 ||
				getErrorMessage(error) === 'jwt expired' ||
				getErrorMessage(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			try {
				originalRequest._isRetry = true;
				await tokenService.refreshTokens();
				return axiosWithAuth.request(originalRequest);
			} catch (error) {
				if (getErrorMessage(error) === 'jwt expired') {
					tokenService.removeAccessTokenFromStorage();
				}
			}
		}

		throw error;
	},
);
