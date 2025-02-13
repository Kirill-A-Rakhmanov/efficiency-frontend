import { IBase } from '@/shared';
import { TransactionType } from '@/entities';

export interface ITransaction extends IBase {
	type: TransactionType;
	amount: number;
	name: string;
	agent: string;
	date: string;
	parentCategoryId?: string;
}

export type TypeTransactionFormState = Partial<Omit<ITransaction, "id" | "createTime" | "lastUpdateTime">>;