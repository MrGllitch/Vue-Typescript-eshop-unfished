import { Category, Color, Product } from "@prisma/client";
import prisma from "~/lib/prisma";

const products: Product[] = [
	{
		id: 1111,
		nameCz: "Achát",
		nameEn: "Agate",
		descriptionCz: "",
		descriptionEn: "",
		note: "",
		createdAt: new Date(),
		updatedAt: new Date(),
		visible: false,
		quantity: 1,
		bPrice: 500,
		productDetailsId: 1,
		ownerId: 1,
		localityId: 1,
	},
	{
		id: 1112,
		nameCz: "Ametyst",
		nameEn: "Amethyst",
		descriptionCz: "",
		descriptionEn: "",
		note: "",
		createdAt: new Date(),
		updatedAt: new Date(),
		visible: true,
		quantity: 1,
		bPrice: 700,
		productDetailsId: 1,
		ownerId: 1,
		localityId: 1,
	},
	{
		id: 1113,
		nameCz: "Křišťál",
		nameEn: "Crystal",
		descriptionCz: "",
		descriptionEn: "",
		note: "",
		createdAt: new Date(),
		updatedAt: new Date(),
		visible: true,
		quantity: 1,
		bPrice: 900,
		productDetailsId: 1,
		ownerId: 1,
		localityId: 1,
	},
];

export default defineEventHandler(async (event) => {
	await prisma.product.createMany({
		data: products,
	});
});
