export interface IUser{
	id: string;
	name?: string;
	email?: string;
}

export type TypeUserForm = Omit<IUser, 'id'> & {password?: string };