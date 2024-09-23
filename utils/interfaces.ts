import type { Role } from "@prisma/client";

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

export interface listProduct {
	id: number;
	name: string;
	price: number;
	isSale: boolean;
	isNew: boolean;
	oldPrice: number;
	imagePath: string;
	countryName: string;
	localityName: string;
}

export interface User {
	id: string;
	role: Role;
}

export interface Notification {
	message: string;
	type: "success" | "error" | "info";
	duration: number;
}

export interface Address {
	firstName: string;
	lastName: string;
	street: string;
	houseNumber: string;
	zip: string;
	city: string;
	country: string;
}
