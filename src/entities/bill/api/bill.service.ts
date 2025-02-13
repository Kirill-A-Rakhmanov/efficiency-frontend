import { BaseService } from '@/shared';
import { axiosWithAuth, IBill, TypeBillFormState } from '@/entities';
import { AxiosInstance } from 'axios';

class BillService extends BaseService<IBill, TypeBillFormState>{
	protected get BASE_URL(): string {
		return "/user/bill";
	}
	protected get axiosInstance(): AxiosInstance {
		return axiosWithAuth;
	}
}

export const billService = new BillService();