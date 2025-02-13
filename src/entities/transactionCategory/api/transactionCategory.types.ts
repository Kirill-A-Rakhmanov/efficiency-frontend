import { IBase } from '@/shared';

export enum TransactionType {
	Income = 'income',
	Expense = 'expense',
	Transfer = 'transfer',
}

export interface ITransactionCategory extends IBase {
	name: string;
	type: TransactionType;
}

export type TypeTransactionCategoryFormState = Partial<Omit<ITransactionCategory, "id" | "createTime" | "lastUpdateTime">>;