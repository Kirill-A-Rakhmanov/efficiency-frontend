import { IUser, TypeUserForm } from '@/entities';
import { axiosWithAuth } from '@/shared';

export interface IProfileResponse {
	user: IUser;
	statistics: {
		label: string;
		value: string;
	}[];
}

class UserService {
	private BASE_URL = '/user/profile';

	public async getProfile() {
		const response = await axiosWithAuth.get<IProfileResponse>(
			this.BASE_URL,
		);
		return response.data;
	}

	public async updateProfile(data: TypeUserForm) {
		const response = await axiosWithAuth.put<IProfileResponse>(
			this.BASE_URL,
			data,
		);
		return response.data;
	}
}

export const userService = new UserService();
