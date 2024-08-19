import prisma from "~/lib/prisma";
import { creationProduct } from "~/utils/interfaces";

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const id = parseInt(query.id as string, 10);

	const product = await prisma.product.findUnique({
		where: { id: id },
		select: {
			id: true,
			nameCz: true,
			nameEn: true,
			descriptionCz: true,
			descriptionEn: true,
			note: true,
			bPrice: true,
			quantity: true,
			owner: true,
			visible: true,
			productDetails: {
				select: {
					weight: true,
					height: true,
					width: true,
					depth: true,
				},
			},
			locality: {
				select: {
					nameCz: true,
					nameEn: true,
					country: {
						select: {
							nameCz: true,
							nameEn: true,
						},
					},
				},
			},
			prices: {
				select: {
					value: true,
				},
			},
			colors: {
				select: { id: true },
			},
			categories: {
				select: { id: true },
			},
			productImages: {
				select: { path: true },
			},
		},
	});

	if (product) {
		let creationProduct: creationProduct = {
			id: product.id,
			nameCz: product.nameCz,
			nameEn: product.nameEn,
			descriptionCz: product.descriptionCz,
			descriptionEn: product.descriptionEn,
			note: product.note,
			price: product.prices[0].value,
			bPrice: product.bPrice,
			quantity: product.quantity,
			owner: product.owner.name,
			visible: product.visible,
			colorIds: product.colors.map((color) => color.id),
			categoryIds: product.categories.map((category) => category.id),
			weight: product.productDetails.weight,
			height: product.productDetails.height,
			width: product.productDetails.width,
			depth: product.productDetails.depth,
			localityNameCz: product.locality.nameCz,
			localityNameEn: product.locality.nameEn,
			countryNameCz: product.locality.country.nameCz,
			countryNameEn: product.locality.country.nameEn,
			imagePaths: product.productImages.map((image) => image.path),
		};
		return creationProduct;
	}
});
