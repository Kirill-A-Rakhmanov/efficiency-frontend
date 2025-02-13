import { BaseService } from '@/shared';
import { axiosWithAuth, ITransaction, TypeTransactionFormState } from '@/entities';
import { AxiosInstance } from 'axios';

class TransactionService extends BaseService<ITransaction, TypeTransactionFormState>{
	protected get BASE_URL(): string {
		return "/bill/transaction";
	}
	protected get axiosInstance(): AxiosInstance {
		return axiosWithAuth;
	}
}

export const transactionService = new TransactionService();