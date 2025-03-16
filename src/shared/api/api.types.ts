class ApiResponse<T> {
	status: number;
	data: T | undefined;
	errorMessage: string | null;

	constructor(
		status: number,
		data: T | undefined,
		errorMessage: string | null,
	) {
		this.status = status;
		this.data = data;
		this.errorMessage = errorMessage;
	}

	isSuccessful(): this is ApiResponse<T> & { data: T } {
		return this.status >= 200 && this.status < 300;
	}
}
