export interface creationProduct {
	id: number | null;
	nameCz: string;
	nameEn: string;
	descriptionCz: string;
	descriptionEn: string;
	note: string;
	price: number | null;
	bPrice: number | null;
	quantity: number;
	owner: string;
	visible: boolean;
	colorIds: number[];
	categoryIds: number[];
	weight: number | null;
	height: number | null;
	width: number | null;
	depth: number | null;
	localityNameCz: string;
	localityNameEn: string;
	countryNameCz: string;
	countryNameEn: string;
}

export type ApiResponse<T> = {
	success: boolean; // Whether the request succeeded
	data: T | T[] | null; // Can be single object or array of objects, or null if there's no data
	message?: string; // Optional message for success or failure
	metadata?: {
		totalCount?: number; // Optional: total count of items (useful for pagination)
		otherInfo?: Record<string, any>; // Optional: other metadata as needed
	};
};
