import { AuthService } from '@/entities';
import {
	axiosWithAuth,
	errorCatch,
	getAccessToken,
	removeFromStorage,
} from '@/shared';

axiosWithAuth.interceptors.request.use(config => {
	const accessToken = getAccessToken();

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
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			try {
				originalRequest._isRetry = true;
				await AuthService.getNewTokens();
				return axiosWithAuth.request(originalRequest);
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') {
					removeFromStorage();
				}
			}
		}

		throw error;
	},
);