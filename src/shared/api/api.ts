import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { axiosClassic, axiosWithAuth } from './interceptors';

export enum RequestMethod {
	Get = 'get',
	Post = 'post',
	Put = 'put',
	Delete = 'delete',
}

export const makeApiRequest = async <TReq, TRes>(
	method: RequestMethod,
	url: string,
	data?: TReq,
	auth: boolean = false,
): Promise<ApiResponse<TRes>> => {
	const axiosInstance: AxiosInstance = auth ? axiosWithAuth : axiosClassic;

	let requestFunc: () => Promise<AxiosResponse<TRes>>;

	switch (method) {
		case RequestMethod.Get:
		case RequestMethod.Delete:
			requestFunc = () => axiosInstance[method](url, { params: data });
			break;
		case RequestMethod.Post:
		case RequestMethod.Put:
			requestFunc = () => axiosInstance[method](url, data);
			break;
	}

	try {
		const response = await requestFunc();
		return new ApiResponse(response.status, response.data, null);
	} catch (error) {
		let errorMessage = 'Произошла неизвестная ошибка';
		if (error instanceof AxiosError) {
			const errorData = error.response?.data?.message;

			if (Array.isArray(errorData) && errorData.length > 0) {
				errorMessage = errorData[0];
			} else if (typeof errorData === 'string') {
				errorMessage = errorData;
			} else if (typeof error.message === 'string') {
				errorMessage = error.message;
			}

			return new ApiResponse<TRes>(
				error.response?.status ?? 500,
				undefined,
				errorMessage,
			);
		}

		return new ApiResponse<TRes>(500, undefined, errorMessage);
	}
};
