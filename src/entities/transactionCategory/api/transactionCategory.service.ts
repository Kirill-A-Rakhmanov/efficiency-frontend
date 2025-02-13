import { BaseService } from '@/shared';
import { axiosWithAuth, ITransactionCategory, TypeTransactionCategoryFormState } from '@/entities';
import { AxiosInstance } from 'axios';

class TransactionCategoryService extends BaseService<ITransactionCategory, TypeTransactionCategoryFormState>{
	protected get BASE_URL(): string {
		return "/user/transactionCategories";
	}
	protected get axiosInstance(): AxiosInstance {
		return axiosWithAuth;
	}
}

export const transactionCategoryService = new TransactionCategoryService();