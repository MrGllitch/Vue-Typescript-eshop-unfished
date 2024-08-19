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
	imagePaths: string[];
}

export enum SelectType {
	CATEGORY,
	STATE,
	OWNER,
	LOCALITY,
}
