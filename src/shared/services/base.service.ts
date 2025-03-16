import { AxiosInstance } from 'axios';

export abstract class BaseService<TRes, TForm> {
	protected abstract get BASE_URL(): string;
	protected abstract get axiosInstance(): AxiosInstance;

	async getAll() {
		const response = await this.axiosInstance.get<TRes>(this.BASE_URL);
		return response.data;
	}

	async getQueryable(queryParams: Record<string, any>, id?: string) {
		const url = id ? `${this.BASE_URL}/${id}` : this.BASE_URL;

		const response = await this.axiosInstance.get<TRes>(url, {
			params: queryParams,
		});

		return response.data;
	}

	async create(data: TForm) {
		const response = await this.axiosInstance.post<TRes>(this.BASE_URL, data);
		return response.data;
	}

	async update(id: string, data: TForm) {
		const response = await this.axiosInstance.put<TRes>(
			`${this.BASE_URL}/${id}`,
			data,
		);
		return response.data;
	}

	async delete(id: string, data: TForm) {
		const response = await this.axiosInstance.delete<TRes>(
			`${this.BASE_URL}/${id}`,
		);
		return response.data;
	}
}
