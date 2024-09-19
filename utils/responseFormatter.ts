export function formatResponse<T>(
	success: boolean,
	data: T | null,
	message?: string
): ApiResponse<T> {
	return { success, data, message };
}

export interface ApiResponse<T> {
	success: boolean;
	data: T | null;
	message?: string;
}
