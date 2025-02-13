import { BaseService } from '@/shared';
import { axiosWithAuth, ITask, TypeTaskFromState } from '@/entities';
import { AxiosInstance } from 'axios';

class TaskService extends BaseService<ITask, TypeTaskFromState>{
	protected get BASE_URL(): string {
		return "/user/tasks";
	}
	protected get axiosInstance(): AxiosInstance {
		return axiosWithAuth;
	}
}

export const taskService = new TaskService();