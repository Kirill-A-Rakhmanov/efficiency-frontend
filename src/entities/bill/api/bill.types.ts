import { IBase } from '@/shared';

export interface IBill extends IBase{
	name: string;
	balance: number;
	icon: string;

	enableNegativeBalance: boolean;
	hidden: boolean;
	excludeFromCount: boolean;
}

export type TypeBillFormState = Partial<Omit<IBill, "id" | "createTime" | "lastUpdateTime">>;