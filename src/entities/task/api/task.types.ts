import { IBase } from '@/shared';

export enum TaskPriority {
	Low = 'low',
	Medium = 'medium',
	High = 'high',
}

export interface ITask extends IBase {
	name: string;
	priority?: TaskPriority;
	isCompleted: boolean;
}

export type TypeTaskFromState = Partial<Omit<ITask, "id" | "updateTime">>
